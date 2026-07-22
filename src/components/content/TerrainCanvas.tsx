'use client';

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { Canvas, type ThreeEvent, useFrame } from '@react-three/fiber';
import {
  BufferAttribute,
  Group,
  PlaneGeometry,
  Vector2,
  Vector3,
  type WebGLProgramParametersWithUniforms,
} from 'three';
import { useTheme } from '@/store/theme';

type Offset = { x: number; z: number };

type WaterSurfaceProps = {
  detail: number;
  amplitude: number;
  frequency: number;
  phases: [number, number, number];
  rippleTrigger: number;
  scale: number;
  rotation: number;
  offset: Offset;
};

type GenerateWaterSurfaceFn = (
  detail: number,
  scale: number,
  offset: Offset
) => Float32Array;

// Constants
const MIN_DETAIL = 50;
const MAX_DETAIL = 140;
const MIN_AMPLITUDE = 0.07;
const MAX_AMPLITUDE = 0.13;
const MIN_FREQUENCY = 1;
const MAX_FREQUENCY = 3;
const MAX_CLICK_RIPPLES = 3;
const FILL_MATERIAL_DEFINES = {
  WATER_CLICK_RIPPLES: 1,
  WATER_POINTER_DISPLACEMENT: 1,
};
const WIRE_MATERIAL_DEFINES = {
  WATER_CLICK_RIPPLES: 1,
  WATER_POINTER_DISPLACEMENT: 1,
};

// Build an oversized, flat grid. The shader turns it into rolling water.
const generateWaterSurface: GenerateWaterSurfaceFn = (
  detail,
  scale,
  offset
) => {
  const arrayLength = detail ** 2 * 3;
  const result = new Float32Array(arrayLength);

  for (let vertex = 0; vertex < detail ** 2; vertex++) {
    const column = vertex % detail;
    const row = Math.floor(vertex / detail);
    const x = (offset.x + column / (detail - 1) - 0.5) * scale;
    const z = (offset.z + row / (detail - 1) - 0.5) * scale;
    const index = vertex * 3;

    result[index] = x;
    result[index + 1] = 0;
    result[index + 2] = z;
  }

  return result;
};

// Water mesh
function WaterSurface({
  detail,
  amplitude,
  frequency,
  phases,
  rippleTrigger,
  scale,
  offset,
  rotation,
}: WaterSurfaceProps) {
  const theme = useTheme();
  const [reduceMotion, setReduceMotion] = useState(false);
  const [canPartWater, setCanPartWater] = useState(false);
  const sceneColors = useMemo(() => {
    const isDark = theme.effectiveTheme === 'dark';
    return {
      isDark,
      mesh: isDark ? '#1F1D1D' : '#B3B4B7',
      meshOpacity: isDark ? 1 : 0.36,
      water: isDark ? '#09090B' : '#FAFAFA',
    };
  }, [theme.effectiveTheme]);
  const wireDetail = sceneColors.isDark ? detail : Math.min(detail, 72);

  interface PlaneGeometryRef extends PlaneGeometry {
    elementsNeedUpdate: boolean;
  }

  const fillGeometry = useRef<PlaneGeometryRef>(null);
  const wireGeometry = useRef<PlaneGeometryRef>(null);
  const surface = useRef<Group>(null);
  const localPointerPosition = useRef(new Vector3());
  const waterUniforms = useRef({
    uTime: { value: 0 },
    uWaveAmplitude: { value: amplitude },
    uWaveFrequency: { value: frequency },
    uWavePhases: { value: new Vector3(...phases) },
    uClickRippleCenters: {
      value: Array.from({ length: MAX_CLICK_RIPPLES }, () => new Vector2()),
    },
    uClickRippleAges: { value: new Float32Array(MAX_CLICK_RIPPLES) },
    uClickRippleStrengths: { value: new Float32Array(MAX_CLICK_RIPPLES) },
    uPointerCenter: { value: new Vector2() },
    uPointerStrength: { value: 0 },
  });
  const pointerPosition = useRef({
    x: 0,
    z: 0,
  });
  const clickRipples = useRef(
    Array.from({ length: MAX_CLICK_RIPPLES }, () => ({
      x: 0,
      z: 0,
      age: 0,
      strength: 0,
    }))
  );
  const handledRippleTrigger = useRef(0);
  const pointerDisplacement = useRef({
    x: 0,
    z: 0,
    targetX: 0,
    targetZ: 0,
    strength: 0,
    targetStrength: 0,
  });

  const handleBeforeCompile = useCallback(
    (shader: WebGLProgramParametersWithUniforms) => {
      Object.assign(shader.uniforms, waterUniforms.current);
      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>
          uniform float uTime;
          uniform float uWaveAmplitude;
          uniform float uWaveFrequency;
          uniform vec3 uWavePhases;
          const int MAX_CLICK_RIPPLES = ${MAX_CLICK_RIPPLES};
          uniform vec2 uClickRippleCenters[MAX_CLICK_RIPPLES];
          uniform float uClickRippleAges[MAX_CLICK_RIPPLES];
          uniform float uClickRippleStrengths[MAX_CLICK_RIPPLES];
          uniform vec2 uPointerCenter;
          uniform float uPointerStrength;`
        )
        .replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
          vec2 waterPosition = position.xz;
          vec2 directionA = normalize(vec2(0.82, 0.57));
          vec2 directionB = normalize(vec2(-0.35, 0.94));
          vec2 directionC = normalize(vec2(0.92, 0.39));
          float baseFrequency = 1.35 + uWaveFrequency * 0.2;
          float thetaA = dot(waterPosition, directionA) * baseFrequency - uTime * 0.62 + uWavePhases.x;
          float thetaB = dot(waterPosition, directionB) * baseFrequency * 1.45 - uTime * 0.46 + uWavePhases.y;
          float thetaC = dot(waterPosition, directionC) * baseFrequency * 2.35 - uTime * 0.82 + uWavePhases.z;
          float waveA = sin(thetaA) * uWaveAmplitude * 0.58;
          float waveB = sin(thetaB) * uWaveAmplitude * 0.28;
          float waveC = sin(thetaC) * uWaveAmplitude * 0.12;
          transformed.y += waveA + waveB + waveC;
          transformed.xz += directionA * cos(thetaA) * uWaveAmplitude * 0.12;
          transformed.xz += directionB * cos(thetaB) * uWaveAmplitude * 0.05;

          #if WATER_CLICK_RIPPLES == 1
          for (int clickIndex = 0; clickIndex < MAX_CLICK_RIPPLES; clickIndex++) {
            float clickStrength = uClickRippleStrengths[clickIndex];
            if (clickStrength > 0.001) {
              float clickDistance = length(waterPosition - uClickRippleCenters[clickIndex]);
              float clickRadius = uClickRippleAges[clickIndex] * 0.65;
              float clickOffset = clickDistance - clickRadius;
              float clickEnvelope = exp(-clickOffset * clickOffset * 18.0);
              float clickWave = sin(clickOffset * 20.0) * 0.07 * clickEnvelope;
              transformed.y += clickWave * clickStrength;
            }
          }
          #endif

          #if WATER_POINTER_DISPLACEMENT == 1
          if (uPointerStrength > 0.001) {
            vec2 pointerOffset = waterPosition - uPointerCenter;
            float pointerDistanceSquared = dot(pointerOffset, pointerOffset);
            float pointerDistance = sqrt(pointerDistanceSquared);
            float pointerDepression = exp(-pointerDistanceSquared * 24.0) * 0.045;
            float pointerRim = exp(-pow(pointerDistance - 0.24, 2.0) * 120.0) * 0.012;
            float pointerPush = exp(-pointerDistanceSquared * 20.0) * 0.08;
            transformed.y += (pointerRim - pointerDepression) * uPointerStrength;
            transformed.xz += pointerOffset * pointerPush * uPointerStrength;
          }
          #endif`
        );
    },
    []
  );

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia(
      '(min-width: 768px) and (hover: hover) and (pointer: fine)'
    );
    const updatePreferences = () => {
      setReduceMotion(motionQuery.matches);
      setCanPartWater(pointerQuery.matches);
    };

    updatePreferences();
    motionQuery.addEventListener('change', updatePreferences);
    pointerQuery.addEventListener('change', updatePreferences);

    return () => {
      motionQuery.removeEventListener('change', updatePreferences);
      pointerQuery.removeEventListener('change', updatePreferences);
    };
  }, []);

  useEffect(() => {
    if (!canPartWater || reduceMotion) {
      pointerDisplacement.current.targetStrength = 0;
    }
  }, [canPartWater, reduceMotion]);

  const handlePointerMove = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      if (reduceMotion || !surface.current) return;

      event.stopPropagation();
      const localPoint = surface.current.worldToLocal(
        localPointerPosition.current.copy(event.point)
      );
      pointerPosition.current.x = localPoint.x;
      pointerPosition.current.z = localPoint.z;
      if (canPartWater) {
        const displacement = pointerDisplacement.current;
        if (displacement.strength < 0.001) {
          displacement.x = localPoint.x;
          displacement.z = localPoint.z;
        }
        displacement.targetX = localPoint.x;
        displacement.targetZ = localPoint.z;
        displacement.targetStrength = 1;
      }
    },
    [canPartWater, reduceMotion]
  );

  const handlePointerDown = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      if (reduceMotion || !surface.current) return;

      event.stopPropagation();
      const localPoint = surface.current.worldToLocal(
        localPointerPosition.current.copy(event.point)
      );
      pointerPosition.current.x = localPoint.x;
      pointerPosition.current.z = localPoint.z;
    },
    [reduceMotion]
  );

  const handlePointerLeave = useCallback(() => {
    pointerDisplacement.current.targetStrength = 0;
  }, []);

  useFrame(({ clock }, delta) => {
    if (surface.current && !reduceMotion) {
      surface.current.rotation.y += rotation / 20000;
    }

    if (rippleTrigger !== handledRippleTrigger.current) {
      handledRippleTrigger.current = rippleTrigger;
      if (!reduceMotion) {
        const availableRipple = clickRipples.current.find(
          (clickRipple) => clickRipple.strength === 0
        );
        const oldestRipple = clickRipples.current.reduce(
          (oldest, clickRipple) =>
            clickRipple.age > oldest.age ? clickRipple : oldest
        );
        const nextRipple = availableRipple ?? oldestRipple;

        nextRipple.x = pointerPosition.current.x;
        nextRipple.z = pointerPosition.current.z;
        nextRipple.age = 0;
        nextRipple.strength = 1;
      }
    }

    for (const clickRipple of clickRipples.current) {
      if (clickRipple.strength > 0) {
        clickRipple.age += delta;
        clickRipple.strength = Math.exp(-clickRipple.age * 0.62);
        if (clickRipple.strength < 0.01) {
          clickRipple.strength = 0;
        }
      }
    }

    const displacement = pointerDisplacement.current;
    const pointerTrackingEase = Math.min(1, delta * 7);
    displacement.x +=
      (displacement.targetX - displacement.x) * pointerTrackingEase;
    displacement.z +=
      (displacement.targetZ - displacement.z) * pointerTrackingEase;
    const pointerStrengthEase = Math.min(
      1,
      delta * (displacement.targetStrength > 0 ? 5 : 3)
    );
    displacement.strength +=
      (displacement.targetStrength - displacement.strength) *
      pointerStrengthEase;
    if (displacement.strength < 0.001) {
      displacement.strength = 0;
    }

    const uniforms = waterUniforms.current;
    uniforms.uTime.value = reduceMotion ? 0 : clock.elapsedTime;
    for (let index = 0; index < MAX_CLICK_RIPPLES; index++) {
      const clickRipple = clickRipples.current[index];
      uniforms.uClickRippleCenters.value[index].set(
        clickRipple.x,
        clickRipple.z
      );
      uniforms.uClickRippleAges.value[index] = clickRipple.age;
      uniforms.uClickRippleStrengths.value[index] = reduceMotion
        ? 0
        : clickRipple.strength;
    }
    uniforms.uPointerCenter.value.set(displacement.x, displacement.z);
    uniforms.uPointerStrength.value = reduceMotion ? 0 : displacement.strength;
  });

  useLayoutEffect(() => {
    const geometries = [
      { geometry: fillGeometry.current, resolution: wireDetail },
      { geometry: wireGeometry.current, resolution: wireDetail },
    ];
    for (const { geometry, resolution } of geometries) {
      if (!geometry) continue;

      const positions = generateWaterSurface(resolution, scale, offset);
      geometry.setAttribute('position', new BufferAttribute(positions, 3));
      geometry.elementsNeedUpdate = true;
      geometry.computeVertexNormals();
    }
  }, [detail, wireDetail, scale, offset]);

  return (
    <group ref={surface}>
      <mesh renderOrder={0} raycast={() => undefined}>
        <planeGeometry
          args={[undefined, undefined, wireDetail - 1, wireDetail - 1]}
          ref={fillGeometry}
        />
        <meshBasicMaterial
          color={sceneColors.water}
          defines={FILL_MATERIAL_DEFINES}
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
          toneMapped={false}
          onBeforeCompile={handleBeforeCompile}
        />
      </mesh>
      <mesh
        renderOrder={1}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerLeave}
      >
        <planeGeometry
          args={[undefined, undefined, wireDetail - 1, wireDetail - 1]}
          ref={wireGeometry}
        />
        {sceneColors.isDark ? (
          <meshStandardMaterial
            wireframe
            color={sceneColors.mesh}
            defines={WIRE_MATERIAL_DEFINES}
            onBeforeCompile={handleBeforeCompile}
          />
        ) : (
          <meshBasicMaterial
            wireframe
            color={sceneColors.mesh}
            defines={WIRE_MATERIAL_DEFINES}
            depthTest={false}
            depthWrite={false}
            opacity={sceneColors.meshOpacity}
            toneMapped={false}
            transparent
            onBeforeCompile={handleBeforeCompile}
          />
        )}
      </mesh>
      <ambientLight intensity={3} />
      <directionalLight position={[10, 20, 5]} intensity={3} />
    </group>
  );
}

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

// Canvas
export default function TerrainCanvas() {
  const [detail] = useState(getRandomInt(MIN_DETAIL, MAX_DETAIL));
  const [amplitude] = useState(
    getRandomArbitrary(MIN_AMPLITUDE, MAX_AMPLITUDE)
  );
  const [frequency] = useState(getRandomInt(MIN_FREQUENCY, MAX_FREQUENCY));
  const [phases] = useState<[number, number, number]>(() => [
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
  ]);
  const [rippleTrigger, setRippleTrigger] = useState(0);

  const scale = 8;
  const rotation = 0.5;
  const offset = useMemo(() => ({ x: 0, z: 0 }), []);

  const handleButtonClick = useCallback(() => {
    setRippleTrigger((trigger) => trigger + 1);
  }, []);

  const waterProps = useMemo(
    () => ({
      detail,
      amplitude,
      frequency,
      phases,
      rippleTrigger,
      scale,
      rotation,
      offset,
    }),
    [
      detail,
      amplitude,
      frequency,
      phases,
      rippleTrigger,
      scale,
      rotation,
      offset,
    ]
  );

  return (
    <button
      id="three-canvas"
      onClick={handleButtonClick}
      className="animate-fade-in absolute inset-0 z-0 m-0 block h-full w-full cursor-pointer overflow-hidden border-none bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      aria-label="Create a ripple in the interactive water study"
    >
      <Canvas
        gl={{ antialias: true }}
        dpr={[1, 2]}
        onCreated={({ camera }) => camera.lookAt(0.2, 0.2, 0.1)}
        camera={{ position: [0.15, 0.4, 0.4] }}
      >
        <WaterSurface {...waterProps} />
      </Canvas>
    </button>
  );
}

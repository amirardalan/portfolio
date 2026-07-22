'use client';

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
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
type DragPoint = { x: number; z: number };

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
const MAX_DRAG_POINTS = 32;
const DRAG_POINT_SPACING = 0.08;

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
  const [canRipple, setCanRipple] = useState(false);
  const sceneColors = useMemo(() => {
    const isDark = theme.effectiveTheme === 'dark';
    return {
      mesh: isDark ? '#1F1D1D' : '#C9C1C1',
      water: isDark ? '#09090B' : '#FAFAFA',
    };
  }, [theme.effectiveTheme]);

  interface PlaneGeometryRef extends PlaneGeometry {
    elementsNeedUpdate: boolean;
  }

  const fillGeometry = useRef<PlaneGeometryRef>(null);
  const wireGeometry = useRef<PlaneGeometryRef>(null);
  const surface = useRef<Group>(null);
  const waterUniforms = useRef({
    uTime: { value: 0 },
    uWaveAmplitude: { value: amplitude },
    uWaveFrequency: { value: frequency },
    uWavePhases: { value: new Vector3(...phases) },
    uRippleCenter: { value: new Vector2() },
    uRippleStrength: { value: 0 },
    uClickRippleCenters: {
      value: Array.from({ length: MAX_CLICK_RIPPLES }, () => new Vector2()),
    },
    uClickRippleAges: { value: new Float32Array(MAX_CLICK_RIPPLES) },
    uClickRippleStrengths: { value: new Float32Array(MAX_CLICK_RIPPLES) },
    uDragPoints: {
      value: Array.from({ length: MAX_DRAG_POINTS }, () => new Vector2()),
    },
    uDragPointCount: { value: 0 },
    uDragStrength: { value: 0 },
  });
  const ripple = useRef({
    x: 0,
    z: 0,
    targetX: 0,
    targetZ: 0,
    strength: 0,
    targetStrength: 0,
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
  const dragWake = useRef({
    active: false,
    points: [] as DragPoint[],
    endX: 0,
    endZ: 0,
    targetEndX: 0,
    targetEndZ: 0,
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
          uniform vec2 uRippleCenter;
          uniform float uRippleStrength;
          const int MAX_CLICK_RIPPLES = ${MAX_CLICK_RIPPLES};
          uniform vec2 uClickRippleCenters[MAX_CLICK_RIPPLES];
          uniform float uClickRippleAges[MAX_CLICK_RIPPLES];
          uniform float uClickRippleStrengths[MAX_CLICK_RIPPLES];
          const int MAX_DRAG_POINTS = ${MAX_DRAG_POINTS};
          uniform vec2 uDragPoints[MAX_DRAG_POINTS];
          uniform float uDragPointCount;
          uniform float uDragStrength;`
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

          float rippleDistanceSquared = dot(waterPosition - uRippleCenter, waterPosition - uRippleCenter);
          float rippleDistance = sqrt(rippleDistanceSquared);
          float rippleFalloff = exp(-rippleDistanceSquared * 4.5);
          float rippleMask = 1.0 - exp(-rippleDistanceSquared * 40.0);
          float rippleRings = sin(rippleDistance * 20.0 - uTime * 3.8) * 0.018 * rippleFalloff * rippleMask;
          float rippleDepression = exp(-rippleDistanceSquared * 35.0) * 0.012;
          transformed.y += (rippleRings - rippleDepression) * uRippleStrength;

          for (int clickIndex = 0; clickIndex < MAX_CLICK_RIPPLES; clickIndex++) {
            float clickDistance = length(waterPosition - uClickRippleCenters[clickIndex]);
            float clickRadius = uClickRippleAges[clickIndex] * 0.65;
            float clickOffset = clickDistance - clickRadius;
            float clickEnvelope = exp(-clickOffset * clickOffset * 18.0);
            float clickWave = sin(clickOffset * 20.0) * 0.07 * clickEnvelope;
            transformed.y += clickWave * uClickRippleStrengths[clickIndex];
          }

          float dragDistance = 1000.0;
          for (int dragIndex = 1; dragIndex < MAX_DRAG_POINTS; dragIndex++) {
            float segmentActive = 1.0 - step(uDragPointCount, float(dragIndex) + 0.5);
            vec2 dragStart = uDragPoints[dragIndex - 1];
            vec2 dragEnd = uDragPoints[dragIndex];
            vec2 dragSegment = dragEnd - dragStart;
            float dragLengthSquared = max(dot(dragSegment, dragSegment), 0.0001);
            float dragProgress = clamp(dot(waterPosition - dragStart, dragSegment) / dragLengthSquared, 0.0, 1.0);
            vec2 nearestDragPoint = dragStart + dragSegment * dragProgress;
            float segmentDistance = length(waterPosition - nearestDragPoint);
            dragDistance = mix(dragDistance, min(dragDistance, segmentDistance), segmentActive);
          }
          float dragTrough = exp(-dragDistance * dragDistance * 180.0) * 0.038;
          float dragRipples = sin(dragDistance * 32.0 - uTime * 4.2) * exp(-dragDistance * dragDistance * 45.0) * 0.022;
          float dragLengthMask = smoothstep(1.5, 2.0, uDragPointCount);
          transformed.y += (dragRipples - dragTrough) * uDragStrength * dragLengthMask;`
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
      setCanRipple(pointerQuery.matches);
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
    if (!canRipple || reduceMotion) {
      ripple.current.targetStrength = 0;
    }
  }, [canRipple, reduceMotion]);

  const handlePointerMove = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      if (reduceMotion || !surface.current) return;

      event.stopPropagation();
      const localPoint = surface.current.worldToLocal(event.point.clone());
      if (ripple.current.strength === 0) {
        ripple.current.x = localPoint.x;
        ripple.current.z = localPoint.z;
      }
      ripple.current.targetX = localPoint.x;
      ripple.current.targetZ = localPoint.z;
      if (canRipple) {
        ripple.current.targetStrength = 1;
      }
      if (dragWake.current.active && event.buttons === 1) {
        const points = dragWake.current.points;
        const lastPoint = points[points.length - 1];
        const dx = localPoint.x - lastPoint.x;
        const dz = localPoint.z - lastPoint.z;
        if (dx * dx + dz * dz >= DRAG_POINT_SPACING ** 2) {
          if (points.length >= MAX_DRAG_POINTS - 1) {
            const simplifiedPoints = points.filter(
              (_, index) => index === 0 || index % 2 === 0
            );
            points.splice(0, points.length, ...simplifiedPoints);
          }
          points.push({ x: localPoint.x, z: localPoint.z });
        }
        dragWake.current.targetEndX = localPoint.x;
        dragWake.current.targetEndZ = localPoint.z;
      }
    },
    [canRipple, reduceMotion]
  );

  const handlePointerDown = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      if (reduceMotion || !surface.current) return;

      event.stopPropagation();
      const localPoint = surface.current.worldToLocal(event.point.clone());
      ripple.current.x = localPoint.x;
      ripple.current.z = localPoint.z;
      ripple.current.targetX = localPoint.x;
      ripple.current.targetZ = localPoint.z;
      if (canRipple) {
        ripple.current.targetStrength = 1;
      }

      dragWake.current.active = true;
      dragWake.current.points = [{ x: localPoint.x, z: localPoint.z }];
      dragWake.current.endX = localPoint.x;
      dragWake.current.endZ = localPoint.z;
      dragWake.current.targetEndX = localPoint.x;
      dragWake.current.targetEndZ = localPoint.z;
      dragWake.current.targetStrength = 1;
    },
    [canRipple, reduceMotion]
  );

  const handlePointerUp = useCallback(() => {
    dragWake.current.active = false;
    dragWake.current.targetStrength = 0;
  }, []);

  const handlePointerLeave = useCallback(() => {
    ripple.current.targetStrength = 0;
    dragWake.current.active = false;
    dragWake.current.targetStrength = 0;
  }, []);

  useFrame(({ clock }, delta) => {
    if (surface.current && !reduceMotion) {
      surface.current.rotation.y += rotation / 20000;
    }

    const rippleState = ripple.current;
    const targetStrength =
      canRipple && !reduceMotion ? rippleState.targetStrength : 0;
    rippleState.strength +=
      (targetStrength - rippleState.strength) * Math.min(1, delta * 4);
    const trackingEase = Math.min(1, delta * 5);
    rippleState.x += (rippleState.targetX - rippleState.x) * trackingEase;
    rippleState.z += (rippleState.targetZ - rippleState.z) * trackingEase;

    if (rippleState.strength < 0.001) {
      rippleState.strength = 0;
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

        nextRipple.x = ripple.current.targetX;
        nextRipple.z = ripple.current.targetZ;
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

    const dragWakeState = dragWake.current;
    const dragTrackingEase = Math.min(1, delta * 12);
    dragWakeState.endX +=
      (dragWakeState.targetEndX - dragWakeState.endX) * dragTrackingEase;
    dragWakeState.endZ +=
      (dragWakeState.targetEndZ - dragWakeState.endZ) * dragTrackingEase;
    const dragStrengthEase = Math.min(
      1,
      delta * (dragWakeState.active ? 9 : 2.5)
    );
    dragWakeState.strength +=
      (dragWakeState.targetStrength - dragWakeState.strength) *
      dragStrengthEase;
    if (dragWakeState.strength < 0.001) {
      dragWakeState.strength = 0;
    }

    const uniforms = waterUniforms.current;
    uniforms.uTime.value = reduceMotion ? 0 : clock.elapsedTime;
    uniforms.uWaveAmplitude.value = amplitude;
    uniforms.uWaveFrequency.value = frequency;
    uniforms.uWavePhases.value.set(...phases);
    uniforms.uRippleCenter.value.set(rippleState.x, rippleState.z);
    uniforms.uRippleStrength.value = rippleState.strength;
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
    const dragPoints = uniforms.uDragPoints.value;
    const anchorCount = Math.min(
      dragWakeState.points.length,
      MAX_DRAG_POINTS - 1
    );
    for (let index = 0; index < anchorCount; index++) {
      const point = dragWakeState.points[index];
      dragPoints[index].set(point.x, point.z);
    }
    let pointCount = anchorCount;
    if (anchorCount > 0 && pointCount < MAX_DRAG_POINTS) {
      const lastPoint = dragWakeState.points[anchorCount - 1];
      const dx = dragWakeState.endX - lastPoint.x;
      const dz = dragWakeState.endZ - lastPoint.z;
      if (dx * dx + dz * dz > 0.000001) {
        dragPoints[pointCount].set(dragWakeState.endX, dragWakeState.endZ);
        pointCount += 1;
      }
    }
    uniforms.uDragPointCount.value = pointCount;
    uniforms.uDragStrength.value = reduceMotion ? 0 : dragWakeState.strength;
  });

  useLayoutEffect(() => {
    const geometries = [fillGeometry.current, wireGeometry.current];
    for (const geometry of geometries) {
      if (!geometry) continue;

      const positions = generateWaterSurface(detail, scale, offset);
      geometry.setAttribute('position', new BufferAttribute(positions, 3));
      geometry.elementsNeedUpdate = true;
      geometry.computeVertexNormals();
    }
  }, [detail, scale, offset]);

  return (
    <group ref={surface}>
      <mesh renderOrder={0} raycast={() => undefined}>
        <planeGeometry
          args={[undefined, undefined, detail - 1, detail - 1]}
          ref={fillGeometry}
        />
        <meshBasicMaterial
          color={sceneColors.water}
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
          onBeforeCompile={handleBeforeCompile}
        />
      </mesh>
      <mesh
        renderOrder={1}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerLeave}
      >
        <planeGeometry
          args={[undefined, undefined, detail - 1, detail - 1]}
          ref={wireGeometry}
        />
        <meshStandardMaterial
          wireframe
          color={sceneColors.mesh}
          onBeforeCompile={handleBeforeCompile}
        />
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
  const [pixelRatio, setPixelRatio] = useState(1);
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
  const pointerGesture = useRef({ x: 0, y: 0, moved: false });

  const scale = 8;
  const rotation = 0.5;
  const offset = useMemo(() => ({ x: 0, z: 0 }), []);

  useEffect(() => {
    setPixelRatio(window.devicePixelRatio);
  }, []);

  const handleButtonPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      pointerGesture.current.x = event.clientX;
      pointerGesture.current.y = event.clientY;
      pointerGesture.current.moved = false;
    },
    []
  );

  const handleButtonPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (event.buttons !== 1 || pointerGesture.current.moved) return;

      const dx = event.clientX - pointerGesture.current.x;
      const dy = event.clientY - pointerGesture.current.y;
      if (dx * dx + dy * dy > 36) {
        pointerGesture.current.moved = true;
      }
    },
    []
  );

  const handleButtonClick = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement>) => {
      if (event.detail === 0 || !pointerGesture.current.moved) {
        setRippleTrigger((trigger) => trigger + 1);
      }
      pointerGesture.current.moved = false;
    },
    []
  );

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
      onPointerDown={handleButtonPointerDown}
      onPointerMove={handleButtonPointerMove}
      className="animate-fade-in absolute inset-0 z-0 m-0 block h-full w-full cursor-pointer overflow-hidden border-none bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      aria-label="Create a ripple in the interactive water study"
    >
      <Canvas
        gl={{ antialias: true }}
        dpr={pixelRatio}
        onCreated={({ camera }) => camera.lookAt(0.2, 0.2, 0.1)}
        camera={{ position: [0.15, 0.4, 0.4] }}
      >
        <WaterSurface {...waterProps} />
      </Canvas>
    </button>
  );
}

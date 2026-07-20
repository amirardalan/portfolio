'use client';

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import {
  BufferAttribute,
  PlaneGeometry,
  Mesh,
  Material,
  BufferGeometry,
} from 'three';
import { createNoise2D } from 'simplex-noise';
import { useTheme } from '@/store/theme';

type Offset = { x: number; z: number };

type TerrainProps = {
  detail: number;
  height: number;
  texture: number;
  scale: number;
  rotation: number;
  offset: Offset;
};

type GenerateTerrainFn = (
  detail: number,
  height: number,
  texture: number,
  scale: number,
  offset: Offset
) => Float32Array;

// Constants
const MIN_DETAIL = 10;
const MAX_DETAIL = 200;
const MIN_HEIGHT = 0.05;
const MAX_HEIGHT = 0.2;
const MIN_TEXTURE = 1;
const MAX_TEXTURE = 3;

// Generator
const generateTerrain: GenerateTerrainFn = (
  detail,
  height,
  texture,
  scale,
  offset
) => {
  const noise2D = createNoise2D();
  const noise = (level: number, x: number, z: number): number =>
    noise2D(
      offset.x * scale + scale * level * x,
      offset.z * scale + scale * level * z
    ) /
      level +
    (level > 1 ? noise(level / 2, x, z) : 0);

  const arrayLength = detail ** 2 * 3;
  const result = new Float32Array(arrayLength);

  for (let i = 0; i < arrayLength; i++) {
    let v: number;
    switch (i % 3) {
      case 0:
        v = i / 3;
        result[i] = (offset.x + ((v % detail) / detail - 0.5)) * scale;
        break;
      case 1:
        v = (i - 1) / 3;
        result[i] =
          noise(
            2 ** texture,
            (v % detail) / detail - 0.5,
            Math.floor(v / detail) / detail - 0.5
          ) * height;
        break;
      case 2:
        v = (i - 2) / 3;
        result[i] = (offset.z + Math.floor(v / detail) / detail - 0.5) * scale;
        break;
    }
  }

  return result;
};

// Mesh
function Terrain({
  detail,
  height,
  texture,
  scale,
  offset,
  rotation,
}: TerrainProps) {
  const theme = useTheme();
  const [reduceMotion, setReduceMotion] = useState(false);
  const canvasColor = useMemo(() => {
    const lightColor = '#C9C1C1';
    const darkColor = '#1F1D1D';
    return theme.effectiveTheme === 'dark' ? darkColor : lightColor;
  }, [theme.effectiveTheme]);

  interface PlaneGeometryRef extends PlaneGeometry {
    elementsNeedUpdate: boolean;
  }

  const ref = useRef<PlaneGeometryRef>(null);
  const mesh = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useFrame(() => {
    if (mesh.current && !reduceMotion) {
      mesh.current.rotation.y += rotation / 20000;
    }
  });

  useLayoutEffect(() => {
    if (ref.current) {
      const node = ref.current;
      node.setAttribute(
        'position',
        new BufferAttribute(
          generateTerrain(detail, height, texture, scale, offset),
          3
        )
      );
      node.elementsNeedUpdate = true;
      node?.computeVertexNormals();
    }
  }, [detail, height, texture, scale, offset]);

  return (
    <mesh ref={mesh}>
      <planeGeometry
        args={[undefined, undefined, detail - 1, detail - 1]}
        ref={ref}
      />
      <ambientLight intensity={3} />
      <directionalLight position={[10, 20, 5]} intensity={3} />
      <MeshDistortMaterial
        distort={0.8}
        speed={0.05}
        wireframe
        color={canvasColor}
      />
    </mesh>
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
  const [detail, setDetail] = useState(getRandomInt(MIN_DETAIL, MAX_DETAIL));
  const [height, setHeight] = useState(
    getRandomArbitrary(MIN_HEIGHT, MAX_HEIGHT)
  );
  const [texture, setTexture] = useState(
    getRandomInt(MIN_TEXTURE, MAX_TEXTURE)
  );

  const scale = 3;
  const rotation = 0.5;
  const offset = useMemo(() => ({ x: 0, z: 0 }), []);

  useEffect(() => {
    setPixelRatio(window.devicePixelRatio);
  }, []);

  const randomizeTerrain = useCallback(() => {
    setDetail(getRandomInt(MIN_DETAIL, MAX_DETAIL));
    setHeight(getRandomArbitrary(MIN_HEIGHT, MAX_HEIGHT));
    setTexture(getRandomInt(MIN_TEXTURE, MAX_TEXTURE));
  }, []);

  const terrainProps = useMemo(
    () => ({
      detail,
      height,
      texture,
      scale,
      rotation,
      offset,
    }),
    [detail, height, texture, scale, rotation, offset]
  );

  return (
    <button
      id="three-canvas"
      onClick={randomizeTerrain}
      className="animate-fade-in absolute inset-0 z-0 m-0 block h-full w-full cursor-pointer overflow-hidden border-none bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      aria-label="Regenerate the interactive terrain study"
      title="Click to regenerate"
    >
      <Canvas
        gl={{ antialias: true }}
        dpr={pixelRatio}
        onCreated={({ camera }) => camera.lookAt(0.2, 0.2, 0.1)}
        camera={{ position: [0.15, 0.4, 0.4] }}
      >
        <Terrain {...terrainProps} />
      </Canvas>
    </button>
  );
}

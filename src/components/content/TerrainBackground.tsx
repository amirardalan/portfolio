"use client";

import dynamic from 'next/dynamic';
import { useState } from 'react';
import StarField from '@/components/content/StarField';

function TerrainLoadingIndicator({ visible }: { visible: boolean }) {
  return (
    <div
      role="status"
      aria-label="Loading interactive water study"
      aria-hidden={!visible}
      className={`pointer-events-none absolute inset-0 z-0 flex items-end justify-end p-6 transition-opacity duration-500 ease-out md:p-10 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="text-primary flex items-center gap-3 font-mono text-xxs tracking-[0.12em] uppercase">
        <span className="inline-block size-1.5 animate-pulse bg-current" />
        <span>Field / Initializing</span>
      </div>
    </div>
  );
}

const TerrainCanvas = dynamic(() => import('@/components/content/TerrainCanvas'), {
  ssr: false,
});

export default function TerrainBackground({
  showTerrainCanvas = true,
}: {
  showTerrainCanvas?: boolean;
}) {
  const [terrainReady, setTerrainReady] = useState(false);

  return (
    <>
      <StarField />
      {showTerrainCanvas ? (
        <>
          <TerrainLoadingIndicator visible={!terrainReady} />
          <TerrainCanvas
            isReady={terrainReady}
            onReady={() => setTerrainReady(true)}
          />
        </>
      ) : null}
      <div className="from-light/90 via-light/75 to-light/45 pointer-events-none absolute inset-0 z-1 bg-gradient-to-r md:hidden dark:from-black/55 dark:via-black/30 dark:to-black/5" />
      <div className="from-light/90 via-light/70 pointer-events-none absolute inset-0 z-1 hidden bg-gradient-to-r to-transparent md:block dark:from-black/50 dark:via-black/25" />
    </>
  );
}

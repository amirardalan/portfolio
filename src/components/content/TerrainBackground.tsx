import StarField from '@/components/content/StarField';
import TerrainCanvas from '@/components/content/TerrainCanvas';

export default function TerrainBackground() {
  return (
    <>
      <StarField />
      <TerrainCanvas />
      <div className="from-light/90 via-light/75 to-light/45 pointer-events-none absolute inset-0 z-1 bg-gradient-to-r md:hidden dark:from-black/55 dark:via-black/30 dark:to-black/5" />
      <div className="from-light/90 via-light/70 pointer-events-none absolute inset-0 z-1 hidden bg-gradient-to-r to-transparent md:block dark:from-black/50 dark:via-black/25" />
    </>
  );
}

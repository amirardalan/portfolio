import TerrainBackground from '@/components/content/TerrainBackground';
import SectionGlyph from '@/components/ui/SectionGlyph';

interface TerrainHeroProps {
  eyebrow: React.ReactNode;
  counter?: React.ReactNode;
  children: React.ReactNode;
}

export default function TerrainHero({
  eyebrow,
  counter,
  children,
}: TerrainHeroProps) {
  return (
    <section className="relative isolate flex min-h-128 overflow-hidden md:min-h-180">
      <TerrainBackground />

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-[1440px] px-6 pt-24 pb-10 md:px-10 md:pt-40 md:pb-16 lg:px-16 lg:pt-44">
        <div className="mb-4 flex items-center justify-between md:mb-6">
          <p className="text-primary text-xxs flex items-center gap-2.5 font-sans tracking-[0.22em] uppercase">
            <SectionGlyph /> {eyebrow}
          </p>
          {counter ? (
            <span className="text-xxs font-mono text-zinc-400 dark:text-zinc-600">
              {counter}
            </span>
          ) : null}
        </div>

        {children}
      </div>
    </section>
  );
}

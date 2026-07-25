import Link from 'next/link';
import TerrainCanvas from '@/components/content/TerrainCanvas';
import StarField from '@/components/content/StarField';
import SelectedWorkStage from '@/components/content/SelectedWorkStage';
import SectionGlyph from '@/components/ui/SectionGlyph';
import { selectedProjects } from '@/content/projects';

const Arrow = ({ external = false }: { external?: boolean }) => (
  <span aria-hidden="true">{external ? '↗' : '→'}</span>
);

export default function HomeContent() {
  return (
    <div className="text-dark dark:text-light w-full">
      <section className="relative isolate overflow-hidden md:flex md:min-h-[720px] md:items-center">
        <StarField />
        <TerrainCanvas />
        <div className="from-light/90 via-light/75 to-light/45 pointer-events-none absolute inset-0 z-1 bg-gradient-to-r md:hidden dark:from-black/55 dark:via-black/30 dark:to-black/5" />
        <div className="from-light/90 via-light/70 pointer-events-none absolute inset-0 z-1 hidden bg-gradient-to-r to-transparent md:block dark:from-black/50 dark:via-black/25" />

        <div className="pointer-events-none relative z-10 mx-auto w-full max-w-[1440px] px-6 pt-[97px] pb-10 md:px-10 md:py-32 lg:px-16">
          <div className="max-w-3xl">
            <p className="text-xxs text-primary mb-4 flex items-center gap-2.5 tracking-[0.22em] uppercase md:mb-6">
              <SectionGlyph /> Amir Ardalan · Design Engineer
            </p>
            <h1 className="font-serif text-5xl leading-[0.98] font-normal tracking-tight text-balance italic sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Complex ideas. Clear, working interfaces.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed font-normal text-zinc-600 md:mt-8 md:text-xl dark:text-zinc-300">
              I bridge product design and frontend engineering, from early
              prototype to production.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-sm tracking-wide uppercase md:mt-10">
              <a
                href="#selected-work"
                className="group text-primary pointer-events-auto -mx-2 inline-flex min-h-11 items-center gap-3 px-2"
              >
                View selected work
                <span
                  className="transition-transform group-hover:translate-y-1"
                  aria-hidden="true"
                >
                  ↓
                </span>
              </a>
              <Link
                href="/about"
                className="group pointer-events-auto -mx-2 inline-flex min-h-11 items-center gap-3 px-2"
              >
                About me <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="selected-work"
        aria-labelledby="selected-work-heading"
        className="border-t border-zinc-200 dark:border-zinc-800"
      >
        <div className="mx-auto max-w-[1440px] px-6 pt-10 pb-14 md:px-10 md:pt-14 md:pb-20 lg:px-16 lg:pt-16 lg:pb-24">
          <div className="mb-8 md:mb-12">
            <h2
              id="selected-work-heading"
              className="text-xxs flex items-center gap-2.5 tracking-[0.22em] text-zinc-500 uppercase dark:text-zinc-400"
            >
              <SectionGlyph /> Selected work
            </h2>
          </div>

          <SelectedWorkStage projects={selectedProjects} />
        </div>
      </section>

      <section className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-6 py-14 md:grid-cols-12 md:gap-10 md:px-10 md:py-20 lg:px-16 lg:py-24">
          <div className="md:col-span-4">
            <p className="text-xxs flex items-center gap-2.5 tracking-[0.22em] text-zinc-500 uppercase dark:text-zinc-400">
              <SectionGlyph /> How I work
            </p>
          </div>
          <div className="md:col-span-8">
            <h2 className="text-4xl leading-[1.08] font-medium text-balance text-zinc-800 lg:text-5xl dark:text-zinc-200">
              I work across product design, interaction design, and frontend
              engineering.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed font-normal text-zinc-600 md:mt-6 md:text-lg dark:text-zinc-300">
              I am especially effective early, when the problem is still taking
              shape and the important decisions are being made.
            </p>
            <Link
              href="/about"
              className="group text-primary mt-7 inline-flex items-center gap-3 text-sm tracking-wide uppercase md:mt-8"
            >
              How I work <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-6 py-14 md:grid-cols-12 md:gap-10 md:px-10 md:py-20 lg:px-16 lg:py-24">
          <div className="md:col-span-4">
            <h2 className="text-xxs flex items-center gap-2.5 tracking-[0.22em] text-zinc-500 uppercase dark:text-zinc-400">
              <SectionGlyph /> Selected experience
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="max-w-3xl text-xl leading-relaxed font-normal text-zinc-800 sm:text-2xl dark:text-zinc-200">
              I’ve collaborated with teams at Nike’s LeBron James Innovation
              Center, Columbia Sportswear Company, Mountain Hardwear, and KEEN
              Footwear.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-4 text-sm tracking-wide uppercase md:mt-8">
              <Link
                href="/about"
                className="text-primary inline-flex items-center gap-3"
              >
                More experience <Arrow />
              </Link>
              <a
                href="/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3"
              >
                View resume <Arrow external />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

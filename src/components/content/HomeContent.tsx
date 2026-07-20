import Link from 'next/link';
import TerrainCanvas from '@/components/content/TerrainCanvas';
import ManifoldSlideshow from '@/components/content/ManifoldSlideshow';
import SectionGlyph from '@/components/ui/SectionGlyph';

const Arrow = ({ external = false }: { external?: boolean }) => (
  <span aria-hidden="true">{external ? '↗' : '→'}</span>
);

export default function HomeContent() {
  return (
    <main id="main-content" className="w-full text-dark dark:text-light">
      <section className="relative isolate mt-[57px] overflow-hidden md:mt-0 md:flex md:min-h-[720px] md:items-center">
        <TerrainCanvas />
        <div className="bg-light/70 dark:bg-dark/75 pointer-events-none absolute inset-0 z-[1] md:hidden" />
        <div className="via-light/85 dark:via-dark/85 pointer-events-none absolute inset-0 z-[1] hidden bg-gradient-to-r from-light to-transparent md:block dark:from-dark" />

        <div className="pointer-events-none relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-10 pt-10 md:px-10 md:py-32 lg:px-16">
          <div className="max-w-3xl">
            <p className="mb-4 flex items-center gap-2.5 text-xxs uppercase tracking-[0.22em] text-primary md:mb-6">
              <SectionGlyph /> Design Engineer
            </p>
            <h1 className="text-balance font-serif text-5xl font-normal italic leading-[0.98] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              I design and engineer thoughtful software.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-normal leading-relaxed text-zinc-600 md:mt-8 md:text-xl dark:text-zinc-300">
              I’m Amir, a Design Engineer. I take ideas from early exploration through interaction design all the way to production code.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-sm uppercase tracking-wide md:mt-10">
              <a
                href="#selected-work"
                className="group pointer-events-auto inline-flex items-center gap-3 text-primary"
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
                className="group pointer-events-auto inline-flex items-center gap-3"
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
        <div className="mx-auto max-w-[1440px] px-6 pb-14 pt-10 md:px-10 md:pb-20 md:pt-14 lg:px-16 lg:pb-24 lg:pt-16">
          <div className="mb-8 flex items-baseline justify-between gap-6 md:mb-12">
            <h2
              id="selected-work-heading"
              className="flex items-center gap-2.5 text-xxs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400"
            >
              <SectionGlyph /> Selected work
            </h2>
            <span className="font-mono text-xs text-zinc-400">01 / 01</span>
          </div>

          <article className="group grid overflow-hidden rounded-3xl bg-zinc-100 text-dark md:grid-cols-12 dark:bg-zinc-900 dark:text-light">
            <ManifoldSlideshow />

            <div className="flex flex-col justify-between bg-gradient-to-br from-zinc-900 via-zinc-900 to-fuchsia-950/40 p-7 text-light md:col-span-5 md:p-10 dark:to-fuchsia-950/25">
              <div>
                <h3 className="text-3xl font-medium leading-tight sm:text-4xl">
                  manifold.observer
                </h3>
                <p className="mt-4 max-w-lg text-base font-normal leading-relaxed text-white/70 md:mt-6">
                  An audiovisual experiment that gives information another shape. Add a source, change the conditions, and watch a responsive form reorganize in real time.
                </p>
                <p className="mt-6 text-xxs uppercase leading-relaxed tracking-wide text-white/60">
                  Product design · Interaction design · Frontend engineering
                </p>
              </div>
              <div className="mt-10 flex flex-col items-start gap-4 text-sm uppercase tracking-wide md:mt-14">
                <Link
                  href="/blog/manifold-observer"
                  className="group/link inline-flex items-center gap-3"
                >
                  Read the project note
                  <span className="transition-transform group-hover/link:translate-x-1">
                    <Arrow />
                  </span>
                </Link>
                <a
                  href="https://manifold.observer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-3 text-white/60"
                >
                  Visit the project
                  <span className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
                    <Arrow external />
                  </span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-6 py-14 md:grid-cols-12 md:gap-10 md:px-10 md:py-20 lg:px-16 lg:py-24">
          <div className="md:col-span-4">
            <p className="flex items-center gap-2.5 text-xxs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
              <SectionGlyph /> How I work
            </p>
          </div>
          <div className="md:col-span-8">
            <h2 className="text-balance text-4xl font-medium leading-[1.08] text-zinc-800 lg:text-5xl dark:text-zinc-200">
              I work across product design, interaction design, and frontend engineering.
            </h2>
            <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-zinc-600 md:mt-6 md:text-lg dark:text-zinc-300">
              I am especially effective early, when the problem is still taking shape and the important decisions are being made.
            </p>
            <Link
              href="/about"
              className="group mt-7 inline-flex items-center gap-3 text-sm uppercase tracking-wide text-primary md:mt-8"
            >
              How I work <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-6 py-14 md:grid-cols-12 md:gap-10 md:px-10 md:py-20 lg:px-16 lg:py-24">
          <div className="md:col-span-4">
            <p className="flex items-center gap-2.5 text-xxs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
              <SectionGlyph /> Selected experience
            </p>
          </div>
          <div className="md:col-span-8">
            <p className="max-w-3xl text-xl font-normal leading-relaxed text-zinc-800 sm:text-2xl dark:text-zinc-200">
              I’ve collaborated with teams at Nike’s LeBron James Innovation Center, Columbia Sportswear Company, Mountain Hardwear, and KEEN Footwear.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-4 text-sm uppercase tracking-wide md:mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-primary"
              >
                More experience <Arrow />
              </Link>
              <a
                href="/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3"
              >
                Resume <Arrow external />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

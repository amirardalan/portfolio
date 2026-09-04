import Link from 'next/link';
import TerrainHero from '@/components/content/TerrainHero';
import SelectedWorkStage from '@/components/content/SelectedWorkStage';
import ActionArrow from '@/components/ui/ActionArrow';
import SectionGlyph from '@/components/ui/SectionGlyph';
import { selectedProjects } from '@/content/projects';

export default function HomeContent() {
  return (
    <div className="text-dark dark:text-light w-full">
      <TerrainHero
        eyebrow="Amir Ardalan · Design Engineer"
        showTerrainCanvas
      >
        <div className="max-w-5xl">
          <h1 className="font-editorial text-5xl leading-none font-medium tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl">
            Complex ideas.
            <br />
            Clear, working interfaces.
          </h1>
          <p className="font-editorial mt-6 max-w-2xl text-lg leading-relaxed font-normal text-zinc-600 text-pretty md:mt-8 md:text-2xl dark:text-zinc-300">
            I bridge product design and frontend engineering,{' '}
            <br className="hidden md:block" />
            from early prototype to production.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xxs font-medium tracking-[0.12em] uppercase md:mt-10">
            <a
              href="#selected-work"
              className="group text-primary pointer-events-auto inline-flex min-h-11 items-center gap-3"
            >
              <span>View selected work</span>
              <ActionArrow direction="down" />
            </a>
            <Link
              href="/about"
              className="group pointer-events-auto inline-flex min-h-11 items-center gap-3"
            >
              <span>About me</span>
              <ActionArrow direction="right" />
            </Link>
          </div>
        </div>
      </TerrainHero>

      <section
        id="selected-work"
        aria-labelledby="selected-work-heading"
        className="border-t border-zinc-200 dark:border-zinc-800"
      >
        <SelectedWorkStage projects={selectedProjects} />
      </section>

      <section>
        <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-10 md:py-20 lg:px-16 lg:py-24">
          <div className="grid md:grid-cols-2">
            <article
              aria-labelledby="how-i-work-heading"
              className="flex flex-col pb-8 md:pr-10 md:pb-0 lg:pr-14"
            >
              <div className="flex items-center justify-between border-b border-zinc-300 pb-4 dark:border-zinc-700">
                <h2
                  id="how-i-work-heading"
                  className="text-xxs flex items-center gap-2.5 font-sans tracking-[0.22em] text-zinc-500 uppercase dark:text-zinc-400"
                >
                  <SectionGlyph /> How I work
                </h2>
                <span
                  aria-hidden="true"
                  className="text-xxs font-mono text-zinc-400 dark:text-zinc-600"
                >
                  01
                </span>
              </div>

              <div className="flex flex-1 flex-col pt-7 md:pt-9">
                <p className="font-editorial text-3xl leading-tight font-medium tracking-tight text-zinc-800 text-pretty lg:text-4xl dark:text-zinc-200">
                  I work across product design, interaction design, and frontend
                  engineering.
                </p>
                <p className="font-editorial mt-5 max-w-xl text-base leading-relaxed font-normal text-zinc-600 md:text-lg dark:text-zinc-300">
                  I am especially effective early, when the problem is still
                  taking shape and the important decisions are being made.
                </p>
                <Link
                  href="/about"
                  className="group text-primary mt-8 inline-flex min-h-11 items-center gap-2.5 self-start font-mono text-xxs font-medium tracking-[0.12em] uppercase md:mt-10"
                >
                  <span>How I work</span>
                  <ActionArrow direction="right" />
                </Link>
              </div>
            </article>

            <article
              aria-labelledby="selected-experience-heading"
              className="flex flex-col pt-8 md:pt-0 md:pl-10 lg:pl-14"
            >
              <div className="flex items-center justify-between border-b border-zinc-300 pb-4 dark:border-zinc-700">
                <h2
                  id="selected-experience-heading"
                  className="text-xxs flex items-center gap-2.5 font-sans tracking-[0.22em] text-zinc-500 uppercase dark:text-zinc-400"
                >
                  <SectionGlyph /> Selected experience
                </h2>
                <span
                  aria-hidden="true"
                  className="text-xxs font-mono text-zinc-400 dark:text-zinc-600"
                >
                  02
                </span>
              </div>

              <div className="flex flex-1 flex-col pt-7 md:pt-9">
                <p className="font-editorial text-3xl leading-tight font-medium tracking-tight text-zinc-800 text-pretty lg:text-4xl dark:text-zinc-200">
                  I’ve collaborated with teams at Nike’s LeBron James Innovation
                  Center, Columbia Sportswear Company, Mountain Hardwear, and
                  KEEN Footwear.
                </p>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xxs font-medium tracking-[0.12em] uppercase md:mt-auto md:pt-10">
                  <Link
                    href="/about"
                    className="group text-primary inline-flex min-h-11 items-center gap-3"
                  >
                    <span>About me</span>
                    <ActionArrow direction="right" />
                  </Link>
                  <a
                    href="/resume"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 items-center gap-3"
                  >
                    <span>View resume</span>
                    <ActionArrow direction="external" />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

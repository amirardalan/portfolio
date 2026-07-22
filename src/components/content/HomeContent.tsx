import Link from 'next/link';
import TerrainCanvas from '@/components/content/TerrainCanvas';
import StarField from '@/components/content/StarField';
import ManifoldSlideshow from '@/components/content/ManifoldSlideshow';
import SectionGlyph from '@/components/ui/SectionGlyph';
import { selectedProjects } from '@/content/projects';

const Arrow = ({ external = false }: { external?: boolean }) => (
  <span aria-hidden="true">{external ? '↗' : '→'}</span>
);

export default function HomeContent() {
  return (
    <div className="w-full text-dark dark:text-light">
      <section className="relative isolate overflow-hidden md:flex md:min-h-[720px] md:items-center">
        <StarField />
        <TerrainCanvas />
        <div className="from-light/90 via-light/75 to-light/45 dark:from-black/55 dark:via-black/30 dark:to-black/5 pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r md:hidden" />
        <div className="from-light/90 via-light/70 dark:from-black/50 dark:via-black/25 pointer-events-none absolute inset-0 z-[1] hidden bg-gradient-to-r to-transparent md:block" />

        <div className="pointer-events-none relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-10 pt-[97px] md:px-10 md:py-32 lg:px-16">
          <div className="max-w-3xl">
            <p className="mb-4 flex items-center gap-2.5 text-xxs uppercase tracking-[0.22em] text-primary md:mb-6">
              <SectionGlyph /> Amir Ardalan · Design Engineer
            </p>
            <h1 className="text-balance font-serif text-5xl font-normal italic leading-[0.98] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Complex ideas. Clear, working interfaces.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-normal leading-relaxed text-zinc-600 md:mt-8 md:text-xl dark:text-zinc-300">
              I bridge product design and frontend engineering, from early
              prototype to production.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-sm uppercase tracking-wide md:mt-10">
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
        <div className="mx-auto max-w-[1440px] px-6 pb-14 pt-10 md:px-10 md:pb-20 md:pt-14 lg:px-16 lg:pb-24 lg:pt-16">
          <div className="mb-8 md:mb-12">
            <h2
              id="selected-work-heading"
              className="flex items-center gap-2.5 text-xxs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400"
            >
              <SectionGlyph /> Selected work
            </h2>
          </div>

          <div className="grid gap-8 md:gap-12">
            {selectedProjects.map((project) => (
              <article
                key={project.title}
                className="group grid overflow-hidden rounded-3xl bg-zinc-100 text-dark md:grid-cols-12 dark:bg-zinc-900 dark:text-light"
              >
                {project.media && project.liveUrl && (
                  <ManifoldSlideshow
                    images={project.media}
                    liveUrl={project.liveUrl}
                    projectTitle={project.title}
                  />
                )}

                <div
                  className={`work-card-gradient flex flex-col justify-between p-7 text-light md:p-8 lg:p-10 ${
                    project.media && project.liveUrl
                      ? 'md:col-span-5'
                      : 'md:col-span-12'
                  }`}
                >
                  <div>
                    {(project.status || project.year) && (
                      <div className="mb-5 flex items-center gap-3 font-mono text-xxs uppercase tracking-[0.16em]">
                        {project.status && (
                          <span className="flex items-center gap-2 text-[var(--color-primary-dark)]">
                            <SectionGlyph className="text-[var(--color-primary-dark)]" />
                            {project.status}
                          </span>
                        )}
                        {project.status && project.year && (
                          <span
                            className="h-px w-5 bg-white/25"
                            aria-hidden="true"
                          />
                        )}
                        {project.year && (
                          <span className="text-white/45">{project.year}</span>
                        )}
                      </div>
                    )}
                    <h3 className="text-3xl font-medium leading-tight md:text-2xl lg:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-lg text-base font-normal leading-relaxed text-white/70 md:mt-6">
                      {project.summary}
                    </p>
                    {project.role && project.role.length > 0 && (
                      <p className="mt-6 text-xxs uppercase leading-relaxed tracking-wide text-white/50">
                        {project.role.join(' · ')}
                      </p>
                    )}
                  </div>
                  <div className="mt-10 flex flex-col items-start gap-4 text-sm uppercase tracking-wide md:mt-14">
                    {project.caseStudyUrl && (
                      <Link
                        href={project.caseStudyUrl}
                        className="group/link inline-flex items-center gap-3"
                      >
                        Read about the project
                        <span className="transition-transform group-hover/link:translate-x-1">
                          <Arrow />
                        </span>
                      </Link>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-3 text-white/70"
                      >
                        Open project
                        <span className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
                          <Arrow external />
                        </span>
                      </a>
                    )}
                    {project.sourceUrl && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-3 text-white/70"
                      >
                        View source
                        <span className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
                          <Arrow external />
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
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
              I work across product design, interaction design, and frontend
              engineering.
            </h2>
            <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-zinc-600 md:mt-6 md:text-lg dark:text-zinc-300">
              I am especially effective early, when the problem is still taking
              shape and the important decisions are being made.
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
            <h2 className="flex items-center gap-2.5 text-xxs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
              <SectionGlyph /> Selected experience
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="max-w-3xl text-xl font-normal leading-relaxed text-zinc-800 sm:text-2xl dark:text-zinc-200">
              I’ve collaborated with teams at Nike’s LeBron James Innovation
              Center, Columbia Sportswear Company, Mountain Hardwear, and KEEN
              Footwear.
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
                View resume <Arrow external />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

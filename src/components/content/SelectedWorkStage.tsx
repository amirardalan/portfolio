'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import SectionGlyph from '@/components/ui/SectionGlyph';
import type { Project } from '@/content/projects';

type SelectedWorkStageProps = {
  projects: Project[];
};

const ProjectArrow = ({ external = false }: { external?: boolean }) => (
  <span aria-hidden="true">{external ? '↗' : '→'}</span>
);

function ProjectMedia({
  project,
  priority,
}: {
  project: Project;
  priority: boolean;
}) {
  const image = (
    <Image
      key={project.hero.src}
      src={project.hero.src}
      alt={project.hero.alt}
      fill={project.hero.treatment === 'manifold'}
      width={project.hero.treatment === 'between' ? 1440 : undefined}
      height={project.hero.treatment === 'between' ? 900 : undefined}
      priority={priority}
      sizes="(min-width: 768px) 58vw, 100vw"
      className={
        project.hero.treatment === 'manifold' ? 'object-cover' : 'h-auto w-full'
      }
      style={{ objectPosition: project.hero.position ?? 'center' }}
    />
  );

  return (
    <div className="relative min-h-72 overflow-hidden bg-zinc-950 sm:min-h-96 md:col-span-7 md:min-h-[520px]">
      {project.hero.treatment === 'between' ? (
        <>
          <div
            className="absolute inset-0 bg-gradient-to-br from-zinc-800/60 via-zinc-950 to-black"
            aria-hidden="true"
          />
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} project (opens in a new tab)`}
            className="absolute top-1/2 left-5 w-[108%] -translate-y-1/2 sm:left-8 sm:w-[104%] md:left-10 md:w-[108%]"
          >
            <span
              className="block overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl shadow-black/70"
              style={{
                transform:
                  'perspective(1200px) rotateX(1deg) rotateY(-4deg) rotateZ(-1deg)',
                transformOrigin: 'center',
              }}
            >
              {image}
            </span>
          </a>
        </>
      ) : (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} project (opens in a new tab)`}
          className="absolute inset-0"
        >
          {image}
        </a>
      )}
    </div>
  );
}

export default function SelectedWorkStage({
  projects,
}: SelectedWorkStageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const project = projects[activeIndex];

  if (!project) {
    return null;
  }

  const selectProject = (index: number, moveFocus = false) => {
    setActiveIndex(index);
    if (moveFocus) {
      window.requestAnimationFrame(() => tabRefs.current[index]?.focus());
    }
  };

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % projects.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + projects.length) % projects.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = projects.length - 1;
    }

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    selectProject(nextIndex, true);
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Selected projects"
        className="mb-6 flex overflow-x-auto border-b border-zinc-200 md:mb-8 dark:border-zinc-800"
      >
        {projects.map((item, index) => {
          const active = index === activeIndex;
          const number = String(index + 1).padStart(2, '0');

          return (
            <button
              key={item.title}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`project-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="selected-project-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => selectProject(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={`-mb-px flex min-h-11 shrink-0 items-baseline gap-2 border-b px-1 py-3 text-left transition-colors first:pr-6 last:pl-6 md:first:pr-8 md:last:pl-8 ${
                active
                  ? 'border-primary text-dark dark:text-light'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              <span className="text-xxs w-5 shrink-0 font-mono tabular-nums">
                {number}
              </span>
              <span className="text-sm font-medium">{item.title}</span>
            </button>
          );
        })}
      </div>

      <article
        id="selected-project-panel"
        role="tabpanel"
        aria-labelledby={`project-tab-${activeIndex}`}
        tabIndex={0}
        className="group text-dark dark:text-light grid overflow-hidden rounded-3xl bg-zinc-100 md:grid-cols-12 dark:bg-zinc-900"
      >
        <ProjectMedia project={project} priority={activeIndex === 0} />

        <div className="work-card-gradient text-light flex flex-col justify-between p-7 md:col-span-5 md:p-8 lg:p-10">
          <div>
            <div className="text-xxs mb-5 flex items-center gap-3 font-mono tracking-[0.16em] uppercase">
              <span className="flex items-center gap-2 text-(--color-primary-dark)">
                <SectionGlyph className="text-(--color-primary-dark)" />
                {project.status}
              </span>
              <span className="h-px w-5 bg-white/25" aria-hidden="true" />
              <span className="text-white/45">{project.year}</span>
            </div>
            <h3 className="text-3xl leading-tight font-medium md:text-2xl lg:text-4xl">
              {project.title}
            </h3>
            <p className="mt-4 max-w-lg text-base leading-relaxed font-normal text-white/70 md:mt-6">
              {project.summary}
            </p>
            <p className="text-xxs mt-6 leading-relaxed tracking-wide text-white/50 uppercase">
              {project.role.join(' · ')}
            </p>
          </div>

          <div className="mt-10 flex flex-col items-start gap-4 text-sm tracking-wide uppercase md:mt-14">
            {project.caseStudyUrl && (
              <Link
                href={project.caseStudyUrl}
                aria-label={`Read about ${project.title}`}
                className="group/link inline-flex items-center gap-3"
              >
                Read about the project
                <span className="transition-transform group-hover/link:translate-x-1">
                  <ProjectArrow />
                </span>
              </Link>
            )}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} project (opens in a new tab)`}
              className="group/link inline-flex items-center gap-3 text-white/70"
            >
              Open project
              <span className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                <ProjectArrow external />
              </span>
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}

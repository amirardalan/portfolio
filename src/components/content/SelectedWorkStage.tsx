'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import ManifoldSlideshow from '@/components/content/ManifoldSlideshow';
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
  if (project.visual.treatment === 'manifold') {
    return (
      <ManifoldSlideshow
        images={project.visual.images}
        liveUrl={project.liveUrl}
        projectTitle={project.title}
      />
    );
  }

  const image = (
    <Image
      src={project.visual.src}
      alt={project.visual.alt}
      width={1448}
      height={1086}
      priority={priority}
      sizes="(min-width: 768px) 58vw, 100vw"
      className="h-full w-full object-cover"
      style={{ objectPosition: project.visual.position ?? 'bottom' }}
    />
  );

  return (
    <div className="relative min-h-80 overflow-hidden bg-stone-100 sm:min-h-110 md:col-span-7 lg:min-h-140">
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title} project (opens in a new tab)`}
        className="absolute inset-0"
      >
        <span className="block h-full w-full overflow-hidden">{image}</span>
      </a>
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
      <div className="mb-6 overflow-x-auto overflow-y-hidden md:mb-8">
        <div
          role="tablist"
          aria-label="Selected projects"
          className="flex w-max min-w-full border-b border-zinc-200 dark:border-zinc-800"
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
                className={`relative -mb-px flex min-h-11 shrink-0 cursor-pointer items-baseline gap-2 px-1 py-3 text-left transition-colors first:pr-6 last:px-6 md:first:pr-8 md:last:px-8 ${
                  active
                    ? 'text-dark dark:text-light'
                    : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                {active && (
                  <span
                    aria-hidden="true"
                    className={`border-primary absolute right-1 bottom-0 border-b ${
                      index === projects.length - 1
                        ? 'left-6 md:left-8'
                        : 'left-1'
                    }`}
                  />
                )}
                <span className="text-xxs w-5 shrink-0 font-mono tabular-nums">
                  {number}
                </span>
                <span className="text-sm font-medium">{item.title}</span>
              </button>
            );
          })}
        </div>
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

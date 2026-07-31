'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import ManifoldSlideshow from '@/components/content/ManifoldSlideshow';
import ActionArrow from '@/components/ui/ActionArrow';
import SectionGlyph from '@/components/ui/SectionGlyph';
import type { Project } from '@/content/projects';

type SelectedWorkStageProps = {
  projects: Project[];
};

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

  const desktopPositionClass = {
    top: 'md:object-top',
    center: 'md:object-center',
    bottom: 'md:object-bottom',
  }[project.visual.position ?? 'bottom'];

  const image = (
    <Image
      src={project.visual.src}
      alt={project.visual.alt}
      width={1448}
      height={1086}
      priority={priority}
      sizes="(min-width: 768px) 58vw, 100vw"
      className={`h-full w-full object-cover object-center ${desktopPositionClass}`}
    />
  );

  return (
    <div className="relative min-h-80 overflow-hidden bg-stone-100 sm:min-h-110 md:col-span-7 md:ml-10 lg:ml-[max(4rem,calc((100vw-90rem)/2+4rem))] lg:min-h-140">
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

  const selectAdjacentProject = (offset: number) => {
    selectProject((activeIndex + offset + projects.length) % projects.length);
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
      <div className="mx-auto max-w-[1440px] px-6 pt-10 pb-4 md:px-10 md:pt-14 lg:px-16 lg:pt-16">
        <div className="md:flex md:items-center">
          <h2
            id="selected-work-heading"
            className="text-xxs flex shrink-0 items-center gap-2.5 pb-2 font-sans tracking-[0.22em] text-zinc-500 uppercase md:min-h-14 md:pr-10 md:pb-0 dark:text-zinc-400"
          >
            <SectionGlyph /> Selected work
          </h2>

          <div className="flex min-h-12 items-center justify-between gap-4 md:hidden">
            <p className="text-primary flex min-w-0 items-center gap-4 font-mono text-xxs font-medium tracking-[0.12em] uppercase">
              <span aria-live="polite" className="truncate">
                {project.title}
              </span>
              <span aria-hidden="true" className="size-1.5 shrink-0 bg-current" />
            </p>

            <div className="flex shrink-0 items-center font-mono text-xxs tabular-nums">
              <button
                type="button"
                aria-label="Show previous project"
                onClick={() => selectAdjacentProject(-1)}
                className="group flex size-11 cursor-pointer items-center justify-center"
              >
                <ActionArrow direction="left" />
              </button>
              <span className="text-zinc-500 dark:text-zinc-400">
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(projects.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                aria-label="Show next project"
                onClick={() => selectAdjacentProject(1)}
                className="group flex size-11 cursor-pointer items-center justify-center"
              >
                <ActionArrow direction="right" />
              </button>
            </div>
          </div>

          <div className="hidden min-w-0 overflow-x-auto overflow-y-hidden md:block md:flex-1">
            <div
              role="tablist"
              aria-label="Selected projects"
              className="flex w-max"
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
                    className={`group/tab flex min-h-14 shrink-0 cursor-pointer items-center gap-4 px-5 py-4 text-left transition-colors first:pl-0 last:pr-0 ${
                      active
                        ? 'text-primary'
                        : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
                    }`}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="text-xxs shrink-0 font-mono tabular-nums opacity-60">
                        {number} /
                      </span>
                      <span className="font-mono text-xxs font-medium tracking-[0.12em] uppercase">
                        {item.title}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`size-1.5 shrink-0 bg-current transition-opacity ${
                        active
                          ? 'opacity-100'
                          : 'opacity-0 group-hover/tab:opacity-40'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <article
        id="selected-project-panel"
        role="tabpanel"
        aria-labelledby={`project-tab-${activeIndex}`}
        tabIndex={0}
        className="group/card grid overflow-hidden md:grid-cols-12"
      >
        <ProjectMedia project={project} priority={activeIndex === 0} />

        <div className="bg-primary flex flex-col justify-between p-7 text-light md:col-span-5 md:p-8 lg:p-10 dark:text-dark">
          <div className="flex flex-1 flex-col">
            <div className="text-xxs flex items-center gap-3 pb-4 font-sans tracking-[0.16em] uppercase">
              <span className="flex items-center gap-2">
                <SectionGlyph className="text-current" />
                {project.status}
              </span>
              <span
                aria-hidden="true"
                className="h-px w-10 shrink-0 bg-current opacity-40"
              />
              <span className="font-mono opacity-60">{project.year}</span>
            </div>

            <h3 className="font-editorial mt-8 text-4xl leading-none font-medium tracking-tight md:text-3xl lg:text-5xl">
              {project.title}
            </h3>
            <p className="font-editorial mt-5 max-w-lg text-base leading-relaxed font-normal opacity-75 md:mt-6 md:text-lg">
              {project.summary}
            </p>

            <p className="text-xxs mt-7 border-t border-light/25 pt-4 font-sans leading-relaxed tracking-wider uppercase opacity-65 dark:border-dark/25">
              {project.role.join(' / ')}
            </p>
          </div>

          <div className="mt-10 flex flex-col items-start gap-1 font-mono text-xxs font-medium tracking-[0.12em] uppercase md:mt-14">
            {project.caseStudyUrl && (
              <Link
                href={project.caseStudyUrl}
                aria-label={`Read about ${project.title}`}
                className="group inline-flex min-h-11 items-center gap-2.5"
              >
                <span>Read about the project</span>
                <ActionArrow direction="right" />
              </Link>
            )}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} project (opens in a new tab)`}
              className="group inline-flex min-h-11 items-center gap-2.5 opacity-70 transition-opacity hover:opacity-100"
            >
              <span>Open project</span>
              <ActionArrow direction="external" />
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}

import Link from 'next/link';
import SectionGlyph from '@/components/ui/SectionGlyph';
import ActionArrow from '@/components/ui/ActionArrow';

interface ProjectCTAProps {
  href: string;
  title: string;
  description?: string;
  label?: string;
  eyebrow?: string;
}

export default function ProjectCTA({
  href,
  title,
  description,
  label = 'Open project',
  eyebrow = 'Live project',
}: ProjectCTAProps) {
  const isInternal = href.startsWith('/');
  const isHashLink = href.startsWith('#');
  const className =
    'bg-primary group relative -mx-6 my-12 flex w-screen flex-col overflow-clip border border-primary p-6 text-light no-underline sm:mx-0 sm:w-full sm:p-7 dark:text-dark';

  const content = (
    <>
      <span className="relative flex min-w-0 flex-1 flex-col">
        <span className="text-xxs mb-8 flex items-center gap-2.5 font-sans tracking-[0.18em] uppercase opacity-70">
          <SectionGlyph className="text-current" />
          {eyebrow}
        </span>
        <span className="font-editorial block text-3xl leading-none font-medium tracking-tight md:text-4xl">
          {title}
        </span>
        {description && (
          <span className="font-editorial mt-4 block max-w-xl text-base leading-relaxed font-normal opacity-70 md:text-lg">
            {description}
          </span>
        )}
      </span>
      <span className="relative mt-8 flex min-h-11 items-center justify-between gap-4 border-t border-current/25 pt-4 font-mono text-xxs tracking-[0.12em] uppercase">
        {label}
        {!isInternal && !isHashLink && (
          <span className="sr-only"> (opens in a new tab)</span>
        )}
        <span
          className="flex shrink-0 items-center justify-center overflow-hidden font-mono text-base"
          aria-hidden="true"
        >
          {!isInternal && !isHashLink ? (
            <ActionArrow direction="external" />
          ) : (
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          )}
        </span>
      </span>
    </>
  );

  if (isInternal) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  if (isHashLink) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </a>
  );
}

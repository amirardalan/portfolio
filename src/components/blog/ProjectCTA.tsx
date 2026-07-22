import Link from 'next/link';
import SectionGlyph from '@/components/ui/SectionGlyph';

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
    'work-card-gradient group relative my-10 flex w-full flex-col overflow-clip rounded-2xl border border-white/10 p-6 text-light no-underline shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-black/10';

  const content = (
    <>
      <span
        className="pointer-events-none absolute -top-20 -right-16 size-56 rounded-full bg-white/5 blur-3xl"
        aria-hidden="true"
      />
      <span className="relative flex min-w-0 flex-1 flex-col">
        <span className="text-xxs mb-4 flex items-center gap-2.5 font-mono tracking-[0.18em] text-[var(--color-primary-dark)] uppercase">
          <SectionGlyph className="text-[var(--color-primary-dark)]" />
          {eyebrow}
        </span>
        <span className="text-light block text-2xl leading-tight font-medium md:text-3xl">
          {title}
        </span>
        {description && (
          <span className="mt-3 block max-w-xl text-base leading-relaxed font-normal text-white/65">
            {description}
          </span>
        )}
      </span>
      <span className="relative mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs tracking-[0.12em] text-white/80 uppercase">
        {label}
        {!isInternal && !isHashLink && (
          <span className="sr-only"> (opens in a new tab)</span>
        )}
        <span
          className="group-hover:text-dark flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/5 text-lg transition-[background-color,color] duration-300 group-hover:bg-[var(--color-primary-dark)]"
          aria-hidden="true"
        >
          <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            {!isInternal && !isHashLink ? '↗' : '→'}
          </span>
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

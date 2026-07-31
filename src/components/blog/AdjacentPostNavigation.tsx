'use client';

import Link from 'next/link';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface AdjacentPost {
  slug: string;
  title: string;
}

interface AdjacentPostNavigationProps {
  previous: AdjacentPost | null;
  next: AdjacentPost | null;
}

function NavigationChevron({
  direction,
}: {
  direction: 'left' | 'right';
}) {
  return (
    <svg
      viewBox="0 0 9 18"
      className="h-5 w-2.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      <path
        d={direction === 'left' ? 'M7 2L1.5 9L7 16' : 'M2 2L7.5 9L2 16'}
      />
    </svg>
  );
}

export default function AdjacentPostNavigation({
  previous,
  next,
}: AdjacentPostNavigationProps) {
  const isMobile = useMediaQuery(768);

  const truncateText = (text: string, maxLength: number = 30) => {
    if (!isMobile) return text;
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <nav
      className="border-t border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
      aria-label="Adjacent posts"
    >
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-1">
          {previous && (
            <Link
              href={`/blog/${previous.slug}`}
              className="group flex min-h-24 items-center gap-3 border-r border-zinc-300 pr-3 transition-colors md:hover:text-primary dark:border-zinc-700"
            >
              <span
                aria-hidden="true"
                className="shrink-0 transition-transform group-hover:-translate-x-0.5"
              >
                <NavigationChevron direction="left" />
              </span>
              <span className="min-w-0">
                <span className="text-xxs block font-sans tracking-[0.14em] uppercase">
                  Previous
                </span>
                <span
                  className="font-editorial mt-1 block break-words text-base leading-tight text-dark dark:text-light md:text-lg"
                  title={previous.title}
                >
                  {truncateText(previous.title)}
                </span>
              </span>
            </Link>
          )}
        </div>

        <div className="col-span-1 text-right">
          {next && (
            <Link
              href={`/blog/${next.slug}`}
              className="group flex min-h-24 items-center justify-end gap-3 pl-3 transition-colors md:hover:text-primary"
            >
              <span className="min-w-0">
                <span className="text-xxs block font-sans tracking-[0.14em] uppercase">
                  Next
                </span>
                <span
                  className="font-editorial mt-1 block break-words text-right text-base leading-tight text-dark dark:text-light md:text-lg"
                  title={next.title}
                >
                  {truncateText(next.title)}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 transition-transform group-hover:translate-x-0.5"
              >
                <NavigationChevron direction="right" />
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

import Link from 'next/link';

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
  return (
    <nav
      className="border-t border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
      aria-label="Adjacent posts"
    >
      <div className="grid grid-cols-2 gap-3 px-4 sm:gap-6 sm:px-0">
        <div className="col-span-1 min-w-0">
          {previous && (
            <Link
              href={`/blog/${previous.slug}`}
              className="group flex min-h-24 min-w-0 items-center gap-2 transition-colors sm:gap-3 md:hover:text-primary"
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
                  className="font-editorial mt-1 block truncate text-base leading-tight text-dark sm:overflow-visible sm:text-clip sm:whitespace-normal sm:break-words dark:text-light md:text-lg"
                  title={previous.title}
                >
                  {previous.title}
                </span>
              </span>
            </Link>
          )}
        </div>

        <div className="col-span-1 min-w-0 text-right">
          {next && (
            <Link
              href={`/blog/${next.slug}`}
              className="group flex min-h-24 min-w-0 items-center justify-end gap-2 transition-colors sm:gap-3 md:hover:text-primary"
            >
              <span className="min-w-0">
                <span className="text-xxs block font-sans tracking-[0.14em] uppercase">
                  Next
                </span>
                <span
                  className="font-editorial mt-1 block truncate text-right text-base leading-tight text-dark sm:overflow-visible sm:text-clip sm:whitespace-normal sm:break-words dark:text-light md:text-lg"
                  title={next.title}
                >
                  {next.title}
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

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
    <nav className="mt-8 border-t border-zinc-300 pt-5 dark:border-zinc-700">
      <div className="mb-4 grid grid-cols-2 gap-6">
        <div className="col-span-1 text-xxs lg:text-sm">
          {previous && (
            <Link
              href={`/blog/${previous.slug}`}
              className="group flex items-center space-x-1 md:hover:text-primary"
            >
              <span aria-hidden="true" className="flex-shrink-0">
                &larr;
              </span>
              <span className="break-words" title={previous.title}>
                {truncateText(previous.title)}
              </span>
            </Link>
          )}
        </div>

        <div className="col-span-1 text-right text-xxs lg:text-sm">
          {next && (
            <Link
              href={`/blog/${next.slug}`}
              className="group flex items-center justify-end space-x-1 md:hover:text-primary"
            >
              <span className="break-words text-right" title={next.title}>
                {truncateText(next.title)}
              </span>
              <span aria-hidden="true" className="flex-shrink-0">
                &rarr;
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

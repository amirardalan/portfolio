'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
  className?: string;
}

export default function Pagination({
  totalPages,
  className = '',
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get('page') || '1');

  if (totalPages <= 1) return null;

  // Create new URLSearchParams instance to manipulate
  function createPageURL(pageNumber: number): string {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav
      aria-label="Pagination"
      className={`flex justify-center space-x-2 ${className}`}
    >
      {Array.from({ length: totalPages }, (_, index) => (
        <Link
          key={index}
          href={createPageURL(index + 1)}
          className={clsx(
            'flex h-10 min-w-10 items-center justify-center rounded-full border px-3 font-mono text-xs transition-colors',
            currentPage === index + 1
              ? 'border-dark bg-dark text-light dark:border-light dark:bg-light dark:text-dark'
              : 'hover:border-primary hover:text-primary border-zinc-300 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400'
          )}
          aria-current={currentPage === index + 1 ? 'page' : undefined}
        >
          {index + 1}
        </Link>
      ))}
    </nav>
  );
}

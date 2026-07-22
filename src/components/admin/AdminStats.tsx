'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPostCounts } from '@/services/stats';
import { useToast } from '@/components/ui/ToastContext';

interface BlogCountStats {
  publishedCount: number;
  draftCount: number;
}

export default function AdminStats() {
  const [stats, setStats] = useState<BlogCountStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      try {
        const data = await getPostCounts();
        setStats(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load stats';
        showToast(errorMessage, 'error');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, [showToast]);

  const totalCount = stats ? stats.publishedCount + stats.draftCount : 0;

  return (
    <section aria-labelledby="library-heading">
      <div className="mb-5 flex items-center justify-between">
        <h2
          id="library-heading"
          className="text-xxs tracking-[0.2em] text-zinc-500 uppercase dark:text-zinc-400"
        >
          Library at a glance
        </h2>
        <span className="text-xxs tracking-[0.14em] text-zinc-400 uppercase dark:text-zinc-600">
          All writing
        </span>
      </div>
      <div className="text-dark dark:text-light overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100/60 dark:border-zinc-800 dark:bg-zinc-900/60">
        {loading && (
          <div className="grid grid-cols-1 divide-y divide-zinc-200 md:grid-cols-3 md:divide-x md:divide-y-0 dark:divide-zinc-800">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-light dark:bg-dark animate-pulse p-7 md:p-8"
              >
                <div className="mb-5 h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-10 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
              </div>
            ))}
          </div>
        )}

        {stats && !loading && (
          <div className="grid grid-cols-1 divide-y divide-zinc-200 md:grid-cols-3 md:divide-x md:divide-y-0 dark:divide-zinc-800">
            <Link
              href="/admin/blog/published"
              className="group bg-light dark:bg-dark p-7 transition-colors hover:bg-zinc-50 md:p-8 dark:hover:bg-zinc-900"
            >
              <p className="text-xxs tracking-[0.16em] text-zinc-500 uppercase dark:text-zinc-400">
                Published
              </p>
              <div className="mt-4 flex items-end justify-between">
                <p className="font-serif text-5xl font-normal italic">
                  {stats.publishedCount}
                </p>
                <span className="text-primary mb-1 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
            <Link
              href="/admin/blog/drafts"
              className="group bg-light dark:bg-dark p-7 transition-colors hover:bg-zinc-50 md:p-8 dark:hover:bg-zinc-900"
            >
              <p className="text-xxs tracking-[0.16em] text-zinc-500 uppercase dark:text-zinc-400">
                Drafts
              </p>
              <div className="mt-4 flex items-end justify-between">
                <p className="font-serif text-5xl font-normal italic">
                  {stats.draftCount}
                </p>
                <span className="text-primary mb-1 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
            <div className="bg-light dark:bg-dark p-7 md:p-8">
              <p className="text-xxs tracking-[0.16em] text-zinc-500 uppercase dark:text-zinc-400">
                Total posts
              </p>
              <p className="mt-4 font-serif text-5xl font-normal italic">
                {totalCount}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

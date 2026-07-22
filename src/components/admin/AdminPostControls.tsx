'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthProvider';

interface AdminPostControlsProps {
  slug: string;
  published: boolean;
}

export default function AdminPostControls({
  slug,
  published,
}: AdminPostControlsProps) {
  const { session } = useAuth();

  if (!session?.user) return null;

  return (
    <div className="mb-6 flex items-center gap-2">
      <Link
        href={`/admin/blog/edit/${slug}`}
        className="bg-dark text-xxs text-light hover:bg-primary dark:bg-light dark:text-dark inline-flex min-h-9 cursor-pointer items-center rounded-full px-4 tracking-[0.1em] uppercase transition-colors"
      >
        Edit Post
      </Link>
      {!published && (
        <Link
          href="/admin/blog/drafts"
          className="text-xxs cursor-pointer rounded-full bg-amber-100 px-3 py-1.5 tracking-[0.1em] text-amber-800 uppercase dark:bg-amber-950 dark:text-amber-300"
          title="View all drafts"
        >
          Draft
        </Link>
      )}
    </div>
  );
}

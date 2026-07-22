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
    <div className="flex w-full justify-between space-x-2">
      <Link
        href={`/admin/blog/edit/${slug}`}
        className="text-light dark:text-dark rounded bg-zinc-800 px-2 py-1 text-sm dark:bg-zinc-50"
      >
        Edit Post
      </Link>
      {!published && (
        <Link
          href="/admin/blog/drafts"
          className="rounded bg-yellow-200 px-2 py-1 text-sm text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200"
          title="View all drafts"
        >
          Draft
        </Link>
      )}
    </div>
  );
}

import { formatDate } from '@/utils/format-date';
import calculateReadTime from '@/utils/calculate-readtime';
import { BlogPost } from '@/types/blog';
import Link from 'next/link';

interface BlogPostCardProps {
  post: BlogPost;
  pinned?: boolean;
  index: string;
}

export default function BlogPostCard({
  post,
  pinned = false,
  index,
}: BlogPostCardProps) {
  const dateFormatted = formatDate(
    post.show_updated ? (post.updated_at ?? post.created_at) : post.created_at,
    'short'
  );
  const readTime = calculateReadTime(post.content);
  const category = post.category?.name ?? 'Uncategorized';

  if (pinned) {
    return (
      <li className="border-b border-zinc-300 dark:border-zinc-700">
        <Link
          href={`/blog/${post.slug}`}
          className="group grid gap-y-6 py-8 md:min-h-44 md:grid-cols-12 md:gap-x-8 md:py-10 lg:gap-x-12"
        >
          <div className="md:col-span-2">
            <p className="text-primary text-xxs flex items-baseline gap-2 uppercase">
              <span className="font-mono tabular-nums">{index} /</span>
              <span className="font-sans tracking-[0.16em]">Featured</span>
            </p>
          </div>

          <div className="md:col-span-7">
            <h2 className="font-editorial text-2xl leading-tight font-medium tracking-tight transition-colors md:text-3xl md:group-hover:text-primary lg:text-4xl">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="font-editorial mt-3 max-w-3xl text-base leading-relaxed font-normal text-zinc-600 md:text-lg dark:text-zinc-300">
                {post.excerpt}
              </p>
            )}
          </div>

          <div className="ml-auto flex flex-col items-end text-right md:col-span-3">
            <span className="text-xxs font-sans tracking-[0.16em] text-zinc-500 uppercase">
              {category}
            </span>
            <time className="text-dark mt-4 font-mono text-xs tracking-[0.08em] uppercase dark:text-light">
              {dateFormatted}
            </time>
            <span className="mt-2 font-mono text-xxs tracking-[0.12em] text-zinc-500 uppercase dark:text-zinc-400">
              {readTime}
            </span>
          </div>
        </Link>
      </li>
    );
  }

  return (
    <li className="border-b border-zinc-300 dark:border-zinc-700">
      <Link
        href={`/blog/${post.slug}`}
        className="group grid gap-y-6 py-8 md:min-h-44 md:grid-cols-12 md:gap-x-8 md:py-10 lg:gap-x-12"
      >
        <div className="md:col-span-2">
          <span className="text-xxs font-mono text-zinc-400 tabular-nums dark:text-zinc-600">
            {index} /
          </span>
        </div>

        <div className="md:col-span-7">
          <h2 className="font-editorial text-2xl leading-tight font-medium tracking-tight transition-colors md:text-3xl md:group-hover:text-primary lg:text-4xl">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="font-editorial mt-3 max-w-3xl text-base leading-relaxed font-normal text-zinc-600 md:text-lg dark:text-zinc-300">
              {post.excerpt}
            </p>
          )}
        </div>

        <div className="ml-auto flex flex-col items-end text-right md:col-span-3">
          <span className="text-xxs font-sans tracking-[0.16em] text-zinc-500 uppercase">
            {category}
          </span>
          <time className="text-dark mt-4 font-mono text-xs tracking-[0.08em] uppercase dark:text-light">
            {dateFormatted}
          </time>
          <span className="mt-2 font-mono text-xxs tracking-[0.12em] text-zinc-500 uppercase dark:text-zinc-400">
            {readTime}
          </span>
        </div>
      </Link>
    </li>
  );
}

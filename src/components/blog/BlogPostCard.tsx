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
      <li className="border-b border-zinc-400 dark:border-zinc-800">
        <Link
          href={`/blog/${post.slug}`}
          className="group grid gap-y-7 py-7 md:min-h-44 md:grid-cols-12 md:gap-x-8 md:gap-y-6 md:py-10 lg:gap-x-12"
        >
          <div className="flex flex-col items-start gap-3 md:col-span-2">
            <div className="flex items-baseline gap-4">
              <p className="text-xxs uppercase">
                <span className="font-mono text-zinc-400 tabular-nums dark:text-zinc-600">
                  {index} /
                </span>
              </p>
              <span className="text-xxs font-sans tracking-[0.16em] whitespace-nowrap text-zinc-500 uppercase">
                {category}
              </span>
            </div>
            <span className="text-primary text-xxs font-sans tracking-[0.16em] uppercase">
              Featured
            </span>
          </div>

          <div className="md:col-span-7">
            <h2 className="font-editorial text-2xl leading-tight font-medium tracking-tight transition-colors md:-translate-y-px md:text-3xl md:group-hover:text-primary lg:text-4xl">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="font-editorial mt-3 max-w-3xl text-base leading-relaxed font-normal text-zinc-700 md:text-lg dark:text-zinc-400">
                {post.excerpt}
              </p>
            )}
          </div>

          <div className="flex items-center gap-5 md:col-span-3 md:ml-auto md:flex-col md:items-end md:gap-0 md:text-right">
            <time className="font-mono text-xxs tracking-[0.08em] whitespace-nowrap text-zinc-500 uppercase md:text-dark dark:text-zinc-400 md:dark:text-light">
              {dateFormatted}
            </time>
            <span className="font-mono text-xxs tracking-[0.12em] whitespace-nowrap text-zinc-500 uppercase md:mt-2 dark:text-zinc-400">
              {readTime}
            </span>
          </div>
        </Link>
      </li>
    );
  }

  return (
    <li className="border-b border-zinc-400 dark:border-zinc-800">
      <Link
        href={`/blog/${post.slug}`}
        className="group grid gap-y-7 py-7 md:min-h-44 md:grid-cols-12 md:gap-x-8 md:gap-y-6 md:py-10 lg:gap-x-12"
      >
        <div className="flex items-baseline gap-4 md:col-span-2">
          <span className="text-xxs font-mono text-zinc-400 tabular-nums dark:text-zinc-600">
            {index} /
          </span>
          <span className="text-xxs font-sans tracking-[0.16em] whitespace-nowrap text-zinc-500 uppercase">
            {category}
          </span>
        </div>

        <div className="md:col-span-7">
          <h2 className="font-editorial text-2xl leading-tight font-medium tracking-tight transition-colors md:-translate-y-px md:text-3xl md:group-hover:text-primary lg:text-4xl">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="font-editorial mt-3 max-w-3xl text-base leading-relaxed font-normal text-zinc-700 md:text-lg dark:text-zinc-400">
              {post.excerpt}
            </p>
          )}
        </div>

        <div className="flex items-center gap-5 md:col-span-3 md:ml-auto md:flex-col md:items-end md:gap-0 md:text-right">
          <time className="font-mono text-xxs tracking-[0.08em] whitespace-nowrap text-zinc-500 uppercase md:text-dark dark:text-zinc-400 md:dark:text-light">
            {dateFormatted}
          </time>
          <span className="font-mono text-xxs tracking-[0.12em] whitespace-nowrap text-zinc-500 uppercase md:mt-2 dark:text-zinc-400">
            {readTime}
          </span>
        </div>
      </Link>
    </li>
  );
}

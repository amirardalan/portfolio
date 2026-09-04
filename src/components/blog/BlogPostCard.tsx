import { formatDate } from '@/utils/format-date';
import calculateReadTime from '@/utils/calculate-readtime';
import { BlogPost } from '@/types/blog';
import Link from 'next/link';

interface BlogPostCardProps {
  post: BlogPost;
  pinned?: boolean;
  index: string;
}

function PinIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="7 2 10 20"
      fill="none"
      className="h-8 w-4 md:h-9 md:w-4.5"
    >
      <path
        d="M9 3h6M10 3v6.25L7.5 12v2h9v-2L14 9.25V3M12 14v7"
        stroke="currentColor"
        strokeWidth="0.85"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
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
      <li className="bg-primary -mx-6 px-6 text-light md:-mx-10 md:px-10 lg:-mx-16 lg:px-16 dark:text-dark">
        <Link
          href={`/blog/${post.slug}`}
          className="group grid gap-y-3 py-6 md:min-h-44 md:grid-cols-12 md:gap-x-8 md:gap-y-6 md:py-10 lg:gap-x-12"
        >
          <div className="relative flex items-start justify-between md:col-span-2">
            <div className="flex items-baseline gap-3">
              <p className="text-xxs whitespace-nowrap uppercase">
                <span className="font-mono tabular-nums opacity-60">
                  {index} /
                </span>
              </p>
              <span className="text-xxs font-sans tracking-[0.16em] whitespace-nowrap uppercase opacity-70">
                {category}
              </span>
            </div>
            <span
              role="img"
              aria-label="Pinned post"
              className="mr-2 opacity-65 md:absolute md:bottom-0 md:left-0 md:mr-0 dark:opacity-100"
            >
              <PinIcon />
            </span>
          </div>

          <div className="md:col-span-7">
            <h2 className="font-editorial text-2xl leading-tight font-medium tracking-tight transition-opacity md:-translate-y-px md:text-3xl md:group-hover:opacity-70 lg:text-4xl">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="font-editorial mt-3 max-w-3xl text-base leading-relaxed font-normal opacity-75 md:text-lg">
                {post.excerpt}
              </p>
            )}
          </div>

          <div className="flex items-center gap-5 md:col-span-3 md:ml-auto md:flex-col md:items-end md:gap-0 md:text-right">
            <time className="font-mono text-xxs tracking-[0.08em] whitespace-nowrap uppercase">
              {dateFormatted}
            </time>
            <span className="font-mono text-xxxs tracking-[0.12em] whitespace-nowrap uppercase opacity-65 md:mt-2">
              {readTime}
            </span>
          </div>
        </Link>
      </li>
    );
  }

  return (
    <li className="-mx-6 border-b border-zinc-200 md:-mx-10 lg:-mx-16 dark:border-zinc-800">
      <Link
        href={`/blog/${post.slug}`}
        className="group grid gap-y-7 px-6 py-7 md:min-h-44 md:grid-cols-12 md:gap-x-8 md:gap-y-6 md:px-10 md:py-10 lg:gap-x-12 lg:px-16"
      >
        <div className="flex items-baseline gap-3 md:col-span-2">
          <span className="text-xxs font-mono whitespace-nowrap text-zinc-400 tabular-nums dark:text-zinc-600">
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
          <span className="font-mono text-xxxs tracking-[0.12em] whitespace-nowrap text-zinc-500 uppercase md:mt-2 dark:text-zinc-400">
            {readTime}
          </span>
        </div>
      </Link>
    </li>
  );
}

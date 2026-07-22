import { formatDate } from '@/utils/format-date';
import calculateReadTime from '@/utils/calculate-readtime';
import { BlogPost } from '@/types/blog';

interface BlogPostCardProps {
  post: BlogPost;
  pinned?: boolean;
}

export default function BlogPostCard({
  post,
  pinned = false,
}: BlogPostCardProps) {
  const dateFormatted = formatDate(
    post.show_updated ? (post.updated_at ?? post.created_at) : post.created_at,
    'short'
  );
  const readTime = calculateReadTime(post.content);

  return (
    <li className="relative border-t border-zinc-200 py-6 text-xl md:py-8 dark:border-zinc-800">
      {pinned && (
        <div className="bg-primary absolute top-0 -left-6 h-full w-1 md:-left-8"></div>
      )}

      <div className="text-xxs mb-1 flex leading-none uppercase md:hidden">
        {pinned && (
          <span className="text-xxs text-primary mb-1 pr-2 leading-none uppercase italic md:pr-0">
            Pinned
          </span>
        )}
        <time className="mr-2 text-zinc-500 after:pl-2 after:content-['•'] md:mr-0 md:after:pl-0 md:after:content-[''] dark:text-zinc-400">
          {dateFormatted}
        </time>
        <span className="text-zinc-400 dark:text-zinc-500">{readTime}</span>
      </div>

      <div className="flex w-full justify-between">
        <a className="group w-full" href={`/blog/${post.slug}`}>
          {pinned && (
            <span className="text-xxs text-primary mb-2 hidden leading-none uppercase md:block">
              Pinned
            </span>
          )}
          <h2 className="md:group-hover:text-primary relative pr-12 text-xl leading-tight font-medium transition-colors md:text-2xl">
            {post.title}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-zinc-500 md:text-base dark:text-zinc-400">
            {post.excerpt}
          </p>
        </a>

        <div className="text-xxs hidden min-w-fit flex-col items-end uppercase md:flex">
          <time className="text-zinc-500 dark:text-zinc-400">
            {dateFormatted}
          </time>
          <span className="text-zinc-400 dark:text-zinc-500">{readTime}</span>
        </div>
      </div>
    </li>
  );
}

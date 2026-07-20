import { formatDate } from '@/utils/format-date';
import calculateReadTime from '@/utils/calculate-readtime';
import { BlogPost } from '@/types/blog';

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogPostCard({
  post,
  featured = false,
}: BlogPostCardProps) {
  const dateFormatted = formatDate(
    post.show_updated ? post.updated_at ?? post.created_at : post.created_at,
    'short'
  );
  const readTime = calculateReadTime(post.content);

  return (
    <li className="relative border-t border-zinc-200 py-6 text-xl md:py-8 dark:border-zinc-800">
      {featured && (
        <div className="absolute -left-6 top-0 h-full w-1 bg-primary md:-left-8"></div>
      )}

      <div className="mb-1 flex text-xxs uppercase leading-none md:hidden">
        {featured && (
          <span className="mb-1 pr-2 text-xxs uppercase italic leading-none text-primary md:pr-0">
            Featured
          </span>
        )}
        <time className="mr-2 text-zinc-500 after:pl-2 after:content-['•'] md:mr-0 md:after:pl-0 md:after:content-[''] dark:text-zinc-400">
          {dateFormatted}
        </time>
        <span className="text-zinc-400 dark:text-zinc-500">{readTime}</span>
      </div>

      <div className="flex w-full justify-between">
        <a className="group w-full" href={`/blog/${post.slug}`}>
          {featured && (
            <span className="mb-2 hidden text-xxs uppercase leading-none text-primary md:block">
              Featured
            </span>
          )}
          <h2 className="relative pr-12 text-xl font-medium leading-tight transition-colors md:text-2xl md:group-hover:text-primary">
            {post.title}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-zinc-500 md:text-base dark:text-zinc-400">
            {post.excerpt}
          </p>
        </a>

        <div className="hidden min-w-fit flex-col items-end text-xxs uppercase md:flex">
          <time className="text-zinc-500 dark:text-zinc-400">
            {dateFormatted}
          </time>
          <span className="text-zinc-400 dark:text-zinc-500">{readTime}</span>
        </div>
      </div>
    </li>
  );
}

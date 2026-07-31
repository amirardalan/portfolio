import Link from 'next/link';
import { formatDate } from '@/utils/format-date';
import { BlogPost } from '@/types/blog';
import AdminPageHeading from '@/components/admin/AdminPageHeading';
import SearchInput from '@/components/admin/AdminSearch';
import Pagination from '@/components/ui/Pagination';
import IconShow from '@/components/icons/IconShow';
import IconEdit from '@/components/icons/IconEdit';

interface AdminPostListProps {
  title: string;
  posts: BlogPost[];
  searchPlaceholder: string;
  query: string;
  totalResults: number;
  currentPage: number;
  totalPages: number;
  isDrafts?: boolean;
}

export default function AdminPostList({
  title,
  posts,
  searchPlaceholder,
  query,
  totalResults,
  totalPages,
  isDrafts = false,
}: AdminPostListProps) {
  const noPostsExist = totalResults === 0 && (!query || query.trim() === '');
  const itemLabel = isDrafts ? 'draft' : 'published post';

  return (
    <div className="pb-10">
      <AdminPageHeading
        title={title}
        eyebrow={isDrafts ? 'Work in progress' : 'Live library'}
        description={
          isDrafts
            ? 'Pick up an unfinished idea, refine the details, and publish when it is ready.'
            : 'Review and maintain the writing currently available on your site.'
        }
        action={
          <Link
            href="/admin/blog/new"
            className="bg-dark text-light hover:bg-primary dark:bg-light dark:text-dark dark:hover:bg-primary text-xxs inline-flex min-h-11 items-center gap-3 rounded-sm px-5 font-mono tracking-[0.1em] uppercase transition-colors"
          >
            New post <span aria-hidden="true">+</span>
          </Link>
        }
      />
      <SearchInput
        name="query"
        placeholder={searchPlaceholder}
        defaultValue={query}
        totalResults={totalResults}
      />
      <div className="text-dark dark:text-light">
        {posts.length > 0 ? (
          <ul className="bg-light dark:bg-dark overflow-hidden border border-zinc-200 dark:border-zinc-800">
            {posts.map((post) => (
              <li
                key={post.id}
                className="group border-b border-zinc-200 last:border-b-0 dark:border-zinc-800"
              >
                <div className="flex flex-col gap-5 p-6 transition-colors group-hover:bg-zinc-50 md:flex-row md:items-center md:justify-between md:p-7 dark:group-hover:bg-zinc-900/70">
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-sm px-2.5 py-1 font-sans text-[0.65rem] tracking-[0.12em] uppercase ${
                          isDrafts
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        }`}
                      >
                        {isDrafts ? 'Draft' : 'Published'}
                      </span>
                      {post.featured && !isDrafts && (
                        <span className="bg-primary/10 text-primary rounded-sm px-2.5 py-1 font-sans text-[0.65rem] tracking-[0.12em] uppercase">
                          Pinned
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-editorial hover:text-primary text-xl leading-tight font-medium tracking-tight transition-colors md:text-2xl"
                    >
                      {post.title}
                    </Link>
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                      <time className="font-mono">
                        {formatDate(post.created_at)}
                      </time>
                      <span
                        aria-hidden="true"
                        className="text-zinc-300 dark:text-zinc-700"
                      >
                        /
                      </span>
                      <span>{post.category?.name || 'Uncategorized'}</span>
                      <span
                        aria-hidden="true"
                        className="text-zinc-300 dark:text-zinc-700"
                      >
                        /
                      </span>
                      <span>{post.user_name}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex size-10 items-center justify-center rounded-sm transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800"
                      aria-label={isDrafts ? 'Preview post' : 'View post'}
                      title={isDrafts ? 'Preview post' : 'View post'}
                    >
                      <IconShow className="group-hover:text-primary h-5 w-5 text-zinc-400 transition-colors duration-200 dark:text-zinc-600" />
                    </Link>
                    <Link
                      href={`/admin/blog/edit/${post.slug}`}
                      className="group flex size-10 items-center justify-center rounded-sm transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800"
                      aria-label="Edit post"
                      title="Edit post"
                    >
                      <IconEdit className="group-hover:text-primary h-5 w-5 text-zinc-400 transition-colors duration-200 dark:text-zinc-600" />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : noPostsExist ? (
          <div className="border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700">
            <p className="font-editorial text-2xl font-medium tracking-tight">
              No {itemLabel}s yet.
            </p>
            <Link
              href="/admin/blog/new"
              className="text-primary mt-5 inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] uppercase"
            >
              Write your first one →
            </Link>
          </div>
        ) : (
          <div className="border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700">
            <p className="font-editorial text-2xl font-medium tracking-tight">
              No {isDrafts ? 'drafts' : 'posts'} match “{query}”.
            </p>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
              Try a different title or clear the search.
            </p>
          </div>
        )}
      </div>

      <Pagination totalPages={totalPages} className="my-10" />
    </div>
  );
}

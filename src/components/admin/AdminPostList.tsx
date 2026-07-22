import Link from 'next/link';
import { formatDate } from '@/utils/format-date';
import { BlogPost } from '@/types/blog';
import AdminPageHeading from '@/components/admin/AdminPageHeading';
import SearchInput from '@/components/admin/AdminSearch';
import Pagination from '@/components/ui/Pagination';

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
            className="bg-dark text-light hover:bg-primary dark:bg-light dark:text-dark dark:hover:bg-primary inline-flex min-h-11 items-center gap-3 rounded-full px-5 text-xs tracking-[0.12em] uppercase transition-colors"
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
          <ul className="bg-light dark:bg-dark overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800">
            {posts.map((post) => (
              <li
                key={post.id}
                className="group border-b border-zinc-200 last:border-b-0 dark:border-zinc-800"
              >
                <div className="flex flex-col gap-5 p-6 transition-colors group-hover:bg-zinc-50 md:flex-row md:items-center md:justify-between md:p-7 dark:group-hover:bg-zinc-900/70">
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[0.65rem] tracking-[0.12em] uppercase ${
                          isDrafts
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        }`}
                      >
                        {isDrafts ? 'Draft' : 'Published'}
                      </span>
                      {post.featured && !isDrafts && (
                        <span className="bg-primary/10 text-primary rounded-full px-2.5 py-1 text-[0.65rem] tracking-[0.12em] uppercase">
                          Pinned
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/admin/blog/edit/${post.slug}`}
                      className="hover:text-primary text-xl leading-tight font-medium transition-colors md:text-2xl"
                    >
                      {post.title}
                    </Link>
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                      <time>{formatDate(post.created_at)}</time>
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
                  <div className="flex shrink-0 items-center gap-4 text-xs tracking-[0.12em] uppercase">
                    {!isDrafts && (
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-primary text-zinc-500 transition-colors dark:text-zinc-400"
                      >
                        View ↗
                      </Link>
                    )}
                    <Link
                      href={`/admin/blog/edit/${post.slug}`}
                      className="hover:border-primary hover:text-primary inline-flex min-h-10 items-center rounded-full border border-zinc-300 px-4 transition-colors dark:border-zinc-700"
                    >
                      Edit →
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : noPostsExist ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700">
            <p className="font-serif text-2xl italic">No {itemLabel}s yet.</p>
            <Link
              href="/admin/blog/new"
              className="text-primary mt-5 inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase"
            >
              Write your first one →
            </Link>
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700">
            <p className="font-serif text-2xl italic">
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

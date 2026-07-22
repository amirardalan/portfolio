'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import IconClose from '@/components/icons/IconClose';
import BlogPostCard from '@/components/blog/BlogPostCard';

import { BlogPost } from '@/types/blog';

interface ClientPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function ClientPagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: ClientPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={`flex justify-center space-x-2 ${className}`}>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={clsx(
            'rounded px-3 py-1 font-mono text-xs',
            currentPage === index + 1
              ? 'text-light dark:text-dark bg-zinc-400'
              : 'text-dark dark:text-light bg-zinc-200 dark:bg-zinc-700'
          )}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default function BlogPosts({ posts }: { posts: BlogPost[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const categoryFilter = searchParams?.get('category');
  const postsPerPage = 8;

  const pinnedPost = posts.find((post) => post.featured);
  const hasActiveFilters = Boolean(searchTerm || categoryFilter);
  const candidatePosts = hasActiveFilters
    ? posts
    : posts.filter((post) => post.id !== pinnedPost?.id);

  const filteredPosts = candidatePosts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? (post.category?.name ?? 'Uncategorized').toLowerCase() ===
        categoryFilter.toLowerCase()
      : true;
    return matchesSearch && matchesCategory;
  });

  const showPinnedPost = Boolean(
    pinnedPost && !hasActiveFilters && currentPage === 1
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleClearFilters = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const categories = Array.from(
    new Set(posts.map((post) => post.category?.name ?? 'Uncategorized'))
  );
  const allCategories = ['all', ...categories.sort()];

  return (
    <div>
      <div className="scrollbar-hide text-xxs text-dark dark:text-light mb-4 flex space-x-4 overflow-x-auto uppercase">
        {allCategories.map((category) => (
          <Link
            key={category}
            onClick={() => setCurrentPage(1)}
            href={
              category === 'all'
                ? '/blog'
                : `/blog?category=${encodeURIComponent(category)}`
            }
            className={clsx(
              categoryFilter === category ||
                (!categoryFilter && category === 'all')
                ? 'text-primary pb-0.5'
                : ''
            )}
          >
            #{category}
          </Link>
        ))}
      </div>
      <div className="relative">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-400"
        >
          <circle
            cx="8.5"
            cy="8.5"
            r="5.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="m12.5 12.5 4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          aria-label="Search writing"
          placeholder="Search writing"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="text-dark focus:border-primary focus:ring-primary dark:text-light w-full rounded-xl border border-zinc-200 bg-zinc-50/70 py-3 pr-4 pl-10 text-sm transition-colors outline-none placeholder:text-zinc-400 focus:ring-1 dark:border-zinc-800 dark:bg-zinc-900/70 dark:placeholder:text-zinc-500"
        />
      </div>
      {searchTerm && (
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-dark dark:text-light text-sm">
              {filteredPosts.length} result
              {filteredPosts.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleClearFilters}
              title="Clear search"
              className="flex items-center"
            >
              <IconClose size={20} color="var(--color-primary)" />
              <span className="text-dark dark:text-light pl-1 text-sm">
                Clear
              </span>
            </button>
          </div>
        </div>
      )}
      {paginatedPosts.length > 0 || showPinnedPost ? (
        <ul className="mt-6 mb-8 border-b border-zinc-200 dark:border-zinc-800">
          {showPinnedPost && pinnedPost && (
            <BlogPostCard post={pinnedPost} pinned={true} />
          )}
          {paginatedPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </ul>
      ) : (
        <p className="text-dark dark:text-light pt-6">
          No posts match that search.
        </p>
      )}
      <ClientPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        className="mb-10"
      />
    </div>
  );
}

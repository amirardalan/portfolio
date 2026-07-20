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
              ? 'bg-zinc-400 text-light dark:text-dark'
              : 'bg-zinc-200 text-dark dark:bg-zinc-700 dark:text-light'
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

  const featuredPost = posts.find((post) => post.featured);
  const regularPosts = posts.filter((post) => !post.featured);

  const filteredPosts = regularPosts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? (post.category?.name ?? 'Uncategorized').toLowerCase() ===
        categoryFilter.toLowerCase()
      : true;
    return matchesSearch && matchesCategory;
  });

  const showFeaturedPost =
    featuredPost &&
    (!searchTerm ||
      featuredPost.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!categoryFilter ||
      (featuredPost.category?.name ?? 'Uncategorized').toLowerCase() ===
        categoryFilter.toLowerCase());

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
      <div className="scrollbar-hide mb-4 flex space-x-4 overflow-x-auto text-xxs uppercase text-dark dark:text-light">
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
                ? 'pb-0.5 text-primary'
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
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
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
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50/70 py-3 pl-10 pr-4 text-sm text-dark outline-none transition-colors placeholder:text-zinc-400 focus:border-primary focus:ring-1 focus:ring-primary dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-light dark:placeholder:text-zinc-500"
        />
      </div>
      {searchTerm && (
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-sm text-dark dark:text-light">
              {filteredPosts.length + (showFeaturedPost ? 1 : 0)} result
              {filteredPosts.length + (showFeaturedPost ? 1 : 0) !== 1
                ? 's'
                : ''}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleClearFilters}
              title="Clear search"
              className="flex items-center"
            >
              <IconClose size={20} color="var(--color-primary)" />
              <span className="pl-1 text-sm text-dark dark:text-light">
                Clear
              </span>
            </button>
          </div>
        </div>
      )}
      {paginatedPosts.length > 0 || showFeaturedPost ? (
        <ul className="mb-8 mt-6 border-b border-zinc-200 dark:border-zinc-800">
          {showFeaturedPost && (
            <BlogPostCard post={featuredPost} featured={true} />
          )}
          {paginatedPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </ul>
      ) : (
        <p className="pt-6 text-dark dark:text-light">
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

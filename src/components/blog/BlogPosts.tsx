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
      <div className="scrollbar-hide mb-3 flex space-x-4 overflow-x-auto text-xxs uppercase text-dark dark:text-light">
        {allCategories.map((category) => (
          <Link
            key={category}
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
      <input
        type="text"
        placeholder="Search writing"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-2 w-full rounded-lg border border-zinc-300 bg-zinc-100 p-2 text-dark outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-light"
      />
      <div className="mb-4 flex items-center justify-between">
        <div>
          {searchTerm && (
            <p className="text-sm text-dark dark:text-light">
              {filteredPosts.length + (showFeaturedPost ? 1 : 0)} result
              {filteredPosts.length + (showFeaturedPost ? 1 : 0) !== 1
                ? 's'
                : ''}
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          {searchTerm && (
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
          )}
        </div>
      </div>
      {paginatedPosts.length > 0 || showFeaturedPost ? (
        <ul
          className={clsx('pb-6 pt-4 last-of-type:mb-8', searchTerm && 'pt-2')}
        >
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

'use client';

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import BlogPostCard from '@/components/blog/BlogPostCard';
import ActionArrow from '@/components/ui/ActionArrow';
import SectionGlyph from '@/components/ui/SectionGlyph';

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
    <nav
      aria-label="Writing pagination"
      className={`flex items-center justify-between ${className}`}
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="group inline-flex min-h-11 items-center gap-3 font-mono text-xxs font-medium tracking-[0.12em] uppercase disabled:cursor-default disabled:opacity-30"
      >
        <ActionArrow direction="left" />
        <span>Previous</span>
      </button>

      <span className="text-xxs font-mono text-zinc-500 tabular-nums dark:text-zinc-400">
        {String(currentPage).padStart(2, '0')} /{' '}
        {String(totalPages).padStart(2, '0')}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="group inline-flex min-h-11 items-center gap-3 font-mono text-xxs font-medium tracking-[0.12em] uppercase disabled:cursor-default disabled:opacity-30"
      >
        <span>Next</span>
        <ActionArrow direction="right" />
      </button>
    </nav>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="pointer-events-none h-4 w-4 shrink-0 text-current opacity-60"
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
  );
}

function getSearchScore(post: BlogPost, query: string) {
  const terms = query.split(/\s+/).filter(Boolean);
  const title = post.title.toLowerCase();
  const category = (post.category?.name ?? 'Uncategorized').toLowerCase();
  const excerpt = (post.excerpt ?? '').toLowerCase();
  const content = post.content.toLowerCase();
  const searchableText = `${title} ${category} ${excerpt} ${content}`;

  if (!terms.every((term) => searchableText.includes(term))) {
    return Number.POSITIVE_INFINITY;
  }

  return terms.reduce((score, term) => {
    if (title.startsWith(term)) return score;
    if (title.includes(term)) return score + 1;
    if (category.includes(term)) return score + 2;
    if (excerpt.includes(term)) return score + 3;
    return score + 4;
  }, 0);
}

export default function BlogPosts({ posts }: { posts: BlogPost[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [activeSearchIndex, setActiveSearchIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const searchDialogRef = useRef<HTMLDivElement>(null);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileCategoryMenuRef = useRef<HTMLDivElement>(null);
  const mobileCategoryTriggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFilter = searchParams?.get('category');
  const normalizedCategoryFilter = categoryFilter?.toLowerCase();
  const postsPerPage = 8;

  const pinnedPost = posts.find((post) => post.featured);
  const hasActiveFilters = Boolean(categoryFilter);
  const candidatePosts = hasActiveFilters
    ? posts
    : posts.filter((post) => post.id !== pinnedPost?.id);

  const filteredPosts = candidatePosts.filter((post) => {
    const matchesCategory = normalizedCategoryFilter
      ? (post.category?.name ?? 'Uncategorized').toLowerCase() ===
        normalizedCategoryFilter
      : true;
    return matchesCategory;
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
    setCurrentPage(1);
    router.replace('/blog', { scroll: false });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const categories = Array.from(
    new Set(posts.map((post) => post.category?.name ?? 'Uncategorized'))
  ).sort();
  const allCategories = ['All', ...categories];
  const activeCategory =
    allCategories.find(
      (category) => category.toLowerCase() === normalizedCategoryFilter
    ) ?? 'All';
  const archiveResultCount = hasActiveFilters
    ? filteredPosts.length
    : posts.length;
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const searchResults = normalizedSearchTerm
    ? posts
        .map((post) => ({
          post,
          score: getSearchScore(post, normalizedSearchTerm),
        }))
        .filter(({ score }) => Number.isFinite(score))
        .sort((a, b) => a.score - b.score)
        .slice(0, 8)
        .map(({ post }) => post)
    : [];

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm('');
    setActiveSearchIndex(0);
    window.requestAnimationFrame(() =>
      searchTriggerRef.current?.focus({
        preventScroll: true,
        focusVisible: false,
      })
    );
  };

  const handleSearchKeyDown = (
    event: ReactKeyboardEvent<HTMLInputElement>
  ) => {
    if (searchResults.length === 0) return;

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      const nextIndex =
        (activeSearchIndex + direction + searchResults.length) %
        searchResults.length;

      setActiveSearchIndex(nextIndex);
      window.requestAnimationFrame(() => {
        document
          .getElementById(`writing-search-result-${nextIndex}`)
          ?.scrollIntoView({ block: 'nearest' });
      });
    }

    if (event.key === 'Enter') {
      const selectedPost = searchResults[activeSearchIndex];
      if (!selectedPost) return;

      event.preventDefault();
      router.push(`/blog/${selectedPost.slug}`);
      closeSearch();
    }
  };

  useEffect(() => {
    if (!isSearchOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchTerm('');
        setActiveSearchIndex(0);
        window.requestAnimationFrame(() =>
          searchTriggerRef.current?.focus({
            preventScroll: true,
            focusVisible: false,
          })
        );
      }

      if (event.key === 'Tab') {
        const focusableElements =
          searchDialogRef.current?.querySelectorAll<HTMLElement>(
            'button, a[href], input'
          );

        if (!focusableElements?.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isCategoryMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        mobileCategoryMenuRef.current &&
        !mobileCategoryMenuRef.current.contains(event.target as Node)
      ) {
        setIsCategoryMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      setIsCategoryMenuOpen(false);
      window.requestAnimationFrame(() =>
        mobileCategoryTriggerRef.current?.focus({
          preventScroll: true,
          focusVisible: false,
        })
      );
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCategoryMenuOpen]);

  return (
    <section aria-label="Writing archive">
      {isSearchOpen && (
        <div
          id="writing-search-dialog"
          ref={searchDialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="writing-search-title"
          className="bg-light text-dark fixed inset-0 z-100 dark:bg-dark dark:text-light"
        >
          <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col px-6 py-6 md:px-10 md:py-10 lg:px-16">
            <div className="flex items-center justify-between">
              <p
                id="writing-search-title"
                className="text-primary text-xxs flex items-center gap-2.5 font-sans tracking-[0.22em] uppercase"
              >
                <SectionGlyph /> Search / Writing
              </p>
              <button
                type="button"
                onClick={closeSearch}
                className="inline-flex min-h-11 cursor-pointer items-center gap-3 font-mono text-xxs tracking-[0.12em] uppercase"
              >
                <span>Close</span>
                <span aria-hidden="true" className="text-base leading-none">
                  ×
                </span>
              </button>
            </div>

            <div className="mt-10 flex items-center gap-5 md:mt-16">
              <SearchIcon />
              <label htmlFor="writing-search-overlay" className="sr-only">
                Search writing
              </label>
              <input
                id="writing-search-overlay"
                type="search"
                autoFocus
                autoComplete="off"
                placeholder="Type to search…"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setActiveSearchIndex(0);
                }}
                onKeyDown={handleSearchKeyDown}
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={searchResults.length > 0}
                aria-controls="writing-search-results"
                aria-activedescendant={
                  searchResults.length > 0
                    ? `writing-search-result-${activeSearchIndex}`
                    : undefined
                }
                className="writing-search font-editorial caret-primary w-full bg-transparent text-4xl leading-none font-medium tracking-tight placeholder:text-zinc-300 sm:text-5xl md:text-6xl dark:placeholder:text-zinc-700"
              />
            </div>

            <div className="mt-10 min-h-0 flex-1 overflow-y-auto md:mt-14">
              {!normalizedSearchTerm ? (
                <p className="font-editorial text-base text-zinc-500 md:text-lg dark:text-zinc-400">
                  Search titles, topics, excerpts, and article text.
                </p>
              ) : searchResults.length > 0 ? (
                <>
                  <p
                    className="text-xxs font-sans tracking-[0.16em] text-zinc-500 uppercase dark:text-zinc-400"
                    aria-live="polite"
                  >
                    <span className="font-mono tabular-nums">
                      {String(searchResults.length).padStart(2, '0')} /
                    </span>{' '}
                    {searchResults.length === 1 ? 'Result' : 'Results'}
                  </p>
                  <ul
                    id="writing-search-results"
                    role="listbox"
                    className="mt-6 space-y-1"
                  >
                    {searchResults.map((post, index) => (
                      <li key={post.id} role="presentation">
                        <Link
                          id={`writing-search-result-${index}`}
                          role="option"
                          aria-selected={index === activeSearchIndex}
                          href={`/blog/${post.slug}`}
                          onClick={closeSearch}
                          onMouseEnter={() => setActiveSearchIndex(index)}
                          className="group grid gap-y-3 py-4 md:grid-cols-12 md:gap-x-8 lg:gap-x-12"
                        >
                          <span className="text-xxs font-mono text-zinc-400 tabular-nums md:col-span-1 dark:text-zinc-600">
                            {String(index + 1).padStart(2, '0')} /
                          </span>
                          <div className="md:col-span-8">
                            <h2
                              className={clsx(
                                'font-editorial text-2xl leading-tight font-medium tracking-tight transition-colors group-hover:text-primary md:text-3xl',
                                index === activeSearchIndex && 'text-primary'
                              )}
                            >
                              {post.title}
                            </h2>
                            {post.excerpt && (
                              <p className="font-editorial mt-2 max-w-3xl text-sm leading-relaxed text-zinc-500 md:text-base dark:text-zinc-400">
                                {post.excerpt}
                              </p>
                            )}
                          </div>
                          <span className="text-xxs flex items-center justify-end gap-3 self-start font-sans tracking-[0.16em] text-zinc-500 uppercase md:col-span-3 dark:text-zinc-400">
                            {post.category?.name ?? 'Uncategorized'}
                            <ActionArrow direction="right" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p
                  className="font-editorial text-2xl font-medium tracking-tight md:text-3xl"
                  aria-live="polite"
                >
                  No writing matches “{searchTerm.trim()}.”
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1440px] px-6 pb-14 md:px-10 md:pb-20 lg:px-16 lg:pb-24">
        <div className="flex items-center justify-between gap-4 border-y border-zinc-200 md:grid md:grid-cols-12 md:gap-x-8 lg:gap-x-12 dark:border-zinc-800">
          <button
            ref={searchTriggerRef}
            type="button"
            onClick={() => {
              setIsCategoryMenuOpen(false);
              setIsSearchOpen(true);
            }}
            aria-haspopup="dialog"
            aria-expanded={isSearchOpen}
            aria-controls="writing-search-dialog"
            className="writing-search-trigger inline-flex min-h-16 shrink-0 cursor-pointer items-center gap-3 justify-self-start font-mono text-xxs font-medium tracking-[0.12em] text-zinc-500 uppercase transition-colors hover:text-primary md:col-span-4 dark:text-zinc-400"
          >
            <SearchIcon />
            <span>Search writing</span>
          </button>

          <div
            ref={mobileCategoryMenuRef}
            className="relative min-w-0 md:hidden"
          >
            <button
              ref={mobileCategoryTriggerRef}
              type="button"
              aria-haspopup="true"
              aria-expanded={isCategoryMenuOpen}
              aria-controls="mobile-writing-categories"
              onClick={() => setIsCategoryMenuOpen((isOpen) => !isOpen)}
              className="text-primary inline-flex min-h-16 w-28 cursor-pointer items-center justify-end gap-2 font-mono text-xxs font-medium tracking-[0.12em] uppercase"
            >
              <span className="truncate">{activeCategory}</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 12 12"
                fill="none"
                className={clsx(
                  'size-3 shrink-0 transition-transform',
                  isCategoryMenuOpen && 'rotate-180'
                )}
              >
                <path
                  d="m3 4.5 3 3 3-3"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {isCategoryMenuOpen && (
              <nav
                id="mobile-writing-categories"
                aria-label="Filter writing by topic"
                className="bg-light absolute top-full right-0 z-20 max-h-72 w-52 overflow-y-auto border border-zinc-200 py-2 dark:border-zinc-800 dark:bg-dark"
              >
                {allCategories.map((category) => {
                  const isActive =
                    category.toLowerCase() === activeCategory.toLowerCase();

                  return (
                    <Link
                      key={category}
                      href={
                        category === 'All'
                          ? '/blog'
                          : `/blog?category=${encodeURIComponent(category)}`
                      }
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => {
                        setCurrentPage(1);
                        setIsCategoryMenuOpen(false);
                      }}
                      className={clsx(
                        'flex min-h-11 items-center justify-between gap-4 px-4 font-mono text-xxs font-medium tracking-[0.12em] uppercase transition-colors',
                        isActive
                          ? 'text-primary'
                          : 'text-zinc-500 hover:text-dark dark:text-zinc-400 dark:hover:text-light'
                      )}
                    >
                      <span>{category}</span>
                      <span
                        aria-hidden="true"
                        className={clsx(
                          'size-1.5 shrink-0 bg-current',
                          !isActive && 'opacity-0'
                        )}
                      />
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

          <div className="hidden min-h-16 min-w-0 items-center justify-end gap-6 overflow-hidden md:col-span-8 md:flex">
            <span className="text-xxs shrink-0 font-sans tracking-[0.16em] text-zinc-500 uppercase dark:text-zinc-400">
              Filter /
            </span>
            <nav
              aria-label="Filter writing by topic"
              className="scrollbar-hide flex min-w-0 gap-x-6 overflow-x-auto md:gap-x-7"
            >
              {allCategories.map((category) => {
                const isActive =
                  category === 'All'
                    ? !categoryFilter
                    : normalizedCategoryFilter === category.toLowerCase();

                return (
                  <Link
                    key={category}
                    onClick={() => setCurrentPage(1)}
                    href={
                      category === 'All'
                        ? '/blog'
                        : `/blog?category=${encodeURIComponent(category)}`
                    }
                    aria-current={isActive ? 'page' : undefined}
                    className={clsx(
                      'inline-flex min-h-11 shrink-0 items-center font-mono text-xxs font-medium tracking-[0.12em] uppercase transition-colors',
                      isActive
                        ? 'text-primary'
                        : 'text-zinc-500 hover:text-dark dark:text-zinc-400 dark:hover:text-light'
                    )}
                  >
                    {category}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-5 flex items-center justify-between gap-6">
            <p
              className="text-xxs font-sans tracking-[0.16em] whitespace-nowrap text-zinc-500 uppercase dark:text-zinc-400"
              aria-live="polite"
            >
              <span className="font-mono tabular-nums">
                {String(archiveResultCount).padStart(2, '0')} /
              </span>{' '}
              Entries
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-primary inline-flex min-h-11 cursor-pointer items-center gap-3 text-left font-mono text-xxs font-medium tracking-[0.12em] whitespace-nowrap uppercase"
            >
              <span>Clear</span>
              <span
                aria-hidden="true"
                className="inline-block text-base leading-none font-normal"
              >
                ×
              </span>
            </button>
          </div>
        )}

        {paginatedPosts.length > 0 || showPinnedPost ? (
          <ul className="mt-6">
            {showPinnedPost && pinnedPost && (
              <BlogPostCard post={pinnedPost} pinned index="00" />
            )}
            {paginatedPosts.map((post, index) => (
              <BlogPostCard
                key={post.id}
                post={post}
                index={String(
                  (currentPage - 1) * postsPerPage + index + 1
                ).padStart(2, '0')}
              />
            ))}
          </ul>
        ) : (
          <div className="py-14 md:py-20">
            <p className="font-editorial text-3xl leading-tight font-medium tracking-tight md:text-4xl">
              {posts.length === 0
                ? 'Nothing published yet.'
                : 'No entries match those filters.'}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="group text-primary mt-6 inline-flex min-h-11 items-center gap-3 font-mono text-xxs font-medium tracking-[0.12em] uppercase"
              >
                <span>Reset the archive</span>
                <ActionArrow direction="right" />
              </button>
            )}
          </div>
        )}

        <ClientPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-10"
        />
      </div>
    </section>
  );
}

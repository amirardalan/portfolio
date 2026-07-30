'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import IconClose from '@/components/icons/IconClose';

interface AdminSearchProps {
  name: string;
  placeholder: string;
  defaultValue?: string;
  totalResults: number;
}

export default function AdminSearch({
  name,
  placeholder,
  defaultValue = '',
  totalResults,
}: AdminSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);

  const updateSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const normalizedValue = value.trim();

      if (normalizedValue) {
        params.set(name, normalizedValue);
      } else {
        params.delete(name);
      }
      params.delete('page');

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [name, pathname, router, searchParams]
  );

  useEffect(() => {
    if (searchTerm.trim() === defaultValue.trim()) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timeout = window.setTimeout(() => updateSearch(searchTerm), 300);

    return () => window.clearTimeout(timeout);
  }, [defaultValue, searchTerm, updateSearch]);

  useEffect(() => {
    setIsLoading(false);
  }, [defaultValue, totalResults]);

  const searchExecuted = Boolean(searchTerm.trim());

  return (
    <form
      className="mb-6"
      onSubmit={(e) => {
        e.preventDefault();
        setIsLoading(true);
        updateSearch(searchTerm);
      }}
    >
      <div className="relative">
        <span
          className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-zinc-400"
          aria-hidden="true"
        >
          ⌕
        </span>
        <input
          type="search"
          name={name}
          aria-label={placeholder}
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-search cms-editor-field font-editorial text-dark focus:border-primary focus:bg-light dark:text-light dark:focus:bg-dark h-14 w-full rounded-sm border border-zinc-200 bg-zinc-100/70 pr-5 pl-12 text-sm transition-colors outline-none placeholder:text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/70 dark:placeholder:text-zinc-600"
        />
      </div>
      {searchExecuted && (
        <div className="mt-3 flex items-center justify-between px-1">
          <p
            className="font-mono text-xs text-zinc-500 dark:text-zinc-400"
            aria-live="polite"
          >
            {isLoading
              ? 'Loading...'
              : `${totalResults} result${totalResults !== 1 ? 's' : ''}`}
          </p>
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            title="Clear Search"
            className="hover:text-primary flex items-center font-mono text-zinc-500 transition-colors dark:text-zinc-400"
          >
            <IconClose size={2} />
            <span className="pl-1 text-xs tracking-[0.1em] uppercase">
              Clear Search
            </span>
          </button>
        </div>
      )}
    </form>
  );
}

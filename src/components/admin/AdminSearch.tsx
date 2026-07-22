'use client';

import { useState, useRef } from 'react';
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
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const [searchExecuted, setSearchExecuted] = useState(!!defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSearchExecuted(false);
    setTimeout(() => {
      formRef.current?.submit();
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    const hasSearchTerm = Boolean(searchTerm.trim());

    if (!hasSearchTerm && !defaultValue) {
      e.preventDefault();
      setSearchExecuted(false);
      return;
    }

    setIsLoading(true);
    setSearchExecuted(hasSearchTerm);
  };

  return (
    <form
      method="get"
      className="mb-6"
      onSubmit={(e) => {
        setSearchTerm(searchTerm);
        handleSubmit(e);
        setTimeout(() => setIsLoading(false), 500);
      }}
      ref={formRef}
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
          className="text-dark focus:border-primary focus:bg-light dark:text-light dark:focus:bg-dark h-14 w-full rounded-2xl border border-zinc-200 bg-zinc-100/70 pr-5 pl-12 text-sm transition-colors outline-none placeholder:text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/70 dark:placeholder:text-zinc-600"
        />
      </div>
      {searchExecuted && (
        <div className="mt-3 flex items-center justify-between px-1">
          <p
            className="text-xs text-zinc-500 dark:text-zinc-400"
            aria-live="polite"
          >
            {isLoading
              ? 'Loading...'
              : `${totalResults} result${totalResults !== 1 ? 's' : ''}`}
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            title="Clear Search"
            className="hover:text-primary flex items-center text-zinc-500 transition-colors dark:text-zinc-400"
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

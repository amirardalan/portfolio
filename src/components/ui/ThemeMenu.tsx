'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/store/theme';
import { Theme } from '@/types/theme';

export default function ThemeMenu() {
  const router = useRouter();
  const { theme, effectiveTheme, setTheme, initializeTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const menuRef = useRef<HTMLDivElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);
  const shouldManageFocusRef = useRef(false);

  const updateMenuPosition = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    const viewportPadding = 8;
    const buttonRect = button.getBoundingClientRect();
    const menuWidth = window.innerWidth < 768 ? 208 : 184;

    setMenuPosition({
      top: buttonRect.bottom + 8,
      left: Math.max(
        viewportPadding,
        Math.min(
          buttonRect.right - menuWidth,
          window.innerWidth - menuWidth - viewportPadding
        )
      ),
      width: menuWidth,
    });
  }, []);

  // Initialize theme
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  // Handle system theme changes
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        // Re-initialize theme when system preference changes
        initializeTheme();
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme, initializeTheme]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !menuPanelRef.current?.contains(target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    updateMenuPosition();
    window.addEventListener('resize', updateMenuPosition);
    return () => window.removeEventListener('resize', updateMenuPosition);
  }, [menuOpen, updateMenuPosition]);

  // Focus management for keyboard navigation
  useEffect(() => {
    if (menuOpen && shouldManageFocusRef.current && firstItemRef.current) {
      firstItemRef.current.focus();
    }
  }, [menuOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setMenuOpen(false);
      buttonRef.current?.focus();
      return;
    }

    if (!menuOpen || !menuPanelRef.current) return;

    const items = Array.from(
      menuPanelRef.current.querySelectorAll<HTMLButtonElement>(
        '[role="menuitemradio"]'
      )
    );
    const currentIndex = items.indexOf(
      document.activeElement as HTMLButtonElement
    );

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const direction = e.key === 'ArrowDown' ? 1 : -1;
      const nextIndex =
        currentIndex < 0
          ? 0
          : (currentIndex + direction + items.length) % items.length;
      items[nextIndex]?.focus();
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      items[e.key === 'Home' ? 0 : items.length - 1]?.focus();
    }
  };

  const handleThemeChange = (newTheme: Theme, returnFocus: boolean) => {
    setTheme(newTheme);
    setMenuOpen(false);
    if (returnFocus) {
      buttonRef.current?.focus();
    } else {
      buttonRef.current?.blur();
    }
    router.refresh();
  };

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    shouldManageFocusRef.current = event.detail === 0;
    if (!menuOpen) updateMenuPosition();
    setMenuOpen((isOpen) => !isOpen);
    buttonRef.current?.blur();
  };

  const effectiveThemeLabel = effectiveTheme === 'dark' ? 'Dark' : 'Light';
  const accessibleThemeLabel =
    theme === 'system'
      ? `Automatic, currently ${effectiveThemeLabel}`
      : effectiveThemeLabel;

  const themeOptions: Array<{
    value: Theme;
    label: string;
    description?: string;
  }> = [
    {
      value: 'system',
      label: 'Automatic',
      description: `Device setting · ${effectiveThemeLabel}`,
    },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ];

  return (
    <div className="relative" ref={menuRef} onKeyDown={handleKeyDown}>
      <button
        id="theme-menu-button"
        className="group hover:text-dark focus-visible:outline-primary dark:hover:text-light inline-flex size-10 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-black/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 md:h-9 md:w-auto md:gap-2 md:px-2 dark:text-zinc-400 dark:hover:bg-white/[0.06]"
        onClick={toggleMenu}
        ref={buttonRef}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-label={`Color theme: ${accessibleThemeLabel}`}
      >
        <svg
          className="size-[18px]"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          {effectiveTheme === 'dark' ? (
            <path
              d="M16.4 12.2A6.7 6.7 0 0 1 7.8 3.6 6.7 6.7 0 1 0 16.4 12.2Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <>
              <circle
                cx="10"
                cy="10"
                r="3.25"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M10 1.75v1.5M10 16.75v1.5M18.25 10h-1.5M3.25 10h-1.5M15.83 4.17l-1.06 1.06M5.23 14.77l-1.06 1.06M15.83 15.83l-1.06-1.06M5.23 5.23 4.17 4.17"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </>
          )}
        </svg>
        <span className="text-xxs hidden tracking-[0.08em] uppercase md:inline">
          {effectiveThemeLabel}
        </span>
        <svg
          className={`hidden size-3 transition-transform md:block ${menuOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m2.5 4.5 3.5 3 3.5-3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {menuOpen &&
        createPortal(
          <div
            ref={menuPanelRef}
            className="dark:text-light fixed z-[100] overflow-clip rounded-lg bg-white/60 p-1 font-mono ring-1 ring-black/[0.06] backdrop-blur-2xl ring-inset dark:bg-zinc-950/50 dark:ring-white/[0.08]"
            style={menuPosition}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="theme-menu-button"
          >
            {themeOptions.map((option, index) => (
              <button
                key={option.value}
                ref={index === 0 ? firstItemRef : null}
                className={`hover:text-dark dark:hover:text-light flex min-h-10 w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-black/5 dark:hover:bg-white/[0.07] ${theme === option.value ? 'text-primary dark:text-primary bg-black/[0.035] dark:bg-white/[0.05]' : 'text-zinc-600 dark:text-zinc-300'}`}
                onClick={(event) =>
                  handleThemeChange(option.value, event.detail === 0)
                }
                role="menuitemradio"
                aria-checked={theme === option.value}
              >
                <span className="flex flex-col gap-0.5">
                  <span className="text-xxs tracking-[0.08em] uppercase">
                    {option.label}
                  </span>
                  {option.description && (
                    <span className="font-sans text-[10px] tracking-normal text-zinc-500 uppercase dark:text-zinc-400">
                      {option.description}
                    </span>
                  )}
                </span>
                {theme === option.value && (
                  <span
                    className="size-1.5 shrink-0 rounded-full bg-current"
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}

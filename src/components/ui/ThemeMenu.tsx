'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/store/theme';
import { Theme } from '@/types/theme';
import IconMoon from '@/components/icons/IconMoon';
import IconSun from '@/components/icons/IconSun';
import Tooltip from '@/components/ui/Tooltip';

export default function ThemeMenu() {
  const router = useRouter();
  const { theme, effectiveTheme, setTheme, initializeTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);
  const shouldManageFocusRef = useRef(false);

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
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

    if (!menuOpen || !menuRef.current) return;

    const items = Array.from(
      menuRef.current.querySelectorAll<HTMLButtonElement>(
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

  const closeTooltip = () => {
    buttonRef.current?.blur();
  };

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    shouldManageFocusRef.current = event.detail === 0;
    setMenuOpen((isOpen) => !isOpen);
    buttonRef.current?.blur();
  };

  const themeLabel = effectiveTheme === 'dark' ? 'Dark mode' : 'Light mode';

  return (
    <div className="relative" ref={menuRef} onKeyDown={handleKeyDown}>
      <Tooltip pos="b" text="Change theme" onClose={closeTooltip}>
        <button
          id="theme-menu-button"
          className="inline-flex size-10 items-center justify-center rounded-full text-dark transition-colors hover:bg-zinc-200/70 dark:text-light dark:hover:bg-zinc-800/80"
          onClick={toggleMenu}
          ref={buttonRef}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-label={`Theme toggle, current theme: ${themeLabel}`}
        >
          {effectiveTheme === 'dark' ? <IconMoon /> : <IconSun />}
        </button>
      </Tooltip>
      {menuOpen && (
        <div
          className="bg-light/95 absolute right-0 top-full z-40 mt-2 w-36 overflow-hidden rounded-xl border border-zinc-200/80 p-1 shadow-xl backdrop-blur-xl dark:border-zinc-700/80 dark:bg-zinc-900/95 dark:text-light"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="theme-menu-button"
        >
          {(['system', 'light', 'dark'] as Theme[]).map((t, index) => (
            <button
              key={t}
              ref={index === 0 ? firstItemRef : null}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs capitalize transition-colors hover:bg-zinc-100 dark:text-light dark:hover:bg-zinc-800 ${theme === t ? 'bg-zinc-100 text-primary dark:bg-zinc-800 dark:text-primary' : ''}`}
              onClick={(event) => handleThemeChange(t, event.detail === 0)}
              role="menuitemradio"
              aria-checked={theme === t}
            >
              <span>{t}</span>
              {theme === t && <span aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

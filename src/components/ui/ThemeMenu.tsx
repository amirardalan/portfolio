'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/store/theme';
import { Theme } from '@/types/theme';
import Tooltip from '@/components/ui/Tooltip';

export default function ThemeMenu() {
  const router = useRouter();
  const { theme, setTheme, initializeTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);
  const shouldManageFocusRef = useRef(false);

  const updateMenuPosition = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    const menuWidth = 144;
    const viewportPadding = 8;
    const buttonRect = button.getBoundingClientRect();

    setMenuPosition({
      top: buttonRect.bottom + 8,
      left: Math.min(
        Math.max(viewportPadding, buttonRect.right - menuWidth),
        window.innerWidth - menuWidth - viewportPadding
      ),
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

  const closeTooltip = () => {
    buttonRef.current?.blur();
  };

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    shouldManageFocusRef.current = event.detail === 0;
    if (!menuOpen) updateMenuPosition();
    setMenuOpen((isOpen) => !isOpen);
    buttonRef.current?.blur();
  };

  const themeLabel = `${theme.charAt(0).toUpperCase()}${theme.slice(1)}`;

  return (
    <div className="relative" ref={menuRef} onKeyDown={handleKeyDown}>
      <Tooltip pos="b" text="Change theme" onClose={closeTooltip}>
        <button
          id="theme-menu-button"
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/40 px-3 py-2 text-xs text-dark transition-colors hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:text-light dark:hover:bg-white/10"
          onClick={toggleMenu}
          ref={buttonRef}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-label={`Theme, current selection: ${themeLabel}`}
        >
          <span className="hidden md:inline">Theme:</span>
          <span>{themeLabel}</span>
          <svg
            className={`size-3 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
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
      </Tooltip>
      {menuOpen &&
        createPortal(
          <div
            ref={menuPanelRef}
            className="fixed z-[100] w-36 overflow-clip rounded-xl border border-zinc-200/80 bg-light p-1 shadow-xl dark:border-zinc-700/80 dark:bg-zinc-900 dark:text-light"
            style={menuPosition}
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
          </div>,
          document.body
        )}
    </div>
  );
}

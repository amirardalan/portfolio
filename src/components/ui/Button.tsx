import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  url?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  color?: string;
  size?: 'default' | 'large';
}

export default function Button({
  text,
  onClick,
  url,
  type = 'button',
  disabled = false,
  variant = 'primary',
  color,
  size = 'default',
}: ButtonProps) {
  const buttonClasses = clsx(
    // Base
    'inline-flex items-center justify-center rounded-sm text-center font-mono leading-none font-medium uppercase tracking-[0.1em] transition-[background-color,border-color,color,opacity] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
    // Size-specific
    size === 'default' ? 'min-h-9 text-xxs' : 'min-w-30 text-lg',
    // Spacing
    {
      'px-4 py-2': size === 'default',
      'px-6 py-3': size === 'large',
    },
    {
      // Custom color
      [`bg-${color} text-light`]: !!color,
      // Variant-specific colors
      'bg-red-600 text-light hover:bg-red-700': variant === 'danger' && !color,
      'border border-zinc-300 bg-transparent text-dark hover:border-primary hover:text-primary dark:border-zinc-700 dark:text-light':
        variant === 'secondary' && !color,
      'bg-dark text-light hover:bg-primary dark:bg-light dark:text-dark dark:hover:bg-primary':
        variant === 'primary' && !color,
    }
  );

  if (url) {
    return (
      <Link href={url} className={buttonClasses}>
        {text}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {text}
    </button>
  );
}

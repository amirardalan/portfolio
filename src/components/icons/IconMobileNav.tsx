import IconClose from '@/components/icons/IconClose';
import type { MouseEventHandler, Ref } from 'react';

type IconMobileNavProps = {
  isOpen?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  buttonRef?: Ref<HTMLButtonElement>;
  controls?: string;
};

export default function IconMobileNav({
  isOpen = false,
  onClick,
  className = '',
  buttonRef,
  controls,
}: IconMobileNavProps) {
  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`fixed right-6 top-3 z-50 flex items-center py-2 text-dark md:top-1.5 md:hidden dark:text-light ${className}`}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls={controls}
    >
      {!isOpen ? (
        <svg
          width={33}
          height={33}
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path
            d="m11 16.745c0-.414.336-.75.75-.75h9.5c.414 0 .75.336.75.75s-.336.75-.75.75h-9.5c-.414 0-.75-.336-.75-.75zm-9-5c0-.414.336-.75.75-.75h18.5c.414 0 .75.336.75.75s-.336.75-.75.75h-18.5c-.414 0-.75-.336-.75-.75zm4-5c0-.414.336-.75.75-.75h14.5c.414 0 .75.336.75.75s-.336.75-.75.75h-14.5c-.414 0-.75-.336-.75-.75z"
            fillRule="nonzero"
            fill="currentColor"
          />
        </svg>
      ) : (
        <IconClose size={30} />
      )}
    </button>
  );
}

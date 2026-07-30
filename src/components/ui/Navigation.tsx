'use client';

import { useActiveLink } from '@/hooks/useActiveLink';
import Link from 'next/link';
import clsx from 'clsx';

interface NavigationProps {
  header?: boolean;
}
type NavVariant = 'header' | 'footer' | 'mobile';

export default function Navigation({ header = false }: NavigationProps) {
  return (
    <nav className="hidden font-medium text-light sm:flex sm:items-center">
      <div className={clsx('flex flex-row items-center')}>
        <NavLinks variant={header ? 'header' : 'footer'} />
      </div>
    </nav>
  );
}

const getNavLinkStyles = (
  variant: NavVariant,
  isActive: boolean,
  isLast?: boolean
) => {
  const variantStyles = {
    header: clsx({
      'mr-8 inline-flex min-h-10 items-center gap-2 font-mono text-xxs font-medium tracking-[0.12em] uppercase transition-colors':
        true,
      'text-dark hover:text-primary dark:text-light dark:hover:text-primary':
        !isActive,
      'text-primary': isActive,
    }),
    footer: clsx({
      'mr-6': !isLast,
      'text-dark dark:text-light': !isActive,
      'pb-1 border-b-2 border-dark text-dark dark:border-light dark:text-light':
        isActive,
    }),
    mobile: clsx({
      'mt-4 block w-full font-mono text-md font-medium tracking-[0.12em] uppercase':
        true,
      'text-dark dark:text-light': !isActive,
      'text-primary border-none': isActive,
    }),
  };

  return `${variantStyles[variant]}`;
};

export const NavLinks = ({
  variant = 'header',
  onClick = () => {},
}: {
  variant?: NavVariant;
  onClick?: () => void;
}) => {
  const { isActive } = useActiveLink();

  const links = [
    { href: '/', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Writing' },
    { href: '/resume', label: 'Resume', external: true },
    ...(variant === 'footer' ? [{ href: '/uses', label: 'Uses' }] : []),
  ];

  return (
    <>
      {links.map((link, index) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClick}
          prefetch={link.external ? false : undefined}
          target={link.external ? '_blank' : undefined}
          rel={link.external ? 'noopener noreferrer' : undefined}
        >
          <span
            className={getNavLinkStyles(
              variant,
              isActive(link.href),
              index === links.length - 1
            )}
          >
            {variant === 'header' && (
              <span
                className="font-mono text-xxs font-normal opacity-50"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')} /
              </span>
            )}
            {link.label}
            {link.external && (
              <span
                className="ml-1 font-mono text-xxs font-normal"
                aria-hidden="true"
              >
                ↗
              </span>
            )}
          </span>
        </Link>
      ))}
    </>
  );
};

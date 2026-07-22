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
      'mr-12 text-xxs uppercase': true,
      'text-dark dark:text-light': !isActive,
      'border-none text-primary': isActive,
    }),
    footer: clsx({
      'mr-6': !isLast,
      'text-dark dark:text-light': !isActive,
      'pb-1 border-b-2 border-dark text-dark dark:border-light dark:text-light':
        isActive,
    }),
    mobile: clsx({
      'block w-full text-md font-medium mt-4': true,
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
            {link.label}
            {link.external && (
              <span className="ml-1.5" aria-hidden="true">
                ↗
              </span>
            )}
          </span>
        </Link>
      ))}
    </>
  );
};

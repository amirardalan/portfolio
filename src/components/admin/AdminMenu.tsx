'use client';

import { useActiveLink } from '@/hooks/useActiveLink';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Container from '@/components/content/Container';

const links = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/blog/new', label: 'New post' },
  { href: '/admin/blog/drafts', label: 'Drafts' },
  { href: '/admin/blog/published', label: 'Published' },
  { href: '/admin/blog/categories', label: 'Categories' },
  { href: '/admin/account', label: 'Account' },
];

export default function AdminMenu() {
  const { isActive } = useActiveLink();
  const pathname = usePathname();

  const getLinkClass = (href: string) => {
    const active = href === '/admin' ? pathname === href : isActive(href);
    return clsx(
      'relative whitespace-nowrap rounded-full px-4 py-2 text-xxs uppercase tracking-[0.14em] transition-colors',
      !active &&
        'text-zinc-500 hover:bg-zinc-200/70 hover:text-dark dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-light',
      active && 'bg-dark text-light shadow-sm dark:bg-light dark:text-dark'
    );
  };

  return (
    <Container size="wide" className="pt-24 md:pt-28">
      <div className="border-b border-zinc-200 pb-5 dark:border-zinc-800">
        <nav
          aria-label="Content management"
          className="-mx-2 overflow-x-auto px-2"
        >
          <div className="flex w-max min-w-full items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  getLinkClass(link.href),
                  link.href === '/admin/account' && 'ml-auto'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </Container>
  );
}

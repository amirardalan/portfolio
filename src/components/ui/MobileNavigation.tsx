'use client';

import { useState, useEffect } from 'react';
import { NavLinks } from '@/components/ui/Navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import IconMobileNav from '@/components/icons/IconMobileNav';
import AuthMenu from '@/components/auth/AuthMenu';

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery(768);
  const isLandscape = useMediaQuery(500, 'height');

  // Close on 'ESC'
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Close on resize
  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <IconMobileNav isOpen={false} onClick={() => setIsOpen(true)} />
      <div
        className={`fixed inset-0 z-30 cursor-pointer transition-opacity ${
          isOpen ? 'bg-gradient opacity-70' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`fixed inset-y-0 right-0 z-50 flex h-screen w-[300px] flex-col bg-light bg-opacity-90 p-6 shadow-lg dark:bg-dark dark:bg-opacity-90`}
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100vw)',
          transition: 'transform 300ms ease-in-out',
        }}
      >
        <div
          className={`${isLandscape ? 'mb-2' : 'mb-10'} flex items-center justify-between`}
        >
          <IconMobileNav
            isOpen={true}
            onClick={() => setIsOpen(false)}
            className="static p-2"
          />
        </div>

        <nav className="flex flex-1 flex-col">
          <div className="flex flex-col space-y-1 pl-5">
            <div className="flex justify-start">
              <AuthMenu />
            </div>
            <NavLinks variant="mobile" onClick={() => setIsOpen(false)} />
          </div>
        </nav>
      </div>
    </>
  );
}

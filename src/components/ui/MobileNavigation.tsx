'use client';

import { useState, useEffect, useRef } from 'react';
import { NavLinks } from '@/components/ui/Navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import IconMobileNav from '@/components/icons/IconMobileNav';
import AuthMenu from '@/components/auth/AuthMenu';

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery(768);
  const isLandscape = useMediaQuery(500, 'height');
  const panelRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const shouldManageFocusRef = useRef(false);

  useEffect(() => {
    if (isOpen && shouldManageFocusRef.current) {
      closeButtonRef.current?.focus();
    } else if (!isOpen && wasOpenRef.current && shouldManageFocusRef.current) {
      openButtonRef.current?.focus();
      shouldManageFocusRef.current = false;
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        shouldManageFocusRef.current = true;
        setIsOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!panelRef.current.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first)?.focus();
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Close on resize
  useEffect(() => {
    if (!isMobile && isOpen) {
      shouldManageFocusRef.current = false;
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
      {!isOpen && (
        <IconMobileNav
          isOpen={false}
          onClick={(event) => {
            shouldManageFocusRef.current = event.detail === 0;
            setIsOpen(true);
          }}
          buttonRef={openButtonRef}
          controls="mobile-navigation"
        />
      )}
      <div
        className={`fixed inset-0 z-30 cursor-pointer transition-opacity motion-reduce:transition-none ${
          isOpen
            ? 'bg-gradient opacity-70 backdrop-blur-[2px]'
            : 'pointer-events-none opacity-0 backdrop-blur-none'
        }`}
        onClick={() => {
          shouldManageFocusRef.current = false;
          setIsOpen(false);
        }}
        aria-hidden="true"
      />

      <div
        id="mobile-navigation"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed inset-y-0 right-0 z-50 flex h-screen w-[300px] flex-col bg-light bg-opacity-90 p-6 shadow-lg transition-transform duration-300 ease-in-out motion-reduce:transition-none dark:bg-dark dark:bg-opacity-90 ${
          isOpen ? 'translate-x-0' : 'translate-x-[100vw]'
        }`}
      >
        <div
          className={`${isLandscape ? 'mb-2' : 'mb-10'} flex items-center justify-between`}
        >
          <IconMobileNav
            isOpen={true}
            onClick={(event) => {
              shouldManageFocusRef.current = event.detail === 0;
              setIsOpen(false);
            }}
            className="static p-2"
            buttonRef={closeButtonRef}
            controls="mobile-navigation"
          />
        </div>

        <nav className="flex flex-1 flex-col">
          <div className="flex flex-col space-y-1 pl-5">
            <div className="flex justify-start">
              <AuthMenu />
            </div>
            <NavLinks
              variant="mobile"
              onClick={() => {
                shouldManageFocusRef.current = false;
                setIsOpen(false);
              }}
            />
          </div>
        </nav>
      </div>
    </>
  );
}

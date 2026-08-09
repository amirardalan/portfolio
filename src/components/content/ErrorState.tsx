'use client';

import Link from 'next/link';
import ActionArrow from '@/components/ui/ActionArrow';
import SectionGlyph from '@/components/ui/SectionGlyph';

type ErrorAction =
  | {
      label: string;
      href: string;
      onClick?: never;
    }
  | {
      label: string;
      href?: never;
      onClick: () => void;
    };

type ErrorStateProps = {
  code: '404' | '500';
  eyebrow: string;
  heading: string;
  description: string;
  status: string;
  primaryAction: ErrorAction;
};

export default function ErrorState({
  code,
  eyebrow,
  heading,
  description,
  status,
  primaryAction,
}: ErrorStateProps) {
  const actionClasses =
    'group inline-flex min-h-11 items-center gap-3 font-mono text-xxs font-medium tracking-[0.12em] uppercase text-primary';

  return (
    <section
      aria-labelledby="error-heading"
      className="relative isolate flex min-h-screen w-full overflow-hidden text-dark dark:text-light"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mx-auto flex w-full max-w-[1440px] px-6 opacity-40 md:px-10 lg:px-16 dark:opacity-30"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <span
            key={index}
            className="h-full flex-1 border-l border-zinc-300 last:border-r dark:border-zinc-800"
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-6 pt-28 pb-10 md:px-10 md:pt-36 md:pb-14 lg:px-16 lg:pt-40 lg:pb-16">
        <div className="flex items-center justify-between gap-6 border-b border-zinc-300 pb-4 dark:border-zinc-700">
          <p className="text-primary text-xxs flex items-center gap-2.5 font-sans tracking-[0.22em] uppercase">
            <SectionGlyph /> {eyebrow}
          </p>
          <p className="text-xxs font-mono text-zinc-500 uppercase dark:text-zinc-400">
            ERR / {code}
          </p>
        </div>

        <div className="grid flex-1 content-center gap-10 py-14 md:grid-cols-12 md:items-end md:gap-8 md:py-20">
          <h1
            id="error-heading"
            className="font-editorial text-5xl leading-none font-medium tracking-tight text-balance sm:text-6xl md:col-span-8 md:text-7xl lg:text-8xl"
          >
            {heading}
          </h1>

          <div className="md:col-span-4 md:pb-1">
            <p className="font-editorial max-w-md text-lg leading-relaxed font-normal text-zinc-600 text-pretty dark:text-zinc-300">
              {description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 md:mt-8">
              {primaryAction.href !== undefined ? (
                <Link href={primaryAction.href} className={actionClasses}>
                  <ActionArrow direction="left" />
                  <span>{primaryAction.label}</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={primaryAction.onClick}
                  className={actionClasses}
                >
                  <span>{primaryAction.label}</span>
                  <ActionArrow direction="right" />
                </button>
              )}

              <Link
                href={code === '404' ? '/#selected-work' : '/'}
                className="group inline-flex min-h-11 items-center gap-3 font-mono text-xxs font-medium tracking-[0.12em] uppercase"
              >
                <span>{code === '404' ? 'View selected work' : 'Return home'}</span>
                <ActionArrow direction="right" />
              </Link>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="grid grid-cols-3 border-y border-zinc-300 dark:border-zinc-700">
          {code.split('').map((digit, index) => {
            const isAccent = index === 1;

            return (
              <div
                key={`${digit}-${index}`}
                className={`font-editorial flex min-h-32 items-center justify-center border-r text-8xl leading-none font-medium tracking-tighter last:border-r-0 sm:min-h-40 sm:text-9xl md:min-h-48 ${
                  isAccent
                    ? 'bg-primary border-primary text-light dark:text-dark'
                    : 'border-zinc-300 dark:border-zinc-700'
                }`}
              >
                {digit}
              </div>
            );
          })}
        </div>

        <div className="text-xxs mt-4 flex items-center justify-between gap-6 font-sans tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400">
          <span>{status}</span>
          <span className="font-mono">AA / {code === '404' ? '00' : '01'}</span>
        </div>
      </div>
    </section>
  );
}

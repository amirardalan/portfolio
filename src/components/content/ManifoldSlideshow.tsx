'use client';

import { CldImage } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import type { ProjectMedia } from '@/content/projects';

const FRAME_DURATION = 9000;

type ManifoldSlideshowProps = {
  images: ProjectMedia[];
  liveUrl: string;
  projectTitle: string;
};

export default function ManifoldSlideshow({
  images,
  liveUrl,
  projectTitle,
}: ManifoldSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setActiveIndex(0);
    }
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || isPaused || isInteracting || images.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, FRAME_DURATION);

    return () => window.clearInterval(interval);
  }, [images.length, isInteracting, isPaused, reduceMotion]);

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  return (
    <div
      className="relative min-h-[320px] overflow-hidden sm:min-h-[440px] md:col-span-7 lg:min-h-[560px]"
      role="group"
      aria-label={`${projectTitle} image slideshow`}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsInteracting(false);
        }
      }}
    >
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${projectTitle} project (opens in a new tab)`}
        className="absolute inset-0"
      >
        {images.map((image, index) => (
          <CldImage
            key={image.src}
            src={image.src}
            alt={index === activeIndex ? image.alt : ''}
            aria-hidden={index !== activeIndex}
            fill
            priority={index === 0}
            sizes="(min-width: 768px) 58vw, 100vw"
            className={`object-cover object-center transition duration-500 ease-in-out motion-reduce:transform-none motion-reduce:transition-none ${
              index === activeIndex
                ? 'opacity-100 group-hover:scale-102'
                : 'opacity-0'
            }`}
          />
        ))}
      </a>

      {images.length > 1 && (
        <div className="text-light absolute right-4 bottom-4 z-10 flex items-stretch overflow-hidden rounded-lg bg-zinc-950/60 font-mono shadow-md shadow-black/20 backdrop-blur-xl">
          <div
            className="text-xxs flex items-center gap-1.5 border-r border-white/10 px-3 text-white/45 tabular-nums"
            aria-hidden="true"
          >
            <span className="text-white/90">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span>/</span>
            <span>{String(images.length).padStart(2, '0')}</span>
          </div>
          <button
            type="button"
            onClick={showPrevious}
            className="flex h-10 w-10 items-center justify-center border-r border-white/10 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Show previous project image"
          >
            <svg
              className="size-4"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m9.5 4-4 4 4 4M5.5 8h6"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setIsPaused((paused) => !paused)}
            className="flex h-10 w-10 items-center justify-center border-r border-white/10 text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:text-white/30 disabled:hover:bg-transparent"
            aria-label={
              reduceMotion
                ? 'Slideshow paused for reduced motion'
                : isPaused
                  ? 'Play project slideshow'
                  : 'Pause project slideshow'
            }
            aria-pressed={isPaused || reduceMotion}
            disabled={reduceMotion}
          >
            {isPaused || reduceMotion ? (
              <svg
                className="size-4"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path d="m6 4.5 5 3.5-5 3.5v-7Z" fill="currentColor" />
              </svg>
            ) : (
              <svg
                className="size-4"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 4.5v7M10 4.5v7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={showNext}
            className="flex h-10 w-10 items-center justify-center text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Show next project image"
          >
            <svg
              className="size-4"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m6.5 4 4 4-4 4M10.5 8h-6"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

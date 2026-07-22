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
        aria-label={`Open ${projectTitle}`}
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
            className={`object-cover object-center transition-[opacity,transform] duration-[1800ms] ease-in-out motion-reduce:transform-none motion-reduce:transition-none ${
              index === activeIndex
                ? 'opacity-100 group-hover:scale-[1.02]'
                : 'opacity-0'
            }`}
          />
        ))}
      </a>

      {images.length > 1 && (
        <div className="absolute bottom-4 right-4 z-10 flex overflow-hidden rounded-full bg-zinc-950/75 text-light backdrop-blur-sm">
          <button
            type="button"
            onClick={showPrevious}
            className="flex h-11 w-11 items-center justify-center border-r border-white/15"
            aria-label="Show previous project image"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => setIsPaused((paused) => !paused)}
            className="flex h-11 w-11 items-center justify-center border-r border-white/15 disabled:text-white/50"
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
            <span aria-hidden="true">
              {isPaused || reduceMotion ? '▶' : 'Ⅱ'}
            </span>
          </button>
          <button
            type="button"
            onClick={showNext}
            className="flex h-11 w-11 items-center justify-center"
            aria-label="Show next project image"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  );
}

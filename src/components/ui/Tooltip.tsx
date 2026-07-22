'use client';

import { useState, useRef, ReactNode, useId } from 'react';

type TooltipProps = {
  pos?: 't' | 'r' | 'b' | 'l';
  text: string;
  children: ReactNode;
  onClose?: () => void;
};

export default function Tooltip({
  pos,
  text,
  children,
  onClose,
}: TooltipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const tooltipId = `tooltip-${id}`;

  const isVisible = isHovered;

  const handleMouseLeave = () => {
    setIsHovered(false);
    onClose?.();
  };

  return (
    <div
      ref={ref}
      className="relative inline-flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={() => setIsHovered(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          handleMouseLeave();
        }
      }}
    >
      {children}
      <div
        id={tooltipId}
        ref={tooltipRef}
        role="tooltip"
        aria-hidden={!isVisible}
        className={`absolute z-30 hidden whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-xxs uppercase text-light shadow-md lg:block ${
          isVisible
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        } ${
          pos === 't'
            ? '-top-8 left-1/2 -translate-x-1/2'
            : pos === 'r'
              ? 'left-full top-1/2 ml-2 -translate-y-1/2'
              : pos === 'b'
                ? 'left-1/2 top-full mt-1 -translate-x-1/2'
                : pos === 'l'
                  ? 'right-full top-1/2 mr-2 -translate-y-1/2'
                  : ''
        } transition-opacity duration-300`}
      >
        {text}
      </div>
    </div>
  );
}

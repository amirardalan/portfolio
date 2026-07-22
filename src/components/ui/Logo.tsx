'use client';

import { useTheme } from '@/store/theme';

interface LogoProps {
  size: number;
  inverted?: boolean;
  title?: string;
  focusable?: boolean;
}

export default function Logo({
  size,
  title,
  focusable = false,
  inverted = false,
}: LogoProps) {
  const { effectiveTheme } = useTheme();

  // Invert logo color
  const fillColor = inverted
    ? effectiveTheme === 'dark'
      ? 'var(--color-dark)'
      : 'var(--color-light)'
    : effectiveTheme === 'dark'
      ? 'var(--color-light)'
      : 'var(--color-dark)';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 286 286"
      xmlns="http://www.w3.org/2000/svg"
      fill={fillColor}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable={focusable ? 'true' : 'false'}
    >
      <path d="M211.825 42.6501L220.907 49.9753C245.665 69.9432 252.057 88.6088 240.081 105.972C236.179 111.724 230.662 117.475 223.531 123.227L130.284 198.432L74.4767 153.423L211.825 42.6501ZM93.2473 18.1514C108.116 6.15986 122.412 0.109808 136.137 0.00128681C151.207 -0.107234 167.186 6.64821 184.072 20.2676L193.155 27.5928L55.8071 138.366L0 93.3566L93.2473 18.1514Z" />
      <path d="M92.845 258.487L101.928 265.813C126.686 285.781 149.829 290.935 171.358 281.277C178.49 278.13 185.621 273.68 192.753 267.929L286 192.724L230.193 147.715L92.845 258.487ZM62.469 162.853C47.6006 174.845 40.0991 186.375 39.9645 197.444C39.8299 209.599 48.2061 222.486 65.0928 236.105L74.1753 243.43L211.523 132.657L155.716 87.6481L62.469 162.853Z" />
    </svg>
  );
}

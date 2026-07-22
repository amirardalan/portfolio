import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Jura', 'system-ui'],
      serif: ['Manuale', 'serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    extend: {
      colors: {
        light: 'var(--color-light)',
        dark: 'var(--color-dark)',
        primary: 'var(--color-primary)',
      },
      backgroundImage: {
        gradient: 'var(--color-gradient)',
      },
      fontSize: {
        md: '1rem',
        xs: '.85rem',
        xxs: '.75rem',
        xxl: '1.7rem',
      },
      gridTemplateRows: {
        layout: 'auto 1fr auto',
      },
    },
  },
  darkMode: 'selector',
  plugins: [scrollbar],
};

export default config;

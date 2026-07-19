import { Metadata } from 'next';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { AuthProvider } from '@/context/AuthProvider';
import { PostHogProvider } from '@/context/PostHogProvider';

import { getTheme } from '@/utils/get-theme';
import '@/src/globals.css';
import clsx from 'clsx';

import { Jura, Manuale, JetBrains_Mono } from 'next/font/google';
import DarkIcon from '@/public/images/favicon-dark.png';
import LightIcon from '@/public/images/favicon-light.png';

import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import MobileNavigation from '@/components/ui/MobileNavigation';

const sans = Jura({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});
const serif = Manuale({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const pathname = (await headers()).get('x-next-pathname') as string;

  const getPageTitle = (path: string): string => {
    if (path === '/') {
      return 'Amir Ardalan — Design Engineer';
    }
    if (path.startsWith('/blog/')) {
      const slug = path.split('/blog/')[1];
      return `${slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} — Amir Ardalan`;
    }
    if (path.length > 1) {
      return `${path.slice(1).charAt(0).toUpperCase()}${path.slice(2)} — Amir Ardalan`;
    }
    return 'Amir Ardalan — Design Engineer';
  };

  const title = getPageTitle(pathname);

  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    title,
    description: 'The portfolio and blog of Engineer and Designer Amir Ardalan',
    icons: [
      {
        rel: 'icon',
        media: '(prefers-color-scheme: light)',
        type: 'image/png',
        url: LightIcon.src,
      },
      {
        rel: 'icon',
        media: '(prefers-color-scheme: dark)',
        type: 'image/png',
        url: DarkIcon.src,
      },
    ],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const theme = await getTheme();
  const session = await auth();

  return (
    <AuthProvider session={session}>
      <html
        lang="en"
        className={clsx(
          sans.className,
          serif.className,
          mono.className,
          theme || 'dark'
        )}
      >
        <body
          className={clsx('font-sans font-medium', {
            'bg-light': theme === 'light',
            'dark:bg-dark': theme === 'dark' || !theme,
          })}
        >
          <PostHogProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex flex-1 flex-grow">{children}</main>
              <Footer />
            </div>
          </PostHogProvider>
          <MobileNavigation />
        </body>
      </html>
    </AuthProvider>
  );
}

import { getPublishedPosts } from '@/db/queries/posts';

import BlogPosts from '@/components/blog/BlogPosts';
import SectionGlyph from '@/components/ui/SectionGlyph';

import { BlogPost } from '@/types/blog';
import type { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    title: 'Writing — Amir Ardalan',
    description:
      'Writing about product design, interaction design, frontend engineering, and creative technology.',
    alternates: {
      canonical: '/blog',
    },
  };
};

export default async function Blog() {
  let posts: BlogPost[] = [];
  try {
    posts = await getPublishedPosts({
      next: { tags: ['published-posts', 'blog-list'] },
    });
  } catch (error) {
    console.error('Error fetching published posts:', error);
  }

  return (
    <article className="text-dark w-full dark:text-light">
      <header>
        <div className="mx-auto w-full max-w-[1440px] px-6 pt-24 pb-4 md:px-10 md:pt-40 md:pb-6 lg:px-16 lg:pt-44">
          <div className="flex items-center justify-between">
            <h1 className="text-primary text-xxs flex items-center gap-2.5 font-sans tracking-[0.22em] uppercase">
              <SectionGlyph /> Archive / Writing
            </h1>
            <span className="text-xxs font-mono text-zinc-400 uppercase tabular-nums dark:text-zinc-600">
              {String(posts.length).padStart(2, '0')}{' '}
              {posts.length === 1 ? 'Entry' : 'Entries'}
            </span>
          </div>
        </div>
      </header>

      <BlogPosts posts={posts} />
    </article>
  );
}

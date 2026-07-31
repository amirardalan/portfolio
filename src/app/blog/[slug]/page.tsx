import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  getAllPublishedSlugs,
  getPostBySlug,
  getAdjacentPosts,
} from '@/db/queries/posts';

import { getAuthorizedSession } from '@/lib/auth';
import { compileMDX } from 'next-mdx-remote/rsc';
import { components } from '@/components/blog/MDXComponents';

import Container from '@/components/content/Container';
import Link from 'next/link';

import ClientLikeCount from '@/components/blog/ClientLikeCount';
import ClientViewCount from '@/components/blog/ClientViewCount';
import BlogSupport from '@/components/blog/BlogSupport';
import AdjacentPostNavigation from '@/components/blog/AdjacentPostNavigation';
import AdminPostControls from '@/components/admin/AdminPostControls';
import SocialActions from '@/components/blog/SocialActions';
import SectionGlyph from '@/components/ui/SectionGlyph';

import { formatDate } from '@/utils/format-date';

export const dynamicParams = true;

export async function generateStaticParams() {
  return await getAllPublishedSlugs();
}

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await paramsPromise;
  const post = await getPostBySlug(slug);

  if (!post || (!post.published && !(await getAuthorizedSession()))) {
    return {
      metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} — Amir Ardalan`,
    description: post.excerpt || 'Read this post on amir.sh.',
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

async function compilePostContent(content: string) {
  const { content: compiledContent } = await compileMDX({
    source: content,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        development: false,
      },
    },
  });

  return compiledContent;
}

export default async function BlogPost({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await paramsPromise;

  if (!/^[a-z0-9-]+$/.test(slug)) {
    notFound();
  }

  let post;
  try {
    post = await getPostBySlug(slug, {
      next: { tags: [`blog-post:${slug}`] },
    });
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  if (!post.published) {
    if (!(await getAuthorizedSession())) {
      notFound();
    }
  }

  let content;
  try {
    content = await compilePostContent(post.content);
  } catch (error) {
    console.error('Error compiling post content:', error);
    content = '<p>We couldn’t load this post.</p>';
  }

  const adjacentPosts = post.published
    ? await getAdjacentPosts(slug)
    : { previous: null, next: null };

  return (
    <Container>
      <article className="text-dark mt-12 dark:text-light md:mt-20">
        <AdminPostControls
          slug={post.slug}
          published={post.published ?? false}
        />

        <header className="border-b border-zinc-300 pb-6 sm:pb-8 dark:border-zinc-700">
          <div className="flex items-center justify-between gap-5">
            <div className="text-xxs flex shrink-0 items-center uppercase">
              <Link
                href={`/blog?category=${encodeURIComponent(post.category?.name ?? 'uncategorized')}`}
                className="text-primary flex items-center gap-2 font-sans tracking-[0.16em] whitespace-nowrap transition-opacity hover:opacity-70"
              >
                <SectionGlyph />
                {post.category?.name ?? 'uncategorized'}
              </Link>
            </div>
            <span
              className="min-w-0 flex-1 border-t border-zinc-300 dark:border-zinc-700"
              aria-hidden="true"
            />
            <div className="text-xxxs flex shrink-0 items-center font-mono tracking-[0.08em] whitespace-nowrap uppercase">
              <ClientViewCount
                route={`/blog/${post.slug}`}
                textColor="text-zinc-500 dark:text-zinc-400"
              />
              <span className="mx-2 text-zinc-400 dark:text-zinc-600">/</span>
              <ClientLikeCount postId={post.id} />
            </div>
          </div>

          <h1
            className="font-editorial mt-6 text-4xl leading-none font-medium tracking-tight text-balance sm:mt-8 sm:text-5xl"
            id="post-title"
          >
            {post.title}
          </h1>
          <div className="mt-4 flex w-full items-center justify-between gap-6 text-zinc-500 sm:mt-8 dark:text-zinc-400">
            <div className="text-xxs flex min-w-0 items-center uppercase">
              <time
                className="font-mono text-xxxs tracking-[0.08em] whitespace-nowrap"
                title={formatDate(post.created_at)}
                aria-label={`Posted on ${formatDate(post.created_at)}`}
              >
                {post.show_updated
                  ? `Updated: ${formatDate(post.updated_at)}`
                  : formatDate(post.created_at)}
              </time>
              <div
                className="mx-2 text-zinc-400 dark:text-zinc-600"
                aria-hidden="true"
              >
                /
              </div>
              <span
                aria-label={`Author: ${post.author_name || 'Anonymous'}`}
                className="truncate font-sans tracking-[0.12em]"
              >
                {post.author_name || 'Anonymous'}
              </span>
            </div>
            <span className="flex shrink-0 justify-end">
              <SocialActions postId={post.id} />
            </span>
          </div>
        </header>
        <div className="mdx-content mt-10" aria-labelledby="post-title">
          {content}
        </div>
        <footer className="-mx-6 mt-16 w-screen border-t border-zinc-300 sm:mx-0 sm:w-auto dark:border-zinc-700">
          <BlogSupport postId={post.id} />
          {post.published && (adjacentPosts.previous || adjacentPosts.next) && (
            <AdjacentPostNavigation
              previous={adjacentPosts.previous}
              next={adjacentPosts.next}
            />
          )}
        </footer>
      </article>
    </Container>
  );
}

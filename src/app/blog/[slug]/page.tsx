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

import { formatDate } from '@/utils/format-date';
import calculateReadTime from '@/utils/calculate-readtime';

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
      <article className="text-dark dark:text-light mt-12 md:mt-20">
        <AdminPostControls
          slug={post.slug}
          published={post.published ?? false}
        />

        <div className="flex items-center justify-between">
          <div className="text-xxs flex flex-row uppercase">
            <span className="text-xxs text-primary pr-2 uppercase">
              <Link
                href={`/blog?category=${encodeURIComponent(post.category?.name ?? 'uncategorized')}`}
              >
                #{post.category?.name ?? 'uncategorized'}
              </Link>
            </span>
            <span className="mr-2 text-zinc-500 dark:text-zinc-400">•</span>
            <span className="whitespace-nowrap text-zinc-500 dark:text-zinc-400">
              {calculateReadTime(post.content)}
            </span>
          </div>
          <span
            className="mx-4 w-full border-t border-zinc-300 dark:border-zinc-700"
            aria-hidden="true"
          />
          <div className="text-xxs flex items-center whitespace-nowrap uppercase">
            <ClientViewCount
              route={`/blog/${post.slug}`}
              textColor="text-zinc-500 dark:text-zinc-400"
            />
            <span className="mx-2 text-zinc-500 dark:text-zinc-400">•</span>
            <ClientLikeCount postId={post.id} />
          </div>
        </div>
        <h1 className="mt-6 text-3xl lg:text-4xl" id="post-title">
          {post.title}
        </h1>
        <div className="mt-6 flex w-full items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center">
            <time
              className="text-xs uppercase"
              title={formatDate(post.created_at)}
              aria-label={`Posted on ${formatDate(post.created_at)}`}
            >
              {post.show_updated
                ? `Updated: ${formatDate(post.updated_at)}`
                : formatDate(post.created_at)}
            </time>
            <div className="mx-2 text-sm" aria-hidden="true">
              •
            </div>
            <span
              aria-label={`Author: ${post.author_name || 'Anonymous'}`}
              className="uppercase"
            >
              {post.author_name || 'Anonymous'}
            </span>
          </div>
          <span className="flex justify-end">
            <SocialActions postId={post.id} />
          </span>
        </div>
        <div className="mdx-content mt-8" aria-labelledby="post-title">
          {content}
        </div>
        <BlogSupport postId={post.id} />
        {post.published && (adjacentPosts.previous || adjacentPosts.next) && (
          <AdjacentPostNavigation
            previous={adjacentPosts.previous}
            next={adjacentPosts.next}
          />
        )}
      </article>
    </Container>
  );
}

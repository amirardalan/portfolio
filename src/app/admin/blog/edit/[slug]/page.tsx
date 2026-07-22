import type { Metadata } from 'next';
import { getAuthorizedSession } from '@/lib/auth';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getUserIdByEmail } from '@/db/queries/users';
import { getPinnedPost, getPostBySlug } from '@/db/queries/posts';

import AdminPageHeading from '@/components/admin/AdminPageHeading';
import EditPostForm from '@/components/blog/EditPostForm';
import Container from '@/components/content/Container';

export default async function EditBlogPost({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getAuthorizedSession();

  const params = await paramsPromise;
  const { slug } = params;

  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error('Invalid slug format.');
  }

  if (!session) {
    notFound();
  }

  const [userId, post, pinnedPost] = await Promise.all([
    getUserIdByEmail(session.user.email!),
    getPostBySlug(slug, {
      next: { tags: ['posts', `blog-post:${slug}`] },
    }),
    getPinnedPost(),
  ]);

  if (!userId) {
    throw new Error('An error occurred while fetching user details.');
  }

  if (!post) {
    return (
      <Container size="wide">
        <div className="text-dark dark:text-light py-16 text-center">
          <p className="text-xxs text-primary tracking-[0.2em] uppercase">
            Missing post
          </p>
          <h1 className="mt-4 font-serif text-4xl italic">Post not found</h1>
          <p className="mt-4 text-sm font-normal text-zinc-500 dark:text-zinc-400">
            The post you&apos;re trying to edit could not be found.
          </p>
          <Link
            href="/admin/blog/drafts"
            className="hover:border-primary hover:text-primary mt-7 inline-flex min-h-10 items-center rounded-full border border-zinc-300 px-4 text-xs tracking-[0.1em] uppercase transition-colors dark:border-zinc-700"
          >
            Back to drafts
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container size="wide">
      <AdminPageHeading
        title="Edit post"
        eyebrow={post.published ? 'Published post' : 'Draft'}
        description={`Update “${post.title}” and its publishing details.`}
      />
      <EditPostForm
        post={{
          ...post,
          show_updated: post.show_updated,
          featured: !!post.featured,
        }}
        pinnedPost={pinnedPost}
      />
    </Container>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = `Edit Post: ${slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())} — Amir Ardalan`;

  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    title,
    description: `Edit the blog post titled "${slug}" in the admin panel.`,
  };
}

import { getAuthorizedSession } from '@/lib/auth';
import { notFound } from 'next/navigation';
import { getUserIdByEmail } from '@/db/queries/users';
import { getPostBySlug } from '@/db/queries/posts';

import AdminPageHeading from '@/components/admin/AdminPageHeading';
import EditPostForm from '@/components/blog/EditPostForm';

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

  const userId = await getUserIdByEmail(session.user.email!);

  if (!userId) {
    throw new Error('An error occurred while fetching user details.');
  }

  const post = await getPostBySlug(slug, {
    next: { tags: ['posts', `blog-post:${slug}`] },
  });

  if (!post) {
    return (
      <div className="text-dark dark:text-light mt-8 text-center">
        <h2 className="mb-6 text-2xl">Post Not Found</h2>
        <p>The post you&apos;re trying to edit could not be found.</p>
        <a href="/admin/blog/drafts" className="mt-4 text-blue-500 underline">
          Back to drafts
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="mx-10">
        <AdminPageHeading title={'Edit Post'} />
      </div>
      <EditPostForm
        post={{
          ...post,
          show_updated: post.show_updated,
          featured: !!post.featured,
        }}
      />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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

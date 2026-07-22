import { getAuthorizedSession } from '@/lib/auth';
import { notFound } from 'next/navigation';
import { getUserIdByEmail } from '@/db/queries/users';
import { getPinnedPost } from '@/db/queries/posts';

import AdminPageHeading from '@/components/admin/AdminPageHeading';
import CreatePostForm from '@/components/blog/NewPostForm';
import Container from '@/components/content/Container';

export default async function NewBlogPost() {
  const session = await getAuthorizedSession();

  if (!session) {
    notFound();
  }

  const [userId, pinnedPost] = await Promise.all([
    getUserIdByEmail(session.user.email!),
    getPinnedPost(),
  ]);

  if (!userId) {
    throw new Error('An error occurred while fetching user details.');
  }

  return (
    <Container size="wide">
      <AdminPageHeading
        title="New post"
        eyebrow="Writing desk"
        description="Shape the story, add publishing details, and save it as a draft or send it live."
      />
      <CreatePostForm userId={userId} pinnedPost={pinnedPost} />
    </Container>
  );
}

export function generateMetadata() {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    title: 'New Post — Amir Ardalan',
    description: 'Create a new blog post in the admin panel.',
  };
}

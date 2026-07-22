import { getAuthorizedSession } from '@/lib/auth';
import { notFound } from 'next/navigation';
import { getUserIdByEmail } from '@/db/queries/users';

import AdminPageHeading from '@/components/admin/AdminPageHeading';
import CreatePostForm from '@/components/blog/NewPostForm';

export default async function NewBlogPost() {
  const session = await getAuthorizedSession();

  if (!session) {
    notFound();
  }

  const userId = await getUserIdByEmail(session.user.email!);

  if (!userId) {
    throw new Error('An error occurred while fetching user details.');
  }

  return (
    <div>
      <div className="mx-10">
        <AdminPageHeading title={'New Post'} />
      </div>
      <CreatePostForm userId={userId} />
    </div>
  );
}

export function generateMetadata() {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    title: 'New Post — Amir Ardalan',
    description: 'Create a new blog post in the admin panel.',
  };
}

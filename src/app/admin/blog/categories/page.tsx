import AdminCategories from '@/components/admin/AdminCategories';
import AdminPageHeading from '@/components/admin/AdminPageHeading';
import Container from '@/components/content/Container';
import { getAuthorizedSession } from '@/lib/auth';
import { notFound } from 'next/navigation';

export default async function CategoriesPage() {
  if (!(await getAuthorizedSession())) {
    notFound();
  }

  return (
    <Container>
      <AdminPageHeading title="Category Manager" />
      <AdminCategories />
    </Container>
  );
}

export function generateMetadata() {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    title: 'Categories — Amir Ardalan',
    description: 'Manage blog categories in the admin panel.',
  };
}

import AdminPageHeading from '@/components/admin/AdminPageHeading';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminStats from '@/components/admin/AdminStats';
import Container from '@/components/content/Container';
import { getAuthorizedSession } from '@/lib/auth';
import { notFound } from 'next/navigation';

export default async function AdminPage() {
  if (!(await getAuthorizedSession())) {
    notFound();
  }

  return (
    <Container size="wide">
      <AdminPageHeading
        title="Welcome back"
        eyebrow="Content overview"
        description="Write, organize, and keep an eye on your published work from one place."
      />
      <AdminStats />
      <AdminDashboard />
    </Container>
  );
}

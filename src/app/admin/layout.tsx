import { getAuthorizedSession } from '@/lib/auth';
import { notFound } from 'next/navigation';
import { ToastProvider } from '@/components/ui/ToastContext';

import AdminMenu from '@/components/admin/AdminMenu';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthorizedSession();

  if (!session) {
    notFound();
  }

  return (
    <ToastProvider>
      <div className="mb-6 flex w-full flex-col">
        <AdminMenu />
        <div>{children}</div>
      </div>
    </ToastProvider>
  );
}

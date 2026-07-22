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
      <div className="cms-shell flex w-full flex-col bg-[radial-gradient(circle_at_top_right,rgba(120,30,100,0.07),transparent_32%)] pb-20 dark:bg-[radial-gradient(circle_at_top_right,rgba(220,230,80,0.035),transparent_30%)]">
        <AdminMenu />
        <div className="w-full">{children}</div>
      </div>
    </ToastProvider>
  );
}

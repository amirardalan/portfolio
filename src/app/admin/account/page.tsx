import { getAuthorizedSession } from '@/lib/auth';
import { notFound } from 'next/navigation';

import AdminPageHeading from '@/components/admin/AdminPageHeading';
import Avatar from '@/components/account/Avatar';
import { ObfuscatedEmail } from '@/components/ui/ObfuscatedEmail';
import Container from '@/components/content/Container';
import Link from 'next/link';

export function generateMetadata() {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    title: 'Account — Amir Ardalan',
    description: 'View and manage your account details.',
  };
}

export default async function Account() {
  const session = await getAuthorizedSession();

  if (!session) {
    notFound();
  }

  return (
    <Container>
      <div>
        <AdminPageHeading title={'Account'} />
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="h-6 w-6">
              <Avatar />
            </div>
            <p className="text-s text-dark dark:text-light ml-2">
              {session.user?.name}
            </p>
            <Link
              href="/api/auth/signout?callbackUrl=/&redirect=false"
              className="text-xxs text-primary ml-2 uppercase"
            >
              Sign Out
            </Link>
          </div>
          <div className="text-dark dark:text-light mt-4 flex flex-row items-center rounded-lg border border-1 border-zinc-300 p-4 dark:border-zinc-700">
            <span>Email:</span>
            <span>
              {session.user?.email && (
                <ObfuscatedEmail email={session.user.email} />
              )}
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
}

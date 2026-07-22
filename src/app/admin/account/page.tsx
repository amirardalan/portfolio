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
    <Container size="wide">
      <div className="pb-10">
        <AdminPageHeading
          title="Account"
          eyebrow="Studio profile"
          description="Your authenticated author identity and account details."
        />
        <section className="bg-light dark:bg-dark overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col gap-6 border-b border-zinc-200 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8 dark:border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 overflow-hidden rounded-full ring-1 ring-zinc-200 dark:ring-zinc-700">
                <Avatar />
              </div>
              <div>
                <p className="text-dark dark:text-light text-lg font-medium">
                  {session.user?.name}
                </p>
                <p className="text-xxs text-primary mt-1 tracking-[0.14em] uppercase">
                  Owner · Author
                </p>
              </div>
            </div>
            <Link
              href="/api/auth/signout?callbackUrl=/&redirect=false"
              className="text-xxs text-dark hover:border-primary hover:text-primary dark:text-light inline-flex min-h-10 items-center justify-center self-start rounded-full border border-zinc-300 px-4 tracking-[0.1em] uppercase transition-colors sm:self-auto dark:border-zinc-700"
            >
              Sign out
            </Link>
          </div>
          <div className="grid gap-3 p-6 sm:grid-cols-[180px_1fr] sm:items-center md:p-8">
            <div>
              <p className="text-xxs tracking-[0.16em] text-zinc-500 uppercase dark:text-zinc-400">
                Email address
              </p>
              <p className="mt-1 text-xs font-normal text-zinc-400 dark:text-zinc-600">
                Click to reveal
              </p>
            </div>
            <div className="text-dark dark:text-light text-sm sm:justify-self-end">
              {session.user?.email && (
                <ObfuscatedEmail email={session.user.email} />
              )}
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

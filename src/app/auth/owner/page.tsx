import { redirect } from 'next/navigation';
import { getAuthorizedSession } from '@/lib/auth';
import SignInButton from '@/components/auth/SigninButton';

export const metadata = {
  title: 'Authentication — Amir Ardalan',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function OwnerSignInPage() {
  const session = await getAuthorizedSession();

  if (session) {
    redirect('/admin');
  }

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center">
      <SignInButton />
    </div>
  );
}

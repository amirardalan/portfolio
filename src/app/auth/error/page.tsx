import Link from 'next/link';

export const metadata = {
  title: 'Authentication Error — Amir Ardalan',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthError() {
  return (
    <div className="text-dark dark:text-light flex min-h-[80vh] flex-col items-center justify-center">
      <h1 className="mb-4 text-xl font-medium">Authentication failed</h1>
      <p className="mb-4">This account cannot access the requested resource.</p>
      <Link href="/" className="text-primary underline">
        Return home
      </Link>
    </div>
  );
}

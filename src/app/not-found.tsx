import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center px-6 text-center text-dark dark:text-light">
      <p className="font-mono text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        404
      </p>
      <h1 className="mt-3 text-2xl font-medium">That page isn’t here.</h1>
      <Link
        href="/"
        className="mt-6 border-b border-primary pb-1 text-sm uppercase tracking-wide text-primary"
      >
        Back to work
      </Link>
    </div>
  );
}

import Link from 'next/link';

const actions = [
  {
    href: '/admin/blog/new',
    kicker: 'Start writing',
    title: 'Compose a new post',
    description: 'Open a clean draft with publishing controls close at hand.',
    action: 'New post',
    index: '01',
  },
  {
    href: '/admin/blog/drafts',
    kicker: 'In progress',
    title: 'Return to your drafts',
    description: 'Continue unfinished ideas and prepare them for publishing.',
    action: 'View drafts',
    index: '02',
  },
  {
    href: '/admin/blog/published',
    kicker: 'Live library',
    title: 'Manage published work',
    description: 'Review what is live, update details, or pin a post.',
    action: 'View posts',
    index: '03',
  },
  {
    href: '/admin/blog/categories',
    kicker: 'Structure',
    title: 'Organize categories',
    description: 'Keep your writing taxonomy useful, concise, and consistent.',
    action: 'Manage categories',
    index: '04',
  },
];

export default function AdminDashboard() {
  return (
    <section className="mt-10" aria-labelledby="quick-actions-heading">
      <div className="mb-5 flex items-center justify-between">
        <h2
          id="quick-actions-heading"
          className="text-xxs tracking-[0.2em] text-zinc-500 uppercase dark:text-zinc-400"
        >
          Workspace
        </h2>
        <span className="text-xxs tracking-[0.14em] text-zinc-400 uppercase dark:text-zinc-600">
          Quick actions
        </span>
      </div>
      <div className="grid gap-px overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-200 md:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-800">
        {actions.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group bg-light dark:bg-dark relative min-h-60 p-7 transition-colors hover:bg-zinc-50 md:p-8 dark:hover:bg-zinc-900"
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xxs text-primary tracking-[0.16em] uppercase">
                    {item.kicker}
                  </p>
                  <span className="text-xxs font-mono text-zinc-300 dark:text-zinc-700">
                    {item.index}
                  </span>
                </div>
                <h3 className="text-dark dark:text-light mt-7 text-2xl leading-tight font-medium">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed font-normal text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </p>
              </div>
              <span className="text-dark dark:text-light mt-8 inline-flex items-center gap-3 text-xs tracking-[0.12em] uppercase">
                {item.action}
                <span
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

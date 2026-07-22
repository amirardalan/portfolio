import Logo from '@/components/ui/Logo';
import IconGithub from '@/components/icons/IconGithub';

export default async function Footer() {
  return (
    <footer className="z-10 border-t border-black/10 bg-linear-to-br from-zinc-50 via-zinc-100 to-pink-100/70 text-sm text-dark dark:border-white/10 dark:from-zinc-900 dark:via-zinc-900 dark:to-fuchsia-950/40 dark:text-light">
      <div className="flex w-full flex-wrap items-center gap-x-4 gap-y-3 px-4 py-4 sm:px-6 lg:px-10 lg:py-6">
        <div className="flex shrink-0 flex-row items-center">
          <span className="mr-3" aria-label="Copyright">
            &copy;{new Date().getFullYear()}
          </span>
          <Logo size={20} />
          <span className="ml-3">amir.sh</span>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <a
            className="hidden items-center gap-2 rounded-full border border-black/10 bg-white/40 px-3 py-2 text-xs text-dark transition-colors hover:bg-white/80 md:inline-flex dark:border-white/10 dark:bg-white/5 dark:text-light dark:hover:bg-white/10 [&_svg]:size-4"
            href="https://github.com/amirardalan/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View portfolio source on GitHub (opens in a new tab)"
          >
            <span aria-hidden="true">
              <IconGithub />
            </span>
            Source
            <span aria-hidden="true">↗</span>
          </a>
          <a
            href="mailto:hi@amir.sh"
            aria-label="Email Amir at hi@amir.sh"
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-full border border-black/10 bg-white/50 px-4 py-2 text-xs tracking-wide text-primary transition-colors hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
          >
            Get in touch
            <span
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

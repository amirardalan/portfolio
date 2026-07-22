import IconGithub from '@/components/icons/IconGithub';
import ThemeMenu from '@/components/ui/ThemeMenu';

export default function HeaderExternalLinks() {
  return (
    <div
      className="flex shrink-0 items-center gap-2 pr-20 md:pr-0"
      role="group"
      aria-label="External links and site controls"
    >
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
      <ThemeMenu />
    </div>
  );
}

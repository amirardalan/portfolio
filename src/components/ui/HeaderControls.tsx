import IconGithub from '@/components/icons/IconGithub';
import Tooltip from '@/components/ui/Tooltip';
import ThemeMenu from '@/components/ui/ThemeMenu';

export default function HeaderExternalLinks() {
  return (
    <div
      className="flex shrink-0 items-center gap-1 pr-20 md:pr-0"
      role="group"
      aria-label="External links and site controls"
    >
      <Tooltip text="View source" pos="b">
        <a
          className="inline-flex size-10 items-center justify-center rounded-full text-dark transition-colors hover:bg-zinc-200/70 dark:text-light dark:hover:bg-zinc-800/80"
          href="https://github.com/amirardalan/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View portfolio source on GitHub"
        >
          <IconGithub />
        </a>
      </Tooltip>
      <ThemeMenu />
    </div>
  );
}

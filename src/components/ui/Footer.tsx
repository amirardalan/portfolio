import { NavLinks } from '@/components/ui/Navigation';
import Logo from '@/components/ui/Logo';

export default async function Footer() {
  return (
    <footer
      className="z-10 border-t border-black/10 bg-gradient-to-br from-zinc-50 via-zinc-100 to-pink-100/70 text-sm text-dark dark:border-white/10 dark:from-zinc-900 dark:via-zinc-900 dark:to-fuchsia-950/40 dark:text-light"
      role="contentinfo"
    >
      <div className="flex w-full flex-row items-center px-6 py-4 lg:px-10 lg:py-6">
        <div className="mr-6 flex flex-row items-center">
          <span className="mr-4" aria-label="Copyright">
            &copy;{new Date().getFullYear()}
          </span>
          <Logo size={20} />
          <span className="ml-4">amir.sh</span>
        </div>
        <div className="hidden md:flex">
          <span aria-hidden="true">•</span>
          <nav className="ml-6" aria-label="Footer navigation">
            <NavLinks variant="footer" />
          </nav>
        </div>
      </div>
    </footer>
  );
}

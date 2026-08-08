import Logo from '@/components/ui/Logo';
import ActionArrow from '@/components/ui/ActionArrow';

export default async function Footer() {
  return (
    <footer className="bg-primary z-10 text-light dark:text-dark">
      <div className="mx-auto grid w-full max-w-[1440px] sm:grid-cols-2 lg:grid-cols-12">
        <div className="col-span-full flex min-h-40 flex-col justify-between border-b border-light/25 p-6 sm:p-8 lg:col-span-6 lg:border-r lg:border-b-0 lg:px-10 lg:py-8 dark:border-dark/25">
          <div className="text-xxs flex items-center font-sans tracking-wider uppercase">
            <span>
              <span className="font-mono text-[0.6875rem]">00 /</span> ID
            </span>
          </div>

          <div className="mt-10 flex items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-4">
                <Logo size={24} inverted />
                <span className="font-editorial text-3xl font-medium tracking-tight">
                  amir.sh
                </span>
              </div>
              <p className="text-xxs mt-3 font-sans tracking-wider uppercase opacity-65">
                Amir Ardalan / Design Engineer
              </p>
            </div>
            <span className="font-mono text-xs opacity-65" aria-label="Copyright">
              &copy; {new Date().getFullYear()}
            </span>
          </div>
        </div>

        <a
          className="group flex min-h-40 flex-col justify-between border-b border-light/25 p-6 transition-colors hover:bg-light/10 sm:border-r sm:border-b-0 sm:p-8 lg:col-span-3 dark:border-dark/25 dark:hover:bg-dark/10"
          href="https://github.com/amirardalan/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View portfolio source on GitHub (opens in a new tab)"
        >
          <span className="text-xxs flex items-center font-sans tracking-wider uppercase">
            <span>
              <span className="font-mono text-[0.6875rem]">01 /</span> Repo
            </span>
          </span>
          <span>
            <span className="font-editorial flex items-end justify-between gap-6 text-xl font-medium">
              Source code
              <ActionArrow direction="external" />
            </span>
            <span className="text-xxs mt-3 block font-sans tracking-wider uppercase opacity-65">
              Public / GitHub
            </span>
          </span>
        </a>

        <a
          href="mailto:hi@amir.sh"
          aria-label="Email Amir at hi@amir.sh"
          className="group flex min-h-40 flex-col justify-between p-6 transition-colors hover:bg-light/10 sm:p-8 lg:col-span-3 dark:hover:bg-dark/10"
        >
          <span className="text-xxs flex items-center font-sans tracking-wider uppercase">
            <span>
              <span className="font-mono text-[0.6875rem]">02 /</span> Contact
            </span>
          </span>
          <span>
            <span className="font-editorial flex items-end justify-between gap-6 text-xl font-medium">
              Get in touch
              <span
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </span>
            <span className="text-xxs mt-3 block font-sans tracking-wider uppercase opacity-65">
              Email
            </span>
          </span>
        </a>
      </div>
    </footer>
  );
}

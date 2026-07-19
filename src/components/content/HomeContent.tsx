import TypingAnimation from '@/components/content/TypingAnimation';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function HomeContent() {
  return (
    <section
      className="animate-fade-in pointer-events-none z-20 mt-[10%] flex w-full flex-col items-start p-6 md:ml-10 md:p-10 lg:p-20"
      aria-label="Home page introduction"
      role="region"
    >
      <div
        className="items-left pointer-events-auto mb-4 flex justify-start space-x-2 text-left text-2xl lg:mb-8"
        aria-live="polite"
      >
        <TypingAnimation />
      </div>
      <div className="pointer-events-auto mt-8 flex flex-col">
        <h1
          className="text-5xl font-medium tracking-wide text-dark sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl dark:text-light"
          id="page-title"
        >
          Amir Ardalan
        </h1>
        <h2
          className="my-2 text-sm font-medium uppercase tracking-widest text-zinc-600 sm:text-md md:text-xl lg:my-5 lg:text-2xl dark:text-zinc-400"
          id="page-subtitle"
        >
          Design Engineer
        </h2>
        <nav className="mt-8 flex space-x-4" aria-label="Main navigation">
          <Link href="/blog" aria-label="Read my blog posts">
            <Button text="Blog" variant="primary" size="large" />
          </Link>
          <Link href="/about" aria-label="Learn more about me">
            <Button text="About" variant="secondary" size="large" />
          </Link>
        </nav>
      </div>
    </section>
  );
}

import Container from '@/components/content/Container';
import SectionGlyph from '@/components/ui/SectionGlyph';

const process = [
  {
    number: '01',
    title: 'Pay attention',
    body: 'Start with people, context, goals, and constraints. Treat early assumptions as provisional and stay alert to what changes.',
  },
  {
    number: '02',
    title: 'Make to learn',
    body: 'Sketches, prototypes, and code make ideas concrete enough to observe and respond to. They reveal directions without forcing a single answer.',
  },
  {
    number: '03',
    title: 'Put it in motion',
    body: 'Take the strongest direction into production. Watch what happens, learn from it, and begin again.',
  },
];

const principles = [
  {
    title: 'Care is in the details',
    body: 'Clarity, consistency, and accessibility show people that their time and attention matter.',
  },
  {
    title: 'Leave room',
    body: 'Structure can offer direction while leaving room for people to find their own way.',
  },
  {
    title: 'Code is a design material',
    body: 'Working in code can be a useful way to explore how an idea behaves and responds in use.',
  },
  {
    title: 'Work in the open',
    body: 'Share work early, explain tradeoffs clearly, and make space for better ideas.',
  },
];

const links = [
  { label: 'Email', href: 'mailto:hello@amir.sh' },
  { label: 'GitHub', href: 'https://github.com/amirardalan' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/amirardalan' },
  { label: 'X', href: 'https://x.com/amirardalan' },
];

export default function About() {
  return (
    <Container>
      <article className="pb-10 pt-16 text-dark lg:pb-16 lg:pt-24 dark:text-light">
        <header>
          <p className="flex items-center gap-2.5 text-xxs uppercase tracking-[0.22em] text-primary">
            <SectionGlyph /> About
          </p>
          <h1 className="mt-6 text-balance font-serif text-4xl font-normal italic leading-tight sm:text-5xl lg:text-6xl">
            I’m Amir, a Design Engineer. I design products and build them.
          </h1>
          <div className="mt-7 space-y-4 text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-300">
            <p>
              I like being involved early, while a product is still taking shape. I work across interaction design and frontend engineering, using each to inform the other.I care about clarity, intrigue, thoughtful details, and software that respects the people using it.

            </p>
            <p>
              I care about clarity, intrigue, thoughtful details, and software that respects the people using it.
            </p>
          </div>
        </header>

        <section className="mt-12 lg:mt-16" aria-labelledby="process-heading">
          <div className="rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-fuchsia-950/40 p-6 text-light sm:p-8 dark:to-fuchsia-950/25">
            <p className="flex items-center gap-2.5 text-xxs uppercase tracking-[0.22em] text-zinc-400">
              <SectionGlyph className="text-[var(--color-primary-dark)]" /> How
              I work
            </p>
            <h2
              id="process-heading"
              className="mt-4 max-w-2xl text-3xl font-medium leading-snug sm:mx-2 sm:text-4xl"
            >
              I keep possibilities open and the work grounded.
            </h2>

            <ol className="mt-8 sm:mx-2">
              {process.map((step) => (
                <li
                  key={step.number}
                  className="grid gap-3 border-t border-white/10 py-6 first:border-t-0 sm:grid-cols-[3rem_1fr] sm:items-baseline sm:gap-5"
                >
                  <span className="font-mono text-xs text-[var(--color-primary-dark)] sm:relative sm:-top-0.5">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium sm:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-zinc-300">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="mt-12 lg:mt-16"
          aria-labelledby="principles-heading"
        >
          <p
            id="principles-heading"
            className="flex items-center gap-2.5 text-xxs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400"
          >
            <SectionGlyph /> Principles
          </p>
          <div className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2 sm:gap-y-8">
            {principles.map((principle) => (
              <div key={principle.title}>
                <h3 className="text-sm uppercase tracking-wide text-primary">
                  {principle.title}
                </h3>
                <p className="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="mt-14 border-t border-zinc-200 pt-6 lg:mt-20 lg:pt-8 dark:border-zinc-800"
          aria-labelledby="experience-heading"
        >
          <p className="flex items-center gap-2.5 text-xxs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
            <SectionGlyph /> Experience
          </p>
          <h2
            id="experience-heading"
            className="mt-4 text-balance text-2xl font-medium leading-snug sm:text-3xl"
          >
            Independent products and global brands.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-300">
            I’ve collaborated with teams at Nike’s LeBron James Innovation Center, Columbia Sportswear Company, Mountain Hardwear, and KEEN Footwear.
          </p>
          <a
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 text-sm uppercase tracking-wide text-primary"
          >
            View my resume <span aria-hidden="true">↗</span>
          </a>
        </section>

        <section
          className="mt-10 border-t border-zinc-200 pt-5 lg:mt-14 lg:pt-6 dark:border-zinc-800"
          aria-labelledby="contact-heading"
        >
          <p
            id="contact-heading"
            className="flex items-center gap-2.5 text-xxs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400"
          >
            <SectionGlyph /> Get in touch
          </p>
          <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3 text-xs uppercase tracking-wide">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  link.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                className="text-primary"
              >
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>
      </article>
    </Container>
  );
}

import Container from '@/components/content/Container';

const process = [
  {
    number: '01',
    title: 'Pay attention',
    body: 'I start with people, context, goals, and constraints. I treat early assumptions as provisional and stay alert to what changes.',
  },
  {
    number: '02',
    title: 'Make to learn',
    body: 'Sketches, prototypes, and code give me something concrete to observe and respond to. They open up possibilities without forcing a single answer.',
  },
  {
    number: '03',
    title: 'Commit with care',
    body: 'When a direction holds up, I carry it into production with attention to accessibility, performance, and edge cases.',
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
    body: 'Real content and behavior reveal possibilities that static designs cannot.',
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
          <p className="text-xxs uppercase tracking-[0.22em] text-primary">
            About me
          </p>
          <h1 className="mt-6 text-balance font-serif text-4xl font-normal italic leading-tight sm:text-5xl lg:text-6xl">
            I’m Amir. I design products and build them.
          </h1>
          <div className="mt-7 space-y-4 text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-300">
            <p>
              I like being involved early, while a product is still taking
              shape. I work across interaction design and frontend engineering,
              using each to make the other better.
            </p>
            <p>
              I care about clarity, intrigue, thoughtful details, and software
              that respects the people using it.
            </p>
          </div>
        </header>

        <section
          className="mt-14 border-t border-zinc-200 pt-6 lg:mt-20 lg:pt-8 dark:border-zinc-800"
          aria-labelledby="process-heading"
        >
          <p className="text-xxs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
            How I work
          </p>
          <h2
            id="process-heading"
            className="mt-4 max-w-2xl text-3xl font-medium leading-snug sm:text-4xl"
          >
            I keep the possibilities open and the work grounded.
          </h2>

          <ol className="mt-8">
            {process.map((step) => (
              <li
                key={step.number}
                className="grid gap-3 border-t border-zinc-200 py-6 sm:grid-cols-[3rem_1fr] sm:items-baseline sm:gap-5 dark:border-zinc-800"
              >
                <span className="font-mono text-xs text-primary sm:relative sm:-top-0.5">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-lg font-medium sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="mt-12 border-t border-zinc-200 pt-6 lg:mt-16 lg:pt-8 dark:border-zinc-800"
          aria-labelledby="principles-heading"
        >
          <p
            id="principles-heading"
            className="text-xxs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400"
          >
            Principles
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
          <p className="text-xxs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
            Experience
          </p>
          <h2
            id="experience-heading"
            className="mt-4 text-balance text-2xl font-medium leading-snug sm:text-3xl"
          >
            Independent products and global brands.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-300">
            I’ve worked with Nike’s LeBron James Innovation Center, Columbia
            Sportswear, and KEEN Footwear in collaboration with BASIC/DEPT®. I
            also build independent products from initial idea to working
            software.
          </p>
          <a
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 border-b-2 border-primary pb-2 text-sm uppercase tracking-wide text-primary"
          >
            View my resume <span aria-hidden="true">↗</span>
          </a>
        </section>

        <section
          className="mt-14 border-t border-zinc-200 pt-6 lg:mt-20 lg:pt-8 dark:border-zinc-800"
          aria-labelledby="contact-heading"
        >
          <p className="text-xxs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
            Get in touch
          </p>
          <h2
            id="contact-heading"
            className="mt-4 text-2xl font-medium sm:text-3xl"
          >
            Have an interesting problem?
          </h2>
          <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-300">
            I’m always glad to hear about a thoughtful product or a hard
            problem.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4 text-sm uppercase tracking-wide">
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

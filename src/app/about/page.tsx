import ActionArrow from '@/components/ui/ActionArrow';
import SectionGlyph from '@/components/ui/SectionGlyph';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Amir Ardalan',
  description:
    'About Amir Ardalan, a design engineer working across interaction design and frontend engineering.',
  alternates: {
    canonical: '/about',
  },
};

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
    number: '01',
    title: 'Care is in the details',
    body: 'Clarity, consistency, and accessibility show people that their time and attention matter.',
  },
  {
    number: '02',
    title: 'Leave room',
    body: 'Structure can offer direction while leaving room for people to find their own way.',
  },
  {
    number: '03',
    title: 'Code is a design material',
    body: 'Working in code can be a useful way to explore how an idea behaves and responds in use.',
  },
  {
    number: '04',
    title: 'Work in the open',
    body: 'Share work early, explain tradeoffs clearly, and make space for better ideas.',
  },
];

const links = [
  { label: 'Email', href: 'mailto:hi@amir.sh', type: 'email' },
  { label: 'GitHub', href: 'https://github.com/amirardalan', type: 'external' },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/amirardalan',
    type: 'external',
  },
  { label: 'X', href: 'https://x.com/amirardalan', type: 'external' },
] as const;

export default function About() {
  return (
    <article className="text-dark w-full dark:text-light">
      <header className="mx-auto w-full max-w-[1440px] px-6 pt-32 pb-14 md:px-10 md:pt-40 md:pb-16 lg:px-16 lg:pt-44">
        <div className="flex items-center justify-between pb-4">
          <p className="text-primary text-xxs flex items-center gap-2.5 font-sans tracking-[0.22em] uppercase">
            <SectionGlyph /> Profile / About
          </p>
          <span className="text-xxs font-mono text-zinc-400 dark:text-zinc-600">
            01 — 05
          </span>
        </div>

        <div className="grid gap-y-12 pt-10 md:grid-cols-12 md:gap-x-8 md:pt-14 lg:gap-x-12">
          <div className="md:col-span-8 lg:col-span-9">
            <h1 className="font-editorial max-w-5xl text-5xl leading-none font-medium tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl">
              I’m Amir.
              <br />I turn ideas into working products.
            </h1>
          </div>

          <aside
            aria-label="Practice summary"
            className="flex self-stretch flex-col justify-between gap-8 py-1 md:col-span-4 lg:col-span-3"
          >
            <div>
              <p className="text-xxs font-sans tracking-[0.16em] text-zinc-500 uppercase dark:text-zinc-400">
                Focus
              </p>
              <p className="font-editorial mt-2 text-lg leading-snug font-normal tracking-tight">
                Product design &amp; frontend engineering
              </p>
            </div>

            <div>
              <p className="text-xxs font-sans tracking-[0.16em] text-zinc-500 uppercase dark:text-zinc-400">
                Strength
              </p>
              <p className="font-editorial mt-2 text-lg leading-snug font-normal tracking-tight">
                Prototyping complex interactions
              </p>
            </div>

            <div>
              <p className="text-xxs font-sans tracking-[0.16em] text-zinc-500 uppercase dark:text-zinc-400">
                Scope
              </p>
              <p className="font-editorial mt-2 text-lg leading-snug font-normal tracking-tight">
                Early product direction to production code
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-12 grid gap-y-8 border-t border-zinc-300 pt-10 md:mt-16 md:grid-cols-12 md:gap-x-8 md:pt-12 lg:gap-x-12 dark:border-zinc-700">
          <p className="font-editorial max-w-xl text-2xl leading-tight font-normal tracking-tight text-zinc-800 md:col-span-5 md:text-3xl dark:text-zinc-200">
            I like being involved early, while a product is still taking shape.
          </p>
          <p className="font-editorial max-w-3xl text-lg leading-relaxed font-normal text-zinc-600 md:col-start-7 md:col-span-6 md:text-xl dark:text-zinc-300">
            I work across interaction design and frontend engineering, using
            each to inform the other. I care about clarity, intrigue, thoughtful
            details, and software that respects the people using it.
          </p>
        </div>
      </header>

      <section
        aria-labelledby="process-heading"
        className="bg-primary text-light dark:text-dark"
      >
        <div className="mx-auto max-w-[1440px] px-6 pt-14 pb-12 md:px-10 md:pt-20 md:pb-16 lg:px-16 lg:pt-24 lg:pb-20">
          <div className="border-light dark:border-dark flex items-center justify-between border-b-3 pb-4">
            <p className="text-xxs flex items-center gap-2.5 font-sans tracking-[0.22em] uppercase">
              <SectionGlyph className="text-current" /> How I work
            </p>
            <span className="text-xxs font-mono opacity-60">02 — 05</span>
          </div>

          <div className="grid pt-9 md:grid-cols-12 md:gap-x-8 md:pt-12 lg:gap-x-12">
            <div className="md:col-span-5">
              <h2
                id="process-heading"
                className="font-editorial max-w-xl text-4xl leading-none font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl"
              >
                I keep possibilities open and the work grounded.
              </h2>
            </div>

            <ol className="mt-12 md:col-span-7 md:mt-0">
              {process.map((step) => (
                <li
                  key={step.number}
                  className="grid gap-5 border-b border-light/25 py-7 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-12 sm:gap-6 md:py-8 md:first:pt-0 md:last:pb-0 dark:border-dark/25"
                >
                  <span className="text-xxs font-mono tabular-nums opacity-60 sm:col-span-2">
                    {step.number} /
                  </span>
                  <div className="sm:col-span-10">
                    <h3 className="font-editorial text-2xl leading-tight font-medium tracking-tight md:text-3xl">
                      {step.title}
                    </h3>
                    <p className="font-editorial mt-3 max-w-2xl text-base leading-relaxed opacity-75 md:text-lg">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="principles-heading">
        <div className="mx-auto max-w-[1440px] px-6 pt-14 md:px-10 md:pt-20 lg:px-16 lg:pt-24">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
            <h2
              id="principles-heading"
              className="text-xxs flex items-center gap-2.5 font-sans tracking-[0.22em] text-zinc-500 uppercase dark:text-zinc-400"
            >
              <SectionGlyph /> Principles
            </h2>
            <span className="text-xxs font-mono text-zinc-400 dark:text-zinc-600">
              03 — 05
            </span>
          </div>

          <div className="grid md:grid-cols-2">
            {principles.map((principle, index) => (
              <article
                key={principle.number}
                className={`flex flex-col border-zinc-200 py-8 md:py-10 dark:border-zinc-800 ${
                  index % 2 === 0
                    ? 'md:border-r md:pr-10 lg:pr-14'
                    : 'md:pl-10 lg:pl-14'
                } ${index < 2 ? 'border-b' : ''} ${
                  index === 2 ? 'border-b md:border-b-0' : ''
                }`}
              >
                <span className="text-xxs font-mono text-zinc-400 tabular-nums dark:text-zinc-600">
                  {principle.number} /
                </span>
                <div className="mt-8 md:mt-10">
                  <h3 className="font-editorial text-3xl leading-tight font-medium tracking-tight md:text-4xl">
                    {principle.title}
                  </h3>
                  <p className="font-editorial mt-4 max-w-xl text-base leading-relaxed text-zinc-600 md:text-lg dark:text-zinc-300">
                    {principle.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="experience-heading"
        className="border-t border-zinc-200 dark:border-zinc-800"
      >
        <div className="mx-auto grid max-w-[1440px] md:grid-cols-12">
          <div className="px-6 py-14 md:col-span-7 md:px-10 md:py-20 lg:col-span-8 lg:px-16 lg:py-24">
            <p className="text-xxs flex items-center gap-2.5 font-sans tracking-[0.22em] text-zinc-500 uppercase dark:text-zinc-400">
              <SectionGlyph /> Experience &amp; Resume
            </p>
            <h2
              id="experience-heading"
              className="font-editorial mt-8 max-w-4xl text-4xl leading-none font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              Independent products and global brands.
            </h2>
            <p className="font-editorial mt-7 max-w-3xl text-lg leading-relaxed text-zinc-600 md:text-xl dark:text-zinc-300">
              I’ve collaborated with teams at Nike’s LeBron James Innovation
              Center, Columbia Sportswear Company, Mountain Hardwear, and KEEN
              Footwear.
            </p>
          </div>

          <div className="p-6 text-dark md:col-span-5 md:px-8 md:pt-20 md:pb-8 lg:col-span-4 lg:px-10 lg:pt-24 lg:pb-10 dark:text-light">
            <div className="flex flex-col">
              <span className="text-xxs self-end font-mono text-zinc-400 dark:text-zinc-600">
                04 — 05
              </span>

              <div className="mt-9">
                <p className="font-editorial text-4xl leading-none font-medium tracking-tight">
                  Career overview
                </p>
                <p className="text-xxs mt-3 font-sans tracking-[0.16em] text-zinc-500 uppercase dark:text-zinc-400">
                  Roles / Collaborations / Capabilities
                </p>
              </div>

              <a
                href="/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-primary mt-5 inline-flex min-h-11 items-center justify-between gap-3 font-mono text-xxs font-medium tracking-[0.12em] uppercase"
              >
                <span>View resume</span>
                <ActionArrow direction="external" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="contact-heading"
        className="border-t border-zinc-200 dark:border-zinc-800"
      >
        <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-10 md:py-20 lg:px-16 lg:py-24">
          <div className="grid md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
            <div className="md:col-span-5">
              <p className="text-xxs flex items-center gap-2.5 font-sans tracking-[0.22em] text-zinc-500 uppercase dark:text-zinc-400">
                <SectionGlyph /> Get in touch
              </p>
              <h2
                id="contact-heading"
                className="font-editorial mt-7 text-4xl leading-none font-medium tracking-tight sm:text-5xl"
              >
                Get in touch.
              </h2>
            </div>

            <div className="mt-12 md:col-span-7 md:mt-0">
              <span className="text-xxs block text-right font-mono text-zinc-400 dark:text-zinc-600">
                05 — 05
              </span>
              <div className="mt-7">
                {links.map((link, index) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.type === 'external' ? '_blank' : undefined}
                    rel={
                      link.type === 'external'
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="group text-primary flex min-h-16 items-center justify-between gap-6 border-b border-zinc-300 font-mono text-xxs font-medium tracking-[0.12em] uppercase last:border-b-0 dark:border-zinc-700"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="text-zinc-400 tabular-nums dark:text-zinc-600">
                        {String(index + 1).padStart(2, '0')} /
                      </span>
                      {link.label}
                    </span>
                    <ActionArrow
                      direction={
                        link.type === 'external' ? 'external' : 'right'
                      }
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

import ActionArrow from '@/components/ui/ActionArrow';
import SectionGlyph from '@/components/ui/SectionGlyph';
import TerrainHero from '@/components/content/TerrainHero';
import Link from 'next/link';
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
    title: 'Understand the context',
    body: 'Start with people, goals, constraints, and what needs to change. Treat early assumptions as provisional before reaching for a solution.',
  },
  {
    number: '02',
    title: 'Make it tangible',
    body: 'Sketches, prototypes, and code turn ideas into something that can be examined. They make it easier to compare directions and find what is worth pursuing.',
  },
  {
    number: '03',
    title: 'Put it in motion',
    body: 'Take the strongest direction into production. Watch how it holds up in real use, then feed what you learn back into the work.',
  },
];

const principles = [
  {
    number: '01',
    title: 'Start with the problem',
    body: 'Understand what needs to change before reaching for a solution. Let the technical architecture and visual language follow from there.',
  },
  {
    number: '02',
    title: 'Shape the relationship',
    body: 'Some interfaces should feel like appliances that get out of the way. Others should feel like instruments that invite exploration and reward time spent with them.',
  },
  {
    number: '03',
    title: 'Design in code',
    body: 'Code is not the last step after design. Starting in code reveals a branching set of decisions and interactions in real time, right where the product will live.',
  },
  {
    number: '04',
    title: 'Close the loop',
    body: 'The first version is a question, not a conclusion. Ship it, pay attention to what happens, and let real use inform what comes next.',
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
      <header>
        <TerrainHero eyebrow="Profile / About" compact>
          <div className="grid gap-y-8 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
            <div className="md:col-span-8 lg:col-span-9">
              <h1 className="font-editorial max-w-5xl text-5xl leading-none font-medium tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl">
                I’m Amir.
                <br />I turn ideas into working products.
              </h1>
            </div>

            <aside
              aria-label="Practice summary"
              className="grid self-stretch divide-y divide-zinc-300 md:col-span-4 md:flex md:flex-col md:justify-between md:gap-8 md:divide-y-0 md:py-1 lg:col-span-3 dark:divide-zinc-700"
            >
              <div className="grid grid-cols-4 gap-4 py-4 md:block md:py-0">
                <p className="text-xxs col-span-1 pt-1 font-sans tracking-[0.16em] text-zinc-500 uppercase md:pt-0 dark:text-zinc-400">
                  Focus
                </p>
                <p className="font-editorial col-span-3 text-base leading-snug font-normal tracking-tight md:mt-2 md:text-lg">
                  Product design and interface engineering
                </p>
              </div>

              <div className="grid grid-cols-4 gap-4 py-4 md:block md:py-0">
                <p className="text-xxs col-span-1 pt-1 font-sans tracking-[0.16em] text-zinc-500 uppercase md:pt-0 dark:text-zinc-400">
                  Strength
                </p>
                <p className="font-editorial col-span-3 text-base leading-snug font-normal tracking-tight md:mt-2 md:text-lg">
                  Seeing the whole system and making the details work
                </p>
              </div>

              <div className="grid grid-cols-4 gap-4 py-4 md:block md:py-0">
                <p className="text-xxs col-span-1 pt-1 font-sans tracking-[0.16em] text-zinc-500 uppercase md:pt-0 dark:text-zinc-400">
                  Range
                </p>
                <p className="font-editorial col-span-3 text-base leading-snug font-normal tracking-tight md:mt-2 md:text-lg">
                  Early product direction through production code
                </p>
              </div>
            </aside>
          </div>

        </TerrainHero>
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
            <span className="text-xxs font-mono opacity-60">01 — 05</span>
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
              02 — 05
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
        aria-labelledby="uses-link-heading"
        className="border-t border-zinc-200 dark:border-zinc-800"
      >
        <Link
          href="/uses"
          className="group mx-auto flex min-h-24 max-w-360 items-center justify-between gap-8 px-6 py-6 md:grid md:grid-cols-12 md:px-10 lg:px-16"
        >
          <div className="flex min-w-0 items-center gap-6 md:col-span-7 md:gap-10 lg:col-span-8">
            <h2
              id="uses-link-heading"
              className="text-xxs flex shrink-0 items-center gap-2.5 font-sans tracking-[0.22em] text-zinc-500 uppercase dark:text-zinc-400"
            >
              <SectionGlyph /> Toolkit
            </h2>
            <p className="font-editorial hidden truncate text-base text-zinc-600 sm:block dark:text-zinc-300">
              Hardware, software, equipment, and tools I use.
            </p>
          </div>

          <span className="text-primary flex shrink-0 items-center justify-between gap-8 font-mono text-xxs font-medium tracking-[0.12em] uppercase md:col-start-8 md:col-span-5 md:w-full md:pl-8 lg:col-start-9 lg:col-span-4 lg:pl-10">
            <span className="flex items-center gap-2.5 md:-translate-x-3 lg:translate-x-0">
              <span>View toolkit</span>
              <ActionArrow direction="right" />
            </span>
            <span className="text-xxs font-mono tracking-normal text-zinc-400 tabular-nums dark:text-zinc-600">
              03 — 05
            </span>
          </span>
        </Link>
      </section>

      <section
        aria-labelledby="experience-heading"
        className="relative border-t border-zinc-200 dark:border-zinc-800"
      >
        <span className="text-xxs absolute top-14 right-6 font-mono text-zinc-400 md:top-20 md:right-10 lg:top-24 lg:right-16 dark:text-zinc-600">
          04 — 05
        </span>
        <div className="mx-auto grid max-w-[1440px] md:grid-cols-12">
          <div className="px-6 py-14 md:col-span-7 md:px-10 md:py-20 lg:col-span-8 lg:px-16 lg:py-24">
            <div className="flex items-center justify-between">
              <p className="text-xxs flex items-center gap-2.5 font-sans tracking-[0.22em] text-zinc-500 uppercase dark:text-zinc-400">
                <SectionGlyph /> Experience &amp; Resume
              </p>
            </div>
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

          <div className="p-6 text-dark md:col-span-5 md:pr-10 md:pl-8 md:pt-20 md:pb-8 lg:col-span-4 lg:pr-16 lg:pl-10 lg:pt-24 lg:pb-10 dark:text-light">
            <div className="flex flex-col">
              <div className="mt-9">
                <p className="font-editorial text-4xl leading-none font-medium tracking-tight">
                  Selected experience
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
          <div className="flex items-center justify-between">
            <p className="text-xxs flex items-center gap-2.5 font-sans tracking-[0.22em] text-zinc-500 uppercase dark:text-zinc-400">
              <SectionGlyph /> Get in touch
            </p>
            <span className="text-xxs font-mono text-zinc-400 dark:text-zinc-600">
              05 — 05
            </span>
          </div>

          <div className="mt-7 grid md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
            <div className="md:col-span-5">
              <h2
                id="contact-heading"
                className="font-editorial text-4xl leading-none font-medium tracking-tight sm:text-5xl"
              >
                Get in touch.
              </h2>
            </div>

            <div className="mt-8 md:col-span-7 md:mt-0">
              <div>
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

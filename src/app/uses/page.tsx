import UsesItemGrid from '@/components/content/UsesItemGrid';
import UsesItemCard from '@/components/content/UsesItemCard';
import TerrainHero from '@/components/content/TerrainHero';
import SectionGlyph from '@/components/ui/SectionGlyph';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Uses — Amir Ardalan',
  description: 'Hardware, software, and tools I use.',
  alternates: {
    canonical: '/uses',
  },
};

export default function Uses() {
  const computers = [
    {
      title: 'MacBook Pro',
      items: [
        { value: '14" / Silver' },
        { value: 'Apple M3 Pro' },
        { value: '12-core CPU / 18-core GPU' },
        { value: '36GB unified memory' },
        { value: '1TB SSD' },
        { value: 'macOS Tahoe' },
      ],
    },
    {
      title: 'Custom PC',
      items: [
        { value: 'Windows 11' },
        { value: 'NZXT H7 Flow w/ ARCTIC P14' },
        { value: 'Intel i7-14700KF 5.6GHz' },
        { value: 'MSI PRO Z790-A MAX WIFI' },
        { value: 'Gigabyte RTX 4090 AERO OC 24GB' },
        { value: 'Corsair Vengeance DDR5-6400 CL32 64GB' },
        { value: 'Corsair RM1000x SHIFT 1000W' },
        { value: 'WD Black SN850X 4TB NVMe' },
        { value: 'DeepCool LT720' },
      ],
    },
    {
      title: 'ThinkPad T440s',
      items: [
        { value: 'Omarchy' },
        { value: '14"' },
        { value: 'Intel Core i5-4200U 2.6GHz' },
        { value: '12GB DDR3L' },
        { value: 'Samsung EVO 850 500GB' },
      ],
    },
    {
      title: 'ThinkPad X13 Gen 5',
      items: [
        { value: 'Omarchy' },
        { value: '13"' },
        { value: 'Intel® Core™ Ultra 7 165U' },
        { value: '32GB LPDDR5X 6400MHz' },
        { value: '512GB SSD' },
      ],
    },
  ];

  const peripherals = [
    {
      title: 'Desktop Setup',
      items: [
        { value: 'Alienware AW3423DW 34.2" 175Hz' },
        { value: 'DELL G2724D 27" 165Hz' },
        { value: 'Logitech G502 X LIGHTSPEED' },
        { value: 'Keychron K2 HE' },
      ],
    },
    {
      title: 'Headphones',
      items: [
        { value: 'Beyerdynamic DT 770 PRO' },
        { value: 'Beyerdynamic DT270 PRO' },
        { value: 'Apple AirPods Pro (Gen 2)' },
      ],
    },
    {
      title: 'Studio Audio',
      items: [{ value: 'MOTU Audio Express' }, { value: 'KRK VXT8' }],
    },
    {
      title: 'MIDI Controllers',
      items: [{ value: 'Korg nanoKONTROL 1' }, { value: 'Korg nanoPAD 1' }],
    },
  ];

  const software = [
    {
      title: 'Writing',
      items: [{ value: 'iA Writer' }],
    },
    {
      title: 'Notes',
      items: [{ value: 'Obsidian' }],
    },
    {
      title: 'Code',
      items: [{ value: 'Zed' }, { value: 'Neovim' }],
    },
    {
      title: 'Design',
      items: [{ value: 'Figma' }, { value: 'Aseprite' }],
    },
    {
      title: 'Music Production',
      items: [{ value: 'Ableton Live 12' }],
    },
    {
      title: 'Playback',
      items: [{ value: 'YouTube Music' }, { value: 'Apple Podcasts' }],
    },
  ];

  const tools = [
    {
      title: 'Coding Agent',
      items: [{ value: 'Codex CLI' }],
    },
    {
      title: 'Terminal',
      items: [{ value: 'Ghostty' }, { value: 'Yazi' }],
    },
  ];

  const sections = [
    {
      title: 'Computers',
      description: 'The machines I build and work on.',
      items: computers,
      itemLabel: 'specifications',
    },
    {
      title: 'Peripherals',
      description: 'Input, output, and audio equipment.',
      items: peripherals,
      itemLabel: 'peripherals',
    },
    {
      title: 'Software',
      description: 'Applications for writing, designing, coding, and listening.',
      items: software,
      itemLabel: 'software',
    },
    {
      title: 'Tools',
      description: 'The smaller utilities that keep the work moving.',
      items: tools,
      itemLabel: 'technology stack',
    },
  ];

  return (
    <article className="w-full text-dark dark:text-light">
      <header>
        <TerrainHero eyebrow="Index / Uses" counter="01 — 05">
          <div className="grid gap-y-8 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
            <h1 className="font-editorial max-w-5xl text-5xl leading-none font-medium tracking-tight text-balance sm:text-6xl md:col-span-9 md:text-7xl lg:text-8xl">
              The tools behind the work.
            </h1>
          </div>

          <div className="mt-8 grid gap-y-8 border-zinc-300 pt-6 md:mt-16 md:grid-cols-12 md:gap-x-8 md:border-t md:pt-12 lg:gap-x-12 dark:border-zinc-700">
            <p className="font-editorial max-w-xl text-2xl leading-tight font-normal tracking-tight text-zinc-800 md:col-span-5 md:text-3xl dark:text-zinc-200">
              A working inventory of the things I use every day.
            </p>
            <p className="font-editorial max-w-3xl text-lg leading-relaxed font-normal text-zinc-600 md:col-start-7 md:col-span-6 md:text-xl dark:text-zinc-300">
              Hardware, software, and small utilities for designing, building,
              writing, and making music.
            </p>
          </div>
        </TerrainHero>
      </header>

      {sections.map((section, sectionIndex) => {
        const sectionNumber = String(sectionIndex + 2).padStart(2, '0');
        const itemCount = section.items.reduce(
          (total, item) => total + item.items.length,
          0
        );

        return (
          <section
            key={section.title}
            aria-labelledby={`${section.title.toLowerCase()}-heading`}
            className="border-t border-zinc-200 dark:border-zinc-800"
          >
            <div className="mx-auto grid max-w-360 md:grid-cols-12">
              <div className="px-6 py-10 md:col-span-4 md:px-10 md:py-14 lg:px-16 lg:py-16">
                <div className="flex items-center justify-between">
                  <p className="text-xxs flex items-center gap-2.5 font-sans tracking-[0.22em] text-zinc-500 uppercase dark:text-zinc-400">
                    <SectionGlyph /> Inventory
                  </p>
                  <span className="text-xxs font-mono text-zinc-400 dark:text-zinc-600">
                    {sectionNumber} — 05
                  </span>
                </div>

                <h2
                  id={`${section.title.toLowerCase()}-heading`}
                  className="font-editorial mt-8 text-4xl leading-none font-medium tracking-tight sm:text-5xl"
                >
                  {section.title}
                </h2>
                <p className="font-editorial mt-4 max-w-sm text-base leading-relaxed text-zinc-600 md:text-lg dark:text-zinc-300">
                  {section.description}
                </p>
                <p className="text-xxs mt-8 font-sans tracking-[0.16em] text-zinc-500 uppercase dark:text-zinc-400">
                  <span className="font-mono tabular-nums">
                    {String(itemCount).padStart(2, '0')} /
                  </span>{' '}
                  Items listed
                </p>
              </div>

              <UsesItemGrid
                columns={2}
                className="border-t border-zinc-200 md:col-span-8 md:border-t-0 md:border-l dark:border-zinc-800"
                aria-labelledby={`${section.title.toLowerCase()}-heading`}
              >
                {section.items.map((item, itemIndex) => (
                  <UsesItemCard
                    key={item.title}
                    number={String(itemIndex + 1).padStart(2, '0')}
                    title={item.title}
                    items={item.items}
                    className={`border-zinc-200 p-6 md:p-8 lg:p-10 dark:border-zinc-800 ${
                      itemIndex < section.items.length - 1
                        ? 'border-b'
                        : ''
                    } ${
                      itemIndex >= section.items.length - 2
                        ? 'md:border-b-0'
                        : ''
                    } ${
                      itemIndex % 2 === 0
                        ? 'md:border-r'
                        : ''
                    }`}
                    aria-label={`${item.title} ${section.itemLabel}`}
                  />
                ))}
              </UsesItemGrid>
            </div>
          </section>
        );
      })}
    </article>
  );
}

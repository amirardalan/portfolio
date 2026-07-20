import Container from '@/components/content/Container';
import PageHeading from '@/components/ui/PageHeading';
import UsesItemGrid from '@/components/content/UsesItemGrid';
import UsesItemCard from '@/components/content/UsesItemCard';

export default function Uses() {
  const computers = [
    {
      title: 'MacBook Pro',
      items: [
        { value: 'macOS Tahoe' },
        { value: '14" M3 Pro' },
        { value: 'M3 Pro' },
        { value: '12-core CPU' },
        { value: '18-core GPU' },
        { value: '36GB RAM' },
        { value: '1TB SSD' },
        { value: 'Silver' },
      ],
    },
    {
      title: 'Desktop PC',
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
      title: 'PC',
      items: [
        { value: 'Alienware AW3423DW 34.2" 175Hz' },
        { value: 'Logitech G502 X LIGHTSPEED' },
        { value: 'Keychron K2 HE' },
      ],
    },
    {
      title: 'Headphones',
      items: [
        { value: 'Beyerdynamic DT 770 PRO' },
        { value: 'Sennheiser HD25-1 II' },
        { value: 'Apple AirPods Pro (Gen 2)' },
      ],
    },
    {
      title: 'Audio Interface & Monitors',
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
      items: [
        { value: 'Figma' },
        { value: 'Aseprite' },
        { value: 'Paper + pencil' },
      ],
    },
    {
      title: 'Music',
      items: [{ value: 'Ableton Live 12' }],
    },
    {
      title: 'Listening',
      items: [{ value: 'YouTube Music' }, { value: 'Apple Podcasts' }],
    },
  ];

  const tools = [
    {
      title: 'Code',
      items: [{ value: 'Codex' }],
    },
    {
      title: 'Shell',
      items: [{ value: 'Ghostty' }, { value: 'Yazi' }, { value: 'Neovim' }],
    },
  ];

  return (
    <Container>
      <div>
        <PageHeading title={'Uses'} />

        <section className="mb-10" aria-labelledby="computers-heading">
          <h2
            id="computers-heading"
            className="mb-5 border-b border-zinc-200 pb-3 text-lg font-medium text-dark dark:border-zinc-800 dark:text-light"
          >
            Computers
          </h2>
          <UsesItemGrid columns={2} aria-labelledby="computers-heading">
            {computers.map((item, index) => (
              <UsesItemCard
                key={index}
                title={item.title}
                items={item.items}
                aria-label={`${item.title} specifications`}
              />
            ))}
          </UsesItemGrid>
        </section>

        <section className="mb-10" aria-labelledby="peripherals-heading">
          <h2
            id="peripherals-heading"
            className="mb-5 border-b border-zinc-200 pb-3 text-lg font-medium text-dark dark:border-zinc-800 dark:text-light"
          >
            Peripherals
          </h2>
          <UsesItemGrid columns={2} aria-labelledby="peripherals-heading">
            {peripherals.map((item, index) => (
              <UsesItemCard
                key={`periph-${index}`}
                title={item.title}
                items={item.items}
                aria-label={`${item.title} peripherals`}
              />
            ))}
          </UsesItemGrid>
        </section>

        <section className="mb-10" aria-labelledby="software-heading">
          <h2
            id="software-heading"
            className="mb-5 border-b border-zinc-200 pb-3 text-lg font-medium text-dark dark:border-zinc-800 dark:text-light"
          >
            Software
          </h2>
          <UsesItemGrid columns={2} aria-labelledby="software-heading">
            {software.map((item, index) => (
              <UsesItemCard
                key={`software-${index}`}
                title={item.title}
                items={item.items}
                aria-label={`${item.title} software`}
              />
            ))}
          </UsesItemGrid>
        </section>

        <section className="mb-10" aria-labelledby="tools-heading">
          <h2
            id="tools-heading"
            className="mb-5 border-b border-zinc-200 pb-3 text-lg font-medium text-dark dark:border-zinc-800 dark:text-light"
          >
            Tools
          </h2>
          <UsesItemGrid columns={2} aria-labelledby="tools-heading">
            {tools.map((item, index) => (
              <UsesItemCard
                key={`tools-${index}`}
                title={item.title}
                items={item.items}
                aria-label={`${item.title} technology stack`}
              />
            ))}
          </UsesItemGrid>
        </section>
      </div>
    </Container>
  );
}

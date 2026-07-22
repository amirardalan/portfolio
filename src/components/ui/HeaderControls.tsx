import ThemeMenu from '@/components/ui/ThemeMenu';

export default function HeaderExternalLinks() {
  return (
    <div
      className="flex shrink-0 items-center gap-2 pr-20 md:pr-0"
      role="group"
      aria-label="Site controls"
    >
      <ThemeMenu />
    </div>
  );
}

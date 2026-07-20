interface SectionGlyphProps {
  className?: string;
}

export default function SectionGlyph({
  className = 'text-primary',
}: SectionGlyphProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className={`h-3 w-3 shrink-0 ${className}`}
      fill="none"
    >
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="6" cy="6" r="0.75" fill="currentColor" />
    </svg>
  );
}

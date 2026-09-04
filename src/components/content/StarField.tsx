const STAR_COUNT = 72;

const stars = Array.from({ length: STAR_COUNT }, (_, index) => ({
  x: (index * 37 + 11) % 100,
  y: (index * 53 + 7) % 94,
  size: index % 17 === 0 ? 2.25 : index % 5 === 0 ? 1.5 : 1,
  opacity: 0.5 + ((index * 29) % 46) / 100,
}));

export default function StarField({
  className = 'h-128 md:h-180',
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-0 z-0 hidden overflow-hidden dark:block ${className}`}
    >
      <div className="absolute inset-x-0 top-0 h-128 md:h-180">
        {stars.map((star, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-current text-zinc-600 dark:text-zinc-100"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              boxShadow:
                star.size > 1
                  ? '0 0 4px color-mix(in srgb, currentColor 55%, transparent)'
                  : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
}

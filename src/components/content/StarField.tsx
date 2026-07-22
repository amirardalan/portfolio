const STAR_COUNT = 72;

const stars = Array.from({ length: STAR_COUNT }, (_, index) => ({
  x: (index * 37 + 11) % 100,
  y: (index * 53 + 7) % 78,
  size: index % 17 === 0 ? 2.25 : index % 5 === 0 ? 1.5 : 1,
  opacity: 0.5 + ((index * 29) % 46) / 100,
}));

export default function StarField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden dark:block"
      style={{
        maskImage:
          'linear-gradient(to bottom, black 0%, black 18%, transparent 29%)',
      }}
    >
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
  );
}

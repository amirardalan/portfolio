import clsx from 'clsx';

type ActionArrowProps = {
  direction: 'down' | 'left' | 'right' | 'external';
};

const glyphs = {
  down: '↓',
  left: '←',
  right: '→',
};

const motion = {
  down: 'group-hover:translate-y-0.5',
  left: 'group-hover:-translate-x-0.5',
  right: 'group-hover:translate-x-0.5',
  external:
    'group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
};

export default function ActionArrow({ direction }: ActionArrowProps) {
  if (direction === 'external') {
    return (
      <span
        aria-hidden="true"
        className={clsx(
          'inline-flex size-3 shrink-0 items-center justify-center transition-transform',
          motion[direction]
        )}
      >
        <svg
          viewBox="0 0 12 12"
          className="size-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={clsx(
        'inline-block font-mono text-xxs leading-none font-normal transition-transform',
        motion[direction]
      )}
    >
      {glyphs[direction]}
    </span>
  );
}

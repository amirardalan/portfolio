import clsx from 'clsx';

type ActionArrowProps = {
  direction: 'down' | 'left' | 'right' | 'external';
};

const glyphs = {
  down: '↓',
  left: '←',
  right: '→',
  external: '↗',
};

const motion = {
  down: 'group-hover:translate-y-0.5',
  left: 'group-hover:-translate-x-0.5',
  right: 'group-hover:translate-x-0.5',
  external:
    'group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
};

export default function ActionArrow({ direction }: ActionArrowProps) {
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

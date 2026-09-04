type Item = {
  label?: string;
  value: string;
};

export type UsesItemCardProps = {
  title?: string;
  subtitle?: string;
  items?: Item[];
  className?: string;
  'aria-label'?: string;
};

const UsesItemCard = ({
  title,
  subtitle,
  items,
  className = '',
  'aria-label': ariaLabel,
}: UsesItemCardProps) => {
  return (
    <article className={`flex flex-col ${className}`} aria-label={ariaLabel}>
      {title && (
        <h3 className="font-editorial mt-7 text-2xl leading-tight font-medium tracking-tight text-dark md:text-3xl dark:text-light">
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="font-editorial mt-3 text-zinc-600 dark:text-zinc-300">
          {subtitle}
        </p>
      )}
      {items && items.length > 0 && (
        <ul className="mt-6 border-t border-zinc-200 dark:border-zinc-800">
          {items.map((item, index) => (
            <li
              key={index}
              className="font-editorial flex border-b border-zinc-200 py-2.5 text-sm leading-snug text-zinc-600 last:border-b-0 md:text-base dark:border-zinc-800 dark:text-zinc-300"
            >
              {item.label ? (
                <span className="flex">
                  <span className="sr-only">Type: </span>
                  {item.label}: <span className="ml-1">{item.value}</span>
                </span>
              ) : (
                <span>{item.value}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default UsesItemCard;

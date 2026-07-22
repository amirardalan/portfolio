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
    <div className={`mb-4 ${className}`} aria-label={ariaLabel} role="group">
      {title && <h3 className="mb-2 text-dark dark:text-light">{title}</h3>}
      {subtitle && <p className="text-dark dark:text-light">{subtitle}</p>}
      {items && items.length > 0 && (
        <ul className="list-none pl-0">
          {items.map((item, index) => (
            <li key={index} className="flex pt-1">
              {item.label ? (
                <span className="flex text-zinc-500 dark:text-zinc-400">
                  <span className="sr-only">Type: </span>
                  {item.label}: <span className="ml-1">{item.value}</span>
                </span>
              ) : (
                <span className="text-zinc-500 dark:text-zinc-400">
                  {item.value}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsesItemCard;

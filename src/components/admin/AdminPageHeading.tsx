type PageHeadingProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  action?: React.ReactNode;
};

export default function PageHeading({
  title,
  description,
  eyebrow = 'Content studio',
  action,
}: PageHeadingProps) {
  return (
    <div className="flex flex-col gap-5 pt-10 pb-8 md:flex-row md:items-end md:justify-between md:pt-14 md:pb-10">
      <div>
        <p className="text-xxs text-primary mb-3 tracking-[0.2em] uppercase">
          {eyebrow}
        </p>
        <h1 className="text-dark dark:text-light font-serif text-4xl leading-none font-normal tracking-tight text-balance italic md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed font-normal text-zinc-600 md:text-base dark:text-zinc-400">
            {description}
          </p>
        )}
      </div>
      {action && <div className="flex shrink-0 items-center">{action}</div>}
    </div>
  );
}

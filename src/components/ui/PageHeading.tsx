type PageHeadingProps = {
  title: string;
};

export default function PageHeading({ title }: PageHeadingProps) {
  return (
    <div className="mb-6 mt-12 flex w-full pb-2 text-md font-medium text-zinc-500 lg:mb-10 lg:mt-20 dark:text-zinc-400">
      <h1>{title}</h1>
    </div>
  );
}

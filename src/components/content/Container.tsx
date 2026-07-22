interface ContainerProps {
  children: React.ReactNode;
  size?: 'default' | 'wide';
  className?: string;
}

export default function Container({
  children,
  size = 'default',
  className = '',
}: ContainerProps) {
  // The root layout owns the page's main landmark.
  return (
    <div
      className={`container mx-auto max-h-fit flex-grow ${
        size === 'wide'
          ? 'max-w-[1200px] px-6 lg:px-10'
          : 'max-w-[736px] p-6 lg:p-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

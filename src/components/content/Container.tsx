interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  // The root layout owns the page's main landmark.
  return (
    <div className="container mx-auto max-h-fit max-w-[736px] flex-grow p-6 lg:p-8">
      {children}
    </div>
  );
}

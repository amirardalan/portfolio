interface IconEditProps {
  className?: string;
}

export default function IconEdit({ className = '' }: IconEditProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path d="m13.5 6.5 4 4" />
      <path d="M4 20l1.25-4.75L16.4 4.1a2.12 2.12 0 0 1 3 3L8.25 18.25 4 20Z" />
    </svg>
  );
}

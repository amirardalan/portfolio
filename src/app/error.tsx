'use client';

import { useEffect } from 'react';
import ErrorState from '@/components/content/ErrorState';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      code="500"
      eyebrow="Runtime error"
      heading="The system missed a beat."
      description="Something failed while assembling this page. Try the request again or return to the homepage."
      status="System / interrupted"
      primaryAction={{ label: 'Try again', onClick: reset }}
    />
  );
}

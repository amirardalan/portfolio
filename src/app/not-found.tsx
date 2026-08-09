import type { Metadata } from 'next';
import ErrorState from '@/components/content/ErrorState';

export const metadata: Metadata = {
  title: 'Page Not Found — Amir Ardalan',
};

export default function NotFoundPage() {
  return (
    <ErrorState
      code="404"
      eyebrow="Navigation error"
      heading="This route went off-grid."
      description="The address points somewhere this site doesn’t. Return to known ground or jump straight to the work."
      status="Coordinates / unresolved"
      primaryAction={{ label: 'Back home', href: '/' }}
    />
  );
}

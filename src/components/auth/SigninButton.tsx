import { signIn } from '@/lib/auth';
import Button from '@/components/ui/Button';

export default function SignInButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('github', { redirectTo: '/admin' });
      }}
    >
      <Button type="submit" text="Continue with GitHub" />
    </form>
  );
}

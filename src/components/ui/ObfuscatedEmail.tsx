'use client';

import { useState } from 'react';
import IconHide from '@/components/icons/IconHide';
import IconShow from '@/components/icons/IconShow';

interface ObfuscatedEmailProps {
  email: string;
}

export function ObfuscatedEmail({ email }: ObfuscatedEmailProps) {
  const [revealed, setRevealed] = useState(false);

  const obfuscateEmail = (email: string) => {
    const [username, domain] = email.split('@');
    if (!username || !domain) return email;

    const hiddenUsername =
      username.length > 1
        ? `${username.slice(0, 1)}${'*'.repeat(username.length - 1)}`
        : username;

    const [domainName, extension] = domain.split('.');
    if (!domainName || !extension) return `${hiddenUsername}@${domain}`;

    const hiddenDomain = `${domainName.slice(0, 1)}${'*'.repeat(domainName.length - 1)}.${extension}`;

    return `${hiddenUsername}@${hiddenDomain}`;
  };

  const toggleReveal = () => {
    setRevealed((prev) => !prev);
  };

  return (
    <button
      type="button"
      className="hover:border-primary flex min-h-10 flex-row items-center rounded-full border border-zinc-200 px-4 py-2 transition-colors dark:border-zinc-700"
      onClick={toggleReveal}
      aria-pressed={revealed}
      aria-label={revealed ? 'Hide email address' : 'Reveal email address'}
    >
      <span className="mr-2 h-4 w-4">
        {revealed ? <IconHide /> : <IconShow />}
      </span>
      <span
        className="text-dark dark:text-light font-mono text-xs font-normal"
        title={revealed ? 'Click to hide email' : 'Click to show full email'}
      >
        {revealed ? email : obfuscateEmail(email)}
      </span>
    </button>
  );
}

import { ReactNode } from 'react';
import IconNote from '@/components/icons/IconNote';
import IconTip from '@/components/icons/IconTip';
import IconWarn from '@/components/icons/IconWarn';
import IconImportant from '@/components/icons/IconImportant';

type NoteType = 'note' | 'tip' | 'warn' | 'important';

interface NoteProps {
  children: ReactNode;
  noteType?: NoteType;
}

export default function Note({ children, noteType = 'note' }: NoteProps) {
  const noteConfig = {
    note: {
      icon: <IconNote />,
      label: 'Note',
      color:
        'text-blue-500 fill-blue-500 dark:text-blue-400 dark:fill-blue-400',
    },
    tip: {
      icon: <IconTip />,
      label: 'Tip',
      color:
        'text-amber-500 fill-amber-500 dark:text-amber-400 dark:fill-amber-400',
    },
    warn: {
      icon: <IconWarn />,
      label: 'Warning',
      color: 'text-red-500 fill-red-500 dark:text-red-400 dark:fill-red-400',
    },
    important: {
      icon: <IconImportant />,
      label: 'Important',
      color:
        'text-purple-500 fill-purple-500 dark:text-purple-400 dark:fill-purple-400',
    },
  };

  const { icon, label, color } = noteConfig[noteType];

  return (
    <div className="note relative my-8 rounded-lg border border-zinc-300 px-5 pb-5 pt-10 sm:px-6 sm:pb-6 sm:pt-11 dark:border-zinc-700">
      <div className="absolute left-5 top-4 text-xxs uppercase sm:left-6">
        <div className={`flex items-center gap-1 ${color}`}>
          <div className="h-4 w-4">{icon}</div>
          <div>{label}</div>
        </div>
      </div>
      <div className="italic">{children}</div>
    </div>
  );
}

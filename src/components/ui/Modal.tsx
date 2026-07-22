import Button from '@/components/ui/Button';

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  confirmDisabled?: boolean;
  children?: React.ReactNode;
  buttons?: 'both' | 'cancel' | 'confirm';
  leftButton?: React.ReactNode;
  size?: 'default' | 'large';
}

export default function Modal({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
  confirmText = 'Confirm',
  confirmDisabled = false,
  children,
  buttons = 'both',
  leftButton,
  size = 'default',
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 p-6 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`bg-light w-full rounded-3xl border border-zinc-200 p-7 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900 ${
          size === 'large' ? 'max-w-4xl' : 'max-w-md'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          id="modal-title"
          className="dark:text-light mb-3 text-2xl font-medium text-zinc-900"
        >
          {title}
        </h3>
        <p className="mb-7 text-sm leading-relaxed font-normal text-zinc-600 dark:text-zinc-400">
          {message}
        </p>
        {children && <div className="mb-6">{children}</div>}{' '}
        <div className="flex justify-end space-x-3">
          <div>{leftButton}</div>
          <div className="flex space-x-3">
            {(buttons === 'both' || buttons === 'cancel') && (
              <Button
                type="button"
                onClick={onCancel}
                text={buttons === 'cancel' ? 'Close' : 'Cancel'}
                variant="secondary"
              />
            )}
            {buttons !== 'cancel' && (
              <Button
                type="button"
                onClick={onConfirm}
                text={confirmText}
                disabled={confirmDisabled}
                variant={buttons === 'both' ? 'danger' : 'primary'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

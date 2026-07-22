import Button from '@/components/ui/Button';

interface PostFormControlsProps {
  isSubmitting: boolean;
  hasUnsavedChanges: boolean;
  isDeleting?: boolean;
  showDiscard?: boolean;
  showDelete?: boolean;
  onDiscard?: () => void;
  onDelete?: () => void;
  onSubmitText: string;
  onDeleteText?: string;
}

export default function PostFormControls({
  isSubmitting,
  hasUnsavedChanges,
  isDeleting = false,
  showDiscard = false,
  showDelete = false,
  onDiscard,
  onDelete,
  onSubmitText,
  onDeleteText,
}: PostFormControlsProps) {
  const statusText = isSubmitting
    ? 'Saving changes…'
    : hasUnsavedChanges
      ? 'Unsaved changes'
      : 'No unsaved changes';

  return (
    <div className="bg-light/90 sticky bottom-4 z-20 mt-6 flex items-center justify-between gap-3 rounded-2xl border border-zinc-200 p-3 shadow-[0_16px_45px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/90">
      <div>
        {showDelete && onDelete && onDeleteText && (
          <Button
            type="button"
            onClick={onDelete}
            text={isDeleting ? 'Deleting...' : onDeleteText}
            disabled={isDeleting || isSubmitting}
            variant="danger"
          />
        )}
        {showDiscard && onDiscard && (
          <Button
            type="button"
            onClick={onDiscard}
            text="Discard"
            variant="secondary"
          />
        )}
      </div>
      <div className="flex items-center gap-5">
        <span
          className={`text-xxs hidden items-center gap-2 tracking-[0.12em] uppercase sm:inline-flex ${
            isSubmitting || hasUnsavedChanges
              ? 'text-primary'
              : 'text-zinc-500 dark:text-zinc-400'
          }`}
          aria-live="polite"
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isSubmitting
                ? 'bg-primary animate-pulse'
                : hasUnsavedChanges
                  ? 'bg-primary'
                  : 'bg-zinc-300 dark:bg-zinc-700'
            }`}
            aria-hidden="true"
          />
          {statusText}
        </span>
        <Button
          type="submit"
          text={isSubmitting ? `${onSubmitText}...` : onSubmitText}
          disabled={isSubmitting || isDeleting}
        />
      </div>
    </div>
  );
}

import IconX from '@/components/icons/IconX';

interface ShareOnXButtonProps {
  showText?: boolean;
}

export default function ShareOnXButton({
  showText = true,
}: ShareOnXButtonProps) {
  const handleShare = () => {
    const url = window.location.href;
    const shareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
  };

  return (
    <button
      onClick={handleShare}
      className="flex min-h-11 cursor-pointer items-center gap-2 px-2 font-mono text-xxs tracking-[0.1em] text-zinc-500 uppercase transition-opacity hover:opacity-70 dark:text-zinc-400"
      aria-label="Share on X"
    >
      <IconX size={18} aria-hidden="true" />
      {showText && <span>Share on X</span>}
    </button>
  );
}

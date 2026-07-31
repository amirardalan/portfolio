'use client';

import { useLikesStore } from '@/store/likes';
import LikeButton from '@/components/blog/LikeButton';
import LikeCount from '@/components/blog/LikeCount';
import ShareOnXButton from '@/components/blog/ShareOnXButton';
import Tooltip from '@/components/ui/Tooltip';

interface BlogSupportProps {
  postId: number;
}

export default function BlogSupport({ postId }: BlogSupportProps) {
  const { likes, initialLoadingStates } = useLikesStore();
  const count = likes[postId] || 0;
  const isLoading = initialLoadingStates[postId] !== false;

  return (
    <aside className="flex w-full items-center gap-2 px-6 py-5">
      <div className="flex w-full flex-col items-center justify-between sm:flex-row">
        <div className="flex items-center">
          <p className="font-editorial mb-4 text-sm font-normal text-zinc-500 sm:mb-0 dark:text-zinc-400">
            If this resonated, leave a signal.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xxs tracking-[0.1em] uppercase">
          <div className="flex items-center text-center">
            <Tooltip text="Like post" pos="l">
              <LikeButton postId={postId} showIcon={true}>
                <LikeCount count={count} isLoading={isLoading} />
              </LikeButton>
            </Tooltip>
          </div>
          <Tooltip text="Share on X" pos="l">
            <ShareOnXButton />
          </Tooltip>
        </div>
      </div>
    </aside>
  );
}

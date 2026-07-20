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
    <div className="mb-6 mt-12 flex w-full items-center gap-2 rounded-xl border border-zinc-300 p-5 sm:p-6 dark:border-zinc-700">
      <div className="flex w-full flex-col items-center justify-between sm:flex-row">
        <div className="flex items-center">
          <p className="mb-4 text-sm text-zinc-500 sm:mb-0 sm:text-lg dark:text-zinc-400">
            Enjoyed this? Like or share.
          </p>
        </div>

        <div className="flex items-center">
          <div className="mr-3 flex w-24 items-center text-center text-xs uppercase lg:mr-6">
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
    </div>
  );
}

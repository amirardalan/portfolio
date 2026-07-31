'use client';

import LikeButton from '@/components/blog/LikeButton';
import ShareOnXButton from '@/components/blog/ShareOnXButton';
import Tooltip from '@/components/ui/Tooltip';

interface SocialActionsProps {
  postId: number;
}

export default function SocialActions({ postId }: SocialActionsProps) {
  return (
    <div className="flex items-center gap-1">
      <Tooltip text="Like post" pos="b">
        <LikeButton
          postId={postId}
          showIcon={true}
          showCount={false}
          iconClassName="size-5.5 sm:size-6"
        />
      </Tooltip>
      <Tooltip text="Share on X" pos="b">
        <ShareOnXButton showText={false} />
      </Tooltip>
    </div>
  );
}

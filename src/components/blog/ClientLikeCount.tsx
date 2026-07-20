'use client';

import { useEffect } from 'react';
import { useLikesStore } from '@/store/likes';
import LikeCount from '@/components/blog/LikeCount';

interface ClientLikeCountProps {
  postId: number;
}

export default function ClientLikeCount({ postId }: ClientLikeCountProps) {
  const { likes, initialLoadingStates, error, fetchLikes } = useLikesStore();

  useEffect(() => {
    fetchLikes(postId);
  }, [fetchLikes, postId]);

  if (error[postId]) {
    return <div className="leading-none">Likes unavailable.</div>;
  }

  const count = likes[postId] || 0;

  const isLoading = initialLoadingStates[postId] !== false;

  return <LikeCount count={count} isLoading={isLoading} />;
}

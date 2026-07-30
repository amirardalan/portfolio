'use client';

import { useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { useLikesStore } from '@/store/likes';
import IconLike from '@/components/icons/IconLike';

interface LikeButtonProps {
  postId: number;
  children?: ReactNode;
  showIcon?: boolean;
  showCount?: boolean;
}

const FETCH_DEBOUNCE_TIME = 30000; // 30 seconds

export default function LikeButton({
  postId,
  children,
  showIcon = true,
  showCount = true,
}: LikeButtonProps) {
  const { updateLike, fetchLikes } = useLikesStore();
  const [isLiking, setIsLiking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [lastFetch, setLastFetch] = useState(0);

  useEffect(() => {
    const now = Date.now();
    if (now - lastFetch > FETCH_DEBOUNCE_TIME) {
      fetchLikes(postId);
      setLastFetch(now);
    }
  }, [fetchLikes, postId, lastFetch]);

  useEffect(() => {
    const likedPosts = JSON.parse(Cookies.get('likedPosts') || '{}');
    setIsLiked(!!likedPosts[postId]);
  }, [postId]);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);

    try {
      await updateLike(postId, !isLiked);

      const likedPosts = JSON.parse(Cookies.get('likedPosts') || '{}');
      if (!isLiked) {
        likedPosts[postId] = true;
      } else {
        delete likedPosts[postId];
      }
      Cookies.set('likedPosts', JSON.stringify(likedPosts));

      setIsLiked(!isLiked);

      setLastFetch(Date.now());
    } catch (error) {
      console.error('Error updating post like status:', error);
    } finally {
      setIsLiking(false);
    }
  };

  if (children) {
    return (
      <button
        onClick={handleLike}
        disabled={isLiking}
        className="flex min-h-11 cursor-pointer items-center gap-2 px-2 transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={isLiked ? 'Unlike post' : 'Like post'}
      >
        {showIcon && <IconLike active={isLiked} />}
        {showCount && children}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="self-start">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={isLiked ? 'Unlike post' : 'Like post'}
        >
          <IconLike active={isLiked} />
        </button>
      </div>
    </div>
  );
}

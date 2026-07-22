'use server';

import { getPublishedPostsCount, getDraftPostsCount } from '@/db/queries/posts';
import { getAuthorizedSession } from '@/lib/auth';

// Interface for the return type
interface PostCounts {
  publishedCount: number;
  draftCount: number;
}

export async function getPostCounts(): Promise<PostCounts> {
  const session = await getAuthorizedSession();
  if (!session) {
    throw new Error('Not authenticated');
  }

  try {
    // Fetch counts in parallel
    const [publishedCount, draftCount] = await Promise.all([
      getPublishedPostsCount(),
      getDraftPostsCount(),
    ]);
    return { publishedCount, draftCount };
  } catch (error) {
    console.error('Error fetching post counts via server action:', error);
    // Re-throw or return a specific error structure
    throw new Error('Failed to fetch post counts');
  }
}

import { dbDeletePost } from '@/db/queries/posts';
import { getAuthorizedSession } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const session = await getAuthorizedSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { id } = await params;
    const postId = parseInt(id);
    if (isNaN(postId)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    const result = await dbDeletePost(postId);

    revalidateTag('posts', { expire: 0 });
    if (result.wasPublished) {
      revalidateTag('published-posts', { expire: 0 });
      revalidateTag('blog-list', { expire: 0 });
      revalidateTag('sitemap', { expire: 0 });
      revalidatePath(`/blog/${result.slug}`);
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error in DELETE /api/posts/[id]:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

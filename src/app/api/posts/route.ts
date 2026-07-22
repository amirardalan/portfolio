import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { dbCreatePost, dbUpdatePost } from '@/db/queries/posts';
import { getUserIdByEmail } from '@/db/queries/users';
import { BlogPost } from '@/types/blog';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = await getUserIdByEmail(session.user.email);
    if (!userId) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    const data = await req.json();

    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required.' },
        { status: 400 }
      );
    }

    const postData = {
      ...data,
      user_id: userId,
      excerpt: data.excerpt || null,
      category_id: data.category_id !== undefined ? data.category_id : null,
      created_at: new Date(),
      published: data.published === true,
      featured: data.featured === true,
      show_updated: data.show_updated === true,
    };

    const postId = await dbCreatePost(postData);

    revalidateTag('posts', { expire: 0 });
    if (postData.published) {
      revalidateTag('published-posts', { expire: 0 });
      revalidateTag('blog-list', { expire: 0 });
      revalidateTag(`blog-post:${postData.slug}`, { expire: 0 });
      revalidateTag('sitemap', { expire: 0 });
    }

    return NextResponse.json({ id: postId }, { status: 201 });
  } catch (error) {
    console.error('POST /api/posts Error:', error);
    if (error instanceof Error && error.message.includes('posts_slug_unique')) {
      const reqBody = await req.clone().json();
      return NextResponse.json(
        {
          error: `A post with the slug "${reqBody.slug}" already exists. posts_slug_unique`,
        },
        { status: 409 }
      );
    }
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to create post';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updateData: Partial<BlogPost> & { id: number } = await req.json();

    const { id, ...postUpdatePayload } = updateData;

    const result = await dbUpdatePost(id, postUpdatePayload);

    revalidatePath(`/blog/${result.newSlug || result.oldSlug}`);

    if (result.wasPublished || updateData.published) {
      console.log('PUT /api/posts - Revalidating blog-list and sitemap tags.'); // Add log here
      revalidateTag('blog-list', { expire: 0 });

      revalidateTag(`blog-post:${result.newSlug || result.oldSlug}`, {
        expire: 0,
      });

      revalidateTag('sitemap', { expire: 0 });
    } else {
      console.log(
        'PUT /api/posts - Post was not published and is not being published. Skipping blog-list/sitemap revalidation.'
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('PUT /api/posts Error:', error);
    if (error instanceof Error && error.message.includes('posts_slug_unique')) {
      const reqBody = await req.clone().json();
      return NextResponse.json(
        {
          error: `A post with the slug "${reqBody.slug}" already exists. posts_slug_unique`,
        },
        { status: 409 }
      );
    }
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to update post';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

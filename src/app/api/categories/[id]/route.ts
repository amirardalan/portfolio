import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/connector';
import { categories } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getCategoryById } from '@/db/queries/categories';
import { getPostsByCategoryId } from '@/db/queries/posts';
import { isAuthorized } from '@/lib/auth';
import { revalidatePath, revalidateTag } from 'next/cache';

// Get category by ID
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const categoryId = parseInt(id);

    if (isNaN(categoryId)) {
      return NextResponse.json(
        { error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    const result = await getCategoryById(categoryId);

    if (!result) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

// Update a category
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const categoryId = parseInt(id);

    if (isNaN(categoryId)) {
      return NextResponse.json(
        { error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    const { name, slug } = await request.json();
    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    const affectedPosts = await getPostsByCategoryId(categoryId);

    // Update the category
    const [result] = await db
      .update(categories)
      .set({
        name,
        slug,
        updated_at: new Date(),
      })
      .where(eq(categories.id, categoryId))
      .returning();

    if (!result) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    revalidateCategoryContent(affectedPosts);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error updating category:', error);

    // Check for duplicate slug error
    if (error.message?.includes('categories_slug_unique')) {
      return NextResponse.json(
        { error: `A category with this slug already exists` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to update category' },
      { status: 500 }
    );
  }
}

// Delete a category
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const categoryId = parseInt(id);

    if (isNaN(categoryId)) {
      return NextResponse.json(
        { error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    // Check if category exists
    const category = await getCategoryById(categoryId);
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    const affectedPosts = await getPostsByCategoryId(categoryId);

    // The foreign key sets affected posts to Uncategorized (null).
    await db.delete(categories).where(eq(categories.id, categoryId));

    revalidateCategoryContent(affectedPosts);

    return NextResponse.json({
      success: true,
      uncategorizedPosts: affectedPosts.length,
    });
  } catch (error: any) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete category' },
      { status: 500 }
    );
  }
}

function revalidateCategoryContent(
  affectedPosts: Array<{ slug: string; published: boolean | null }>
) {
  revalidateTag('posts', { expire: 0 });
  revalidateTag('published-posts', { expire: 0 });
  revalidateTag('blog-list', { expire: 0 });

  for (const post of affectedPosts) {
    if (post.published) {
      revalidateTag(`blog-post:${post.slug}`, { expire: 0 });
      revalidatePath(`/blog/${post.slug}`);
    }
  }
}

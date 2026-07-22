import { NextRequest, NextResponse } from 'next/server';
import {
  getCategories,
  getCategoryById,
  isCategoryUsedByPosts,
} from '@/db/queries/categories';
import { db } from '@/db/connector';
import { categories } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { getPostsByCategoryId } from '@/db/queries/posts';
import { isAuthorized } from '@/lib/auth';

// Get all categories
export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await getCategories();
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// Create a new category
export async function POST(request: NextRequest) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, slug } = await request.json();

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Insert the new category
    const [result] = await db
      .insert(categories)
      .values({
        name,
        slug,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning();

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error('Error creating category:', error);

    // Check for duplicate slug error
    if (error.message?.includes('categories_slug_unique')) {
      return NextResponse.json(
        { error: `A category with this slug already exists` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to create category' },
      { status: 500 }
    );
  }
}

// Update a category
export async function PUT(request: NextRequest) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, name, slug } = await request.json();

    if (!id || !name || !slug) {
      return NextResponse.json(
        { error: 'ID, name, and slug are required' },
        { status: 400 }
      );
    }

    // Get the category before update to check if it changed
    const oldCategory = await getCategoryById(id);
    if (!oldCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Update the category
    const [result] = await db
      .update(categories)
      .set({
        name,
        slug,
        updated_at: new Date(),
      })
      .where(eq(categories.id, id))
      .returning();

    // If category name or slug has changed, revalidate affected content
    if (oldCategory.name !== name || oldCategory.slug !== slug) {
      await revalidateAffectedContent(id);
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update category' },
      { status: 500 }
    );
  }
}

// Delete a category
export async function DELETE(request: NextRequest) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }

    // Check if category exists
    const category = await getCategoryById(id);
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Check if any posts are using this category
    const inUse = await isCategoryUsedByPosts(id);
    if (inUse) {
      return NextResponse.json(
        { error: 'This category is being used by one or more posts' },
        { status: 400 }
      );
    }

    // Get all posts with this category before deleting for revalidation
    const postsWithCategory = await getPostsByCategoryId(id);

    // Delete the category
    const [result] = await db
      .delete(categories)
      .where(eq(categories.id, id))
      .returning();

    // Revalidate affected content
    if (postsWithCategory.length > 0) {
      await revalidateAffectedContent(id, postsWithCategory);
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete category' },
      { status: 500 }
    );
  }
}

// Helper function to revalidate affected content
async function revalidateAffectedContent(
  categoryId: number,
  posts: Array<{ slug: string; published: boolean | null }> | null = null
) {
  if (!posts) {
    posts = await getPostsByCategoryId(categoryId);
  }

  // Revalidate each published post with this category
  if (posts) {
    for (const post of posts) {
      if (post.published) {
        revalidateTag(`blog-post:${post.slug}`, { expire: 0 });
      }
    }
  }

  // Also revalidate the blog list since category details might be shown there
  revalidateTag('blog-list', { expire: 0 });
}

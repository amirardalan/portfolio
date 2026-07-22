import { getAllPublishedSlugs, getPostBySlug } from '@/db/queries/posts';
import {
  generateOgImage,
  size,
  contentType,
} from '@/components/og/OgImageTemplate';
import { getAuthorizedSession } from '@/lib/auth';

export const alt = 'Writing by Amir Ardalan';
export { size, contentType };

export async function generateStaticParams() {
  const posts = await getAllPublishedSlugs();
  return posts;
}

export default async function Image({ params }: { params: { slug: string } }) {
  try {
    const post = await getPostBySlug(params.slug);

    if (!post || (!post.published && !(await getAuthorizedSession()))) {
      return generateOgImage({
        title: 'Writing — Amir Ardalan',
        description: 'Read this post on amir.sh.',
      });
    }

    return generateOgImage({
      title: post.title,
      description: post.excerpt || 'Read this post on amir.sh.',
      category: post.category?.name || undefined,
    });
  } catch (error) {
    console.error('Error generating OG image:', error);

    // Fallback OG
    return generateOgImage({
      title: 'Writing — Amir Ardalan',
      description: 'Read this post on amir.sh.',
    });
  }
}

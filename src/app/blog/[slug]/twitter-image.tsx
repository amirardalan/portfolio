import { getPostBySlug } from '@/db/queries/posts';
import { generateTwitterImage } from '@/components/og/TwitterImageTemplate';
import { size, contentType } from '@/components/og/OgImageTemplate';
import { getAuthorizedSession } from '@/lib/auth';

export const alt = 'Writing by Amir Ardalan';
export { size, contentType };

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  const canViewPost =
    post?.published || (post && (await getAuthorizedSession()));

  return generateTwitterImage({
    title: canViewPost ? post.title : 'Writing — Amir Ardalan',
    description: (canViewPost && post.excerpt) || 'Read this post on amir.sh.',
    category: canViewPost ? post.category?.name || undefined : undefined,
  });
}

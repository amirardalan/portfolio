import { getPublishedPosts } from '@/db/queries/posts';

import Container from '@/components/content/Container';
import PageHeading from '@/components/ui/PageHeading';
import BlogPosts from '@/components/blog/BlogPosts';

import { BlogPost } from '@/types/blog';

export const generateMetadata = () => {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    title: 'Writing — Amir Ardalan',
    description:
      'Writing about product design, interaction design, frontend engineering, and creative technology.',
    alternates: {
      canonical: '/blog',
    },
  };
};

export default async function Blog() {
  let posts: BlogPost[] = [];
  try {
    posts = await getPublishedPosts({
      next: { tags: ['published-posts', 'blog-list'] },
    });
  } catch (error) {
    console.error('Error fetching published posts:', error);
  }

  return (
    <Container>
      <div>
        <PageHeading title="Writing" />
        <div className="text-dark dark:text-light">
          {posts.length > 0 ? (
            <BlogPosts posts={posts} />
          ) : (
            <p>Nothing published yet.</p>
          )}
        </div>
      </div>
    </Container>
  );
}

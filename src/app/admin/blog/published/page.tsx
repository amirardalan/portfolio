import { getAuthorizedSession } from '@/lib/auth';
import { notFound } from 'next/navigation';
import { getPublishedPosts } from '@/db/queries/posts';
import AdminPostList from '@/components/admin/AdminPostList';
import Container from '@/components/content/Container';

export const dynamic = 'force-dynamic';

export function generateMetadata() {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    title: 'Published Posts — Amir Ardalan',
    description: 'View and manage published blog posts in the admin panel.',
  };
}

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Published({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await getAuthorizedSession();

  if (!session) {
    notFound();
  }

  const params = (await searchParams) ?? {};
  const query = typeof params.query === 'string' ? params.query : '';
  const currentPage = Number(
    typeof params.page === 'string' ? params.page : '1'
  );
  const postsPerPage = 10;

  const posts = await getPublishedPosts({ next: { tags: ['posts'] } });

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const totalResults = filteredPosts.length;

  return (
    <Container>
      <AdminPostList
        title="Published Posts"
        posts={paginatedPosts}
        searchPlaceholder="Search published posts..."
        query={query}
        totalResults={totalResults}
        currentPage={currentPage}
        totalPages={totalPages}
        isDrafts={false}
      />
    </Container>
  );
}

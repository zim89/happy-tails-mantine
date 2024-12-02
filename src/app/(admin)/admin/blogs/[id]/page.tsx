import { Metadata } from 'next';

import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import PostDetails from '@/modules/PostDetails';
import { fetchOnePost } from '@/shared/lib/requests';
import { notFound } from 'next/navigation';

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const post = await fetchOnePost(params.id);

  if (!post) return notFound();

  return {
    title: `${post.title} page`,
    robots: {
      index: false,
      indexifembedded: false,
    },
  };
};

type Props = {
  params: { id: string };
  searchParams: { fromPage: string };
};
export default function Page({ params: { id }, searchParams }: Props) {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { href: '/admin/', text: 'Dashboard' },
          {
            text: 'Blogs',
            href: `/admin/blogs?page=${searchParams.fromPage && searchParams.fromPage !== 'null' ? searchParams.fromPage : 1}`,
          },
          { text: 'Blog post' },
        ]}
        classNames={{
          root: 'p-0 m-0 mb-8',
        }}
      />

      <PostDetails postId={id} />
    </>
  );
}

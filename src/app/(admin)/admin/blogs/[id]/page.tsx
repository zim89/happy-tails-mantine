import { Metadata } from 'next';

import Breadcrumbs from '@/components/Breadcrumbs';
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
};
export default function Page({ params: { id } }: Props) {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { href: '/admin/', text: 'Dashboard' },
          { text: 'Blogs', href: '/admin/blogs/' },
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

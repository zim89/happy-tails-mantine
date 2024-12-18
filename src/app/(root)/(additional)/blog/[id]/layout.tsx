import { handleError } from '@/shared/helpers/error.helpers';
import { fetchOnePost } from '@/shared/lib/requests';

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const post = await fetchOnePost(params.id);

    if (!post) {
      return {
        title: 'Not found',
        description: 'The post does not exist.',
      };
    }

    return {
      title: post.title + ' | Post | Happy Tails',
      description: null,
      author: post.authorName,
    };
  } catch (err) {
    handleError(err);
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

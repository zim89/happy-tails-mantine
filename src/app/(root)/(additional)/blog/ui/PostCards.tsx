import { Post } from '@/shared/api/postApi';
import Link from 'next/link';

import PostCard from './PostCard';

type Props = {
  posts: Post[];
};

export const PostCards = ({ posts }: Props) => {
  return (
    <>
      <ul className='my-6 grid grid-cols-1 gap-4 md:my-8 md:grid-cols-2 md:gap-y-8 lg:my-10 lg:gap-x-6 lg:gap-y-10'>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>
              <PostCard post={post} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

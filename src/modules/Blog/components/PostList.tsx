import { PostCards } from '@/app/(root)/(additional)/blog/ui/PostCards';
import { Post } from '@/shared/api/postApi';

import Link from 'next/link';

type Props = {
  posts: Post[];
};

export const PostList = ({ posts }: Props) => {
  return (
    <>
      <PostCards posts={posts} />

      <Link
        href='/blog'
        className='btn btn-secondary relative block md:mx-auto md:w-[174px]'
      >
        Read more
      </Link>
    </>
  );
};

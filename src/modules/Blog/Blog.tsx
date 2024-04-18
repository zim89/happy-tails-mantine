import PostList from '@/app/(root)/(additional)/blog/ui/PostList';
import { fetchAllPosts } from '@/shared/api/postApi';
import { Button, Container } from '@mantine/core';
import Link from 'next/link';

export default async function Blog() {
  const posts = await fetchAllPosts(0, 2);

  return (
    <section className='pt-16 md:pt-[88px] lg:pt-[104px]'>
      <h2 className='mb-6 text-center text-[1.75rem] uppercase md:mb-9 lg:text-4xl'>
        Blog
      </h2>

      <Container>
        <PostList posts={posts} />
      </Container>
    </section>
  );
}

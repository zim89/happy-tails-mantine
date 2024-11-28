import { fetchAllPosts } from '@/shared/lib/requests';
import { PostList } from './components/PostList';

export default async function Blog() {
  const posts = await fetchAllPosts(0, 2);

  return (
    <section className='pt-16 md:pt-[88px] lg:pt-[104px]'>
      <h2 className='mb-6 text-center text-[1.75rem] uppercase md:mb-9 lg:text-4xl'>
        Blog
      </h2>

      <div className='container'>
        <PostList posts={posts.content} />
      </div>
    </section>
  );
}

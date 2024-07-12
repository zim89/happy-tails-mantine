import { fetchLastFivePosts } from '@/shared/lib/requests';
import PostList from '@/components/PostList';

async function PopularPosts() {
  const posts = await fetchLastFivePosts();

  return (
    <div className='space-y-6 lg:space-y-8'>
      <h2 className='border-b border-b-brand-grey-600 py-2 text-[1.75rem]/normal font-bold capitalize'>
        Most Popular
      </h2>

      <PostList posts={posts} />
    </div>
  );
}

export default PopularPosts;

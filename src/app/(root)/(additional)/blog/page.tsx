import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { fetchAllPosts } from '@/shared/lib/requests';

import HeroBlog from './ui/HeroBlog';
import PostList from './ui/PostList';

export default async function BlogPage() {
  const posts = await fetchAllPosts();

  return (
    <>
      <div className='container'>
        <Breadcrumbs
          crumbs={[{ href: '/', text: 'Home' }, { text: 'Blog' }]}
          classNames={{
            root: 'p-0 pt-4',
          }}
        />

        <h1 className='title-page relative text-center before:absolute before:left-0 before:top-1/2 before:h-[1px] before:w-16 before:-translate-y-1/2 before:bg-gray-400 after:absolute after:right-0 after:top-1/2 after:h-[1px] after:w-16 after:-translate-y-1/2 after:bg-gray-400 md:before:w-[221px] md:after:w-[221px] lg:text-4xl/normal lg:before:left-[99px] lg:before:w-[329px] lg:after:right-[99px] lg:after:w-[329px]'>
          Happy Tails Blog
        </h1>

        <div className='pb-12 pt-8 lg:mb-[72px]'>
          <HeroBlog />
          <PostList posts={posts} />
        </div>
      </div>
    </>
  );
}

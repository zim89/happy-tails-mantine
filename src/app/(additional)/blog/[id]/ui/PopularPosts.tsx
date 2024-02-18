import Image from 'next/image';
import { fetchLastFivePosts } from '@/shared/api/postApi';
import { formatDate } from '@/shared/lib/helpers';
import noImage from '@/assets/icons/no-image.512x512.png';

async function PopularPosts() {
  const posts = await fetchLastFivePosts();

  return (
    <div className='space-y-6 lg:space-y-8'>
      <h2 className='border-b border-b-brand-grey-600 py-2 text-[28px]/normal font-bold capitalize'>
        Most Popular
      </h2>

      <ul className='grid grid-cols-1 gap-6 lg:gap-8'>
        {posts.map((post) => (
          <li key={post.id} className='group flex cursor-pointer gap-4'>
            <div className='relative h-[120px] w-[120px] flex-none'>
              <Image
                src={
                  post.posterImgSrc.includes('http')
                    ? post.posterImgSrc
                    : noImage
                }
                alt={post.title}
                fill={true}
                sizes='120px'
                className='object-cover'
              />
            </div>

            <div className='flex items-center'>
              <div className='flex flex-col gap-2'>
                <h3 className='text-lg/[1.3] text-secondary transition-colors duration-300 group-hover:text-brand-orange-400'>
                  {post.title}
                </h3>
                <p className='text-base font-light'>
                  {formatDate(post.createdAt)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PopularPosts;

import Image from 'next/image';
import Link from 'next/link';

import { Post } from '@/shared/api/postApi';
import { formatDateToLongString } from '@/shared/lib/helpers';

export type Props = {
  posts: Post[];
};

export default function PostList({ posts }: Props) {
  if (posts.length < 1) return null;

  return (
    <ul
      className='grid grid-cols-1 gap-6 lg:gap-8'
      data-testid='posts-container'
    >
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={`/blog/${post.id}`}
            className='group flex cursor-pointer gap-4'
            data-testid='post-link'
          >
            <div className='relative h-[120px] w-[120px] flex-none'>
              <Image
                src={
                  post.posterImgSrc.includes('http')
                    ? post.posterImgSrc
                    : '/images/no-image.512x512.png'
                }
                alt={post.title}
                data-testid='post-image'
                fill
                sizes='120px'
                className='object-cover'
              />
            </div>

            <div className='flex items-center'>
              <div className='flex flex-col gap-2'>
                <h3
                  className='text-lg/[1.3] text-secondary transition-colors duration-300 group-hover:text-brand-orange-400'
                  data-testid='post-title'
                >
                  {post.title}
                </h3>
                <p className='text-base font-light' data-testid='post-date'>
                  {formatDateToLongString(post.createdAt)}
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

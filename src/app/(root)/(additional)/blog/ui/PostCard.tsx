import React from 'react';
import Image from 'next/image';
import type { Post } from '@/shared/api/postApi';
import { formatDateToLongString } from '@/shared/lib/helpers';

interface Props {
  post: Post;
}

function PostCard({ post }: Props) {
  return (
    <div className='cursor-pointer p-4 hover:shadow-card lg:p-6'>
      <div className='md:hidden'>
        <Image
          src={post.posterImgSrc}
          alt={post.title}
          width={347}
          height={184}
          priority={true}
          className='mb-4 w-auto'
        />
      </div>
      <div className='hidden md:block lg:hidden'>
        <Image
          src={post.posterImgSrc}
          alt={post.title}
          width={347}
          height={184}
          priority={true}
          className='mb-4'
        />
      </div>
      <div className='hidden lg:block'>
        <Image
          src={post.posterImgSrc}
          alt={post.title}
          width={523}
          height={246}
          priority={true}
          className='mb-4 object-cover h-[246px]'
        />
      </div>

      <p className='mb-2 text-base font-light'>{formatDateToLongString(post.createdAt)}</p>
      <h3 className='text-xl/normal font-bold md:h-8 lg:h-11'>{post.title}</h3>
    </div>
  );
}

export default PostCard;

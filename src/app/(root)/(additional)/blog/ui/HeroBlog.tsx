import React from 'react';
import { Post } from '@/shared/api/postApi';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  post: Post;
}

function HeroBlog({ post }: Props) {
  return (
    <>
      {post ? (
        <div className='relative h-[400px] md:h-[320px] lg:h-[400px]'>
          <Image
            src={post.posterImgSrc}
            alt={post.title}
            fill
            priority={true}
            style={{ objectFit: 'cover' }}
          />
          <div className='absolute inset-0 z-10 bg-gradient-to-r from-black/40 to-black/40'></div>

          <div className='absolute left-[48px] top-[100px] z-20 w-[283px] md:top-[82px] md:w-[476px] lg:left-[99px] lg:top-[146px] lg:w-[473px]'>
            <h2 className='mb-2 text-2xl/[1.2] font-bold text-primary'>
              {post.title}
            </h2>
            <p className='mb-6 line-clamp-4 text-base text-primary md:line-clamp-3'>
              {post.content}
            </p>
            <Link
              href={`/blog/${post.id}`}
              className='block rounded-0.5 bg-brand-orange-400 px-4 py-3 text-center text-base font-bold text-primary transition-colors duration-300 hover:bg-brand-orange-500 md:w-[129px]'
            >
              Read now
            </Link>
          </div>
        </div>
      ) : (
        <div className='h-[400px] bg-gray-200 md:h-[320px] lg:h-[400px]'></div>
      )}
    </>
  );
}

export default HeroBlog;

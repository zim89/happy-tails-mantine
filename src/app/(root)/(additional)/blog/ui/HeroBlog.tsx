'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useGetHeroQuery } from '@/shared/api/postApi';
import Loader from '@/components/Loader/Loader';

import { PostContent } from '../[id]/ui/PostContent';

function HeroBlog() {
  const { data, error, isLoading } = useGetHeroQuery();

  if (isLoading)
    return (
      <div className='flex justify-center'>
        <Loader size={30} />
      </div>
    );

  // Is there is no hero post set, then render nothing
  if (!data)
    return (
      <div className='h-[400px] bg-gray-200 md:h-[320px] lg:h-[400px]'></div>
    );
  if (error)
    return (
      <p>
        {
          "Whoops, it shouldn't have happened, our experts are already fixing this!"
        }
      </p>
    );

  return (
    <div className='relative h-[400px] md:h-[320px] lg:h-[400px]'>
      <Image
        src={data.posterImgSrc}
        alt={data.title}
        fill
        priority={true}
        style={{ objectFit: 'cover' }}
      />
      <div className='absolute inset-0 z-10 bg-gradient-to-r from-black/40 to-black/40'></div>

      <div className='absolute left-1/2 top-[100px] z-20 w-[283px] -translate-x-1/2 px-5 sm:px-0 md:top-[82px] md:w-[476px] lg:left-[99px] lg:top-[146px] lg:w-[473px] lg:translate-x-0'>
        <h2 className='mb-2 text-2xl/[1.2] font-bold text-primary'>
          {data.title}
        </h2>
        <p className='mb-6 line-clamp-2 overflow-hidden text-base text-primary'>
          <PostContent
            content={data.content}
            className='fix-line-clamp brightness-[30] filter'
          />
        </p>
        <Link
          href={`/blog/${data.id}`}
          className='block rounded-0.5 bg-brand-orange-400 px-4 py-3 text-center text-base font-bold text-primary transition-colors duration-300 hover:bg-brand-orange-500 md:w-[129px]'
        >
          Read now
        </Link>
      </div>
    </div>
  );
}

export default HeroBlog;

'use client';
import { Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  const isLargeScreen = useMediaQuery('(min-width: 1280px');

  return (
    <div className='flex items-center bg-[#f3f1ef] pt-20 md:pt-0'>
      <Image
        className='hidden md:block'
        src='https://i.imgur.com/DxNCZvh.png'
        width={isLargeScreen ? 700 : 460}
        height={isLargeScreen ? 575 : 375}
        alt='Dog faces 404 page'
      />
      <div className='flex-1 px-4 py-24 text-center md:flex-initial md:text-left'>
        <p className='mb-2 text-4xl text-[rgb(22,22,22)]'>Ooops...</p>
        <p className='mb-4 text-4xl text-[#F39324]'>Page not found</p>
        <p className='mb-10'>
          The page you are looking for doesn’t exist or an other error occurred,
          go back to home page.
        </p>
        <Button classNames={{ root: 'bg-black max-w-[414px] w-full' }}>
          <Link href={'/'}>Back to homepage</Link>
        </Button>
      </div>
    </div>
  );
}

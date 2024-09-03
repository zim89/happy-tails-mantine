'use client';

import { useCategoriesQuery } from '@/shared/api/categoryApi';
import { Carousel } from '@mantine/carousel';
import Link from 'next/link';

export default function CategoriesSlider() {
  const { data } = useCategoriesQuery({});

  if (!data) return null;

  return (
    <div className='max-w-[100vw] pl-4'>
      <Carousel
        slideSize='auto'
        slideGap='md'
        align='start'
        height={120}
        withControls={false}
      >
        {data.content.map((category) => (
          <Carousel.Slide key={category.id} w='12.5rem'>
            <Link
              href={'/' + category.name.toLowerCase()}
              className='flex size-full cursor-pointer flex-col items-center justify-center gap-2 border border-brand-grey-400 shadow-[0_2px_8px_0_#00000029]'
            >
              <div
                style={
                  {
                    '--img':
                      `url(${category.imgSrc})` ??
                      'url(https://i.imgur.com/4FsWarQ.png)',
                  } as React.CSSProperties
                }
                className='size-12 bg-brand-orange-400 [mask-image:--img] [mask-size:contain]'
              ></div>
              <p className='text-xl'>{category.name}</p>
            </Link>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}

'use client';

import dynamic from 'next/dynamic';
import { Carousel } from '@mantine/carousel';

import { useCategoriesQuery } from '@/shared/api/categoryApi';

const Slide = dynamic(() => import('./Slide'), { ssr: false });

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
          <Slide key={category.id} category={category} />
        ))}
      </Carousel>
    </div>
  );
}

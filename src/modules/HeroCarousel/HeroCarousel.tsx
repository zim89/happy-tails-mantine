'use client';
import { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';

import Slide from './components/Slide';

export default function HeroCarousel() {
  const autoplay = useRef(Autoplay({ delay: 10000 }));

  return (
    <div className='flex h-full max-h-[200px] w-full md:max-h-[360px] lg:min-h-[560px]'>
      <Carousel
        withIndicators
        withControls={false}
        loop
        style={{ flex: 1 }}
        height='100%'
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        classNames={{
          indicators: '!bottom-3 md:!bottom-6 lg:!bottom-8',
          indicator:
            '!opacity-100 !size-3 !bg-brand-grey-400 cursor-pointer data-[active]:!bg-black md:!size-4',
        }}
      >
        {[0, 1, 2, 3, 4].map((item) => (
          <Slide
            key={item}
            title='DOG TOYS'
            subtitle='New Collection'
            description='Order today and let your dog enjoy hours of chewing fun!'
          />
        ))}
      </Carousel>
    </div>
  );
}

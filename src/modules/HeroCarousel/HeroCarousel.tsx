'use client';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import Slide from './components/Slide';
import { useDeviceSize } from '@/shared/lib/hooks';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

export default function HeroCarousel() {
  const { isTablet, isDesktop } = useDeviceSize();
  const autoplay = useRef(Autoplay({ delay: 10000 }));

  const height = isDesktop ? 560 : isTablet ? 336 : 182;

  return (
    <Carousel
      withIndicators
      withControls={false}
      loop
      height={height}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      className='mx-auto max-w-md md:max-w-3xl lg:max-w-7xl'
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
  );
}

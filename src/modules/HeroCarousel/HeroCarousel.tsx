'use client';

import { useMemo, useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';

import Slide from './components/Slide';
import { Banner, useFindManyQuery } from '@/shared/api/bannerApi';
import { SkeletonLoader } from './components/SkeletonLoader';
import { bannerNames } from '../SettingsDisplay/lib/data';
import { cn } from '@/shared/lib/utils';

export default function HeroCarousel() {
  const autoplay = useRef(Autoplay({ delay: 10000 }));
  const { data, error, isLoading } = useFindManyQuery({});

  const slides: Banner[] = data?.content || [];
  const banners = useMemo(() => {
    return slides.filter((banner) => bannerNames.includes(banner.name));
  }, [slides]);

  if (error)
    return (
      <p>
        {
          "Whoops, it shouldn't have happened, our experts are already fixing this"
        }
      </p>
    );

  if (isLoading) return <SkeletonLoader />;

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
          viewport: 'w-screen',
          indicators: '!bottom-3 md:!bottom-6 lg:!bottom-8',
          indicator: cn(
            banners.length > 1
              ? '!size-3 cursor-pointer !bg-brand-grey-400 !opacity-100 data-[active]:!bg-secondary md:!size-4'
              : 'hidden'
          ),
        }}
      >
        {banners.length ? (
          banners.map((slide, index) => (
            <Slide
              key={index}
              banner={slide.imagePath}
              href={slide.productPath}
            />
          ))
        ) : (
          <Slide
            classNames={{ image: 'object-center object-contain' }}
            banner={'/images/hero-dog-bg-cleared.png'}
            href='/products'
          />
        )}
      </Carousel>
    </div>
  );
}

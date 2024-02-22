'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Card, Container, Stack, Text } from '@mantine/core';
import { Carousel, Embla } from '@mantine/carousel';
import { useViewportSize } from '@mantine/hooks';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';

import { sliderData } from '@/modules/ProductDetails/lib/data';
import '@mantine/carousel/styles.css';

export default function ProductSlider() {
  const { width } = useViewportSize();

  const [embla, setEmbla] = useState<Embla | null>(null);
  const [hasPrevSlide, setHasPrevSlide] = useState(false);
  const [hasNextSlide, setHasNextSlide] = useState(true);
  const slidesToScroll = useRef(1);

  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  const handleSelect = useCallback(() => {
    if (!embla) return;
    embla.canScrollPrev() ? setHasPrevSlide(true) : setHasPrevSlide(false);
    embla.canScrollNext() ? setHasNextSlide(true) : setHasNextSlide(false);
  }, [embla]);

  useEffect(() => {
    if (embla) {
      embla.on('select', handleSelect);
      handleSelect();
    }
  }, [embla, handleSelect]);

  useEffect(() => {
    if (width >= 768 && width < 1280) slidesToScroll.current = 2;
    if (width > 1280) slidesToScroll.current = 3;
  }, [width]);

  return (
    <Container>
      <div className='mb-9 flex items-center justify-between'>
        <h2 className='text-xl font-bold leading-normal md:text-[28px]'>
          You may also like
        </h2>
        <div className='flex gap-4 md:gap-6'>
          <button
            onClick={scrollPrev}
            disabled={!hasPrevSlide}
            className={clsx(
              'navBtn pr-[2px]',
              hasPrevSlide ? 'navBtn-primary' : 'navBtn-disabled'
            )}
          >
            <ChevronLeft className='navBtn-icon' />
          </button>
          <button
            onClick={scrollNext}
            disabled={!hasNextSlide}
            className={clsx(
              'navBtn pl-[2px]',
              hasNextSlide ? 'navBtn-primary' : 'navBtn-disabled'
            )}
          >
            <ChevronRight className='navBtn-icon' />
          </button>
        </div>
      </div>

      <Carousel
        getEmblaApi={setEmbla}
        withControls={false}
        draggable={false}
        align={'start'}
        slideGap={16}
        slideSize={{ base: '100%', md: '50%', lg: '33.33%' }}
        slidesToScroll={slidesToScroll.current}
        speed={4}
        dragFree
      >
        {sliderData.map((item) => (
          <Carousel.Slide key={item.id}>
            <Card
              withBorder
              padding={28}
              radius={2}
              classNames={{
                root: 'border-brand-grey-400 w-[340px] md:w-full',
              }}
            >
              <Stack gap={20}>
                <Image
                  src={item.imagePath}
                  alt={item.name}
                  className='h-[287px] w-[284px] lg:w-[304px]'
                />
                <Box>
                  <Text className='mb-2 text-xs leading-normal'>
                    {item.article}
                  </Text>
                  <Text className='mb-9 text-xl font-bold leading-normal'>
                    {item.name}
                  </Text>
                  <Text className='text-base'>$ {item.price}</Text>
                </Box>
              </Stack>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
}

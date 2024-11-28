'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Card,
  Container,
  ContainerProps,
  Stack,
  Text,
  useMatches,
} from '@mantine/core';
import { Carousel, Embla } from '@mantine/carousel';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import '@mantine/carousel/styles.css';
import { Product } from '@/shared/types/types';

type ProductSliderProps = ContainerProps & {
  targetCategory?: string;
  data: Product[];
  alt?: boolean;
};

export default function ProductSlider({
  data,
  alt,
  targetCategory,
  ...props
}: ProductSliderProps) {
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [hasPrevSlide, setHasPrevSlide] = useState(false);
  const [hasNextSlide, setHasNextSlide] = useState(true);

  const slidesToScroll = useMatches({
    base: 1,
    md: 2,
    lg: 3,
  });

  const align = useMatches({
    base: 'center',
    md: 'start',
  } as const);

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

  return (
    <Container {...props}>
      {!alt && (
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
      )}

      <Carousel
        getEmblaApi={setEmbla}
        withControls={!!alt}
        draggable={!!alt}
        align={alt ? align : 'start'}
        slideGap={16}
        slideSize={{ base: '100%', md: '50%', lg: '33.33%' }}
        slidesToScroll={alt ? 'auto' : slidesToScroll}
        speed={4}
        dragFree={!alt}
        controlsOffset={0}
        classNames={{
          slide: 'max-w-[356px] lg:max-w-[397px]',
          controls:
            '!hidden lg:!flex [--_controls-left:-22px_!important] [--_controls-right:-22px_!important]',
          control:
            'navBtn data-[inactive=true]:navBtn-disabled data-[inactive=false]:navBtn-primary',
        }}
      >
        {data.length > 0 &&
          data.map((item) => (
            <Carousel.Slide key={item.id}>
              <Link href={`/products/${item.id}`} shallow>
                <Card
                  withBorder
                  padding={28}
                  radius={2}
                  classNames={{
                    root: 'border-brand-grey-400 w-full h-full',
                  }}
                >
                  <Stack gap={20}>
                    <Image
                      src={item.imagePath ?? '/images/no-img.png'}
                      alt={item.name}
                      width={304}
                      height={287}
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
              </Link>
            </Carousel.Slide>
          ))}
        {targetCategory && (
          <Card
            withBorder
            padding={28}
            radius={2}
            classNames={{
              root: 'border-brand-grey-400 bg-brand-grey-300 min-w-[340px] md:w-full',
            }}
          >
            <Link
              href={`/${targetCategory.toLowerCase()}`}
              className='inline-flex h-full flex-col items-center justify-center text-xs leading-normal text-[#A8A8A8]'
            >
              <Plus size={130} />
              <span className='mb-3 text-2xl font-light uppercase'>
                More Products
              </span>
              <span className='text-center text-xs'>
                Explore more amazing products from this category!
              </span>
            </Link>
          </Card>
        )}
      </Carousel>
    </Container>
  );
}

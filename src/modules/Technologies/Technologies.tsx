'use client';

import { Carousel, Embla } from '@mantine/carousel';

import { technologies } from './lib/data';
import Image from 'next/image';
import { useDebouncedCallback } from '@mantine/hooks';
import { useEffect, useState } from 'react';

export default function Technologies() {
  const [embla, setEmbla] = useState<Embla | null>(null);

  const turnBack = useDebouncedCallback(async (inst: Embla) => {
    if (!inst) return;
    const slidesInView = inst.slidesInView();

    // If it's not scrolled, then skip
    if (slidesInView.length === 8) return;

    inst.scrollTo(3);
  }, 500);

  useEffect(() => {
    if (embla) {
      embla.on('scroll', () => turnBack(embla));
      turnBack(embla);
    }
  }, [embla]);

  return (
    <>
      <h3 className='p-14 text-center text-4xl'>Technology Stack</h3>
      <Carousel
        slideSize={156}
        height={156}
        slideGap='lg'
        loop
        dragFree
        withControls={false}
        speed={2}
        getEmblaApi={(inst) => setEmbla(inst)}
        classNames={{
          container: 'container gap-12 select-none',
          viewport: 'mb-24',
        }}
        initialSlide={3}
      >
        {technologies.map((tech) => (
          <Carousel.Slide key={tech.id}>
            <Image fill sizes='100%' src={tech.image} alt={tech.alt} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
}

import { Carousel } from '@mantine/carousel';
import Image from 'next/image';
import heroDog from '@/assets/images/hero-dog-bg-cleared.png';
import { Button, Container } from '@mantine/core';
import Link from 'next/link';

import classes from "./classes.module.css";

type SlideProps = {
  title: string;
  subtitle: string;
  description: string;
};

export default function Slide({ title, subtitle, description }: SlideProps) {
  return (
    <Carousel.Slide classNames={{ slide: classes.slideWrapper }} >
      <Container className="relative">
      <Image
        src={heroDog}
        alt='hero'
        className='-z-10 object-cover object-top'
        layout="responsive"
      />
      <div className='absolute user-select-none bottom-[13.32142%] right-[6.95312%] top-[25.17857%] flex flex-col items-center text-center'>
        <p className='font-madi text-[1.20187rem]/[1.5625rem] text-[#DC3F00] md:text-[2.23rem]/[2.9375rem] lg:text-[3.71625rem]/[2.875rem]'>
          {subtitle}
        </p>
        <h2 className='font-inter font-bold text-[2.2825rem]/[2.75rem] md:text-[4.23375rem]/[5.125rem] lg:text-[7.05687rem]/[8.5625rem]'>
          {title}
        </h2>
        <p className='font-inter text-[0.42437rem]/[0.5rem] text-brand-grey-900 md:text-[0.7875rem]/[0.9375rem] lg:text-[1.3125rem]/[1.5625rem]'>
          {description}
        </p>
        <Button
          component={Link}
          href='/products'
          className='mt-[10%] h-3.5 min-w-[4.6875rem] rounded-[0.65px] bg-black text-[0.32375rem] md:h-7 md:min-w-[8.75rem] md:text-[0.6rem] lg:h-11 lg:min-w-[14.5rem] lg:text-base'
        >
          Shop now
        </Button>
      </div>
      </Container>
    </Carousel.Slide>
  );
}

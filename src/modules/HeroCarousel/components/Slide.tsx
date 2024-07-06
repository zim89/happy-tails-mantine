import { Carousel } from '@mantine/carousel';
import NextImage from 'next/image';
import { Container, UnstyledButton } from '@mantine/core';
import Link from 'next/link';

type SlideProps = {
  banner: string;
  button?: {
    text: string;
    path: string;
  };
};

export default function Slide({ banner, button }: SlideProps) {
  return (
    <Carousel.Slide>
      <NextImage src={banner} fill alt='hero' className='z-10 object-cover' />

      {button && (
        <Container className='relative z-20 flex h-full items-end justify-end'>
          <UnstyledButton
            component={Link}
            href={button.path}
            className='xl:py-[10px] mb-[32px] mr-[74px] rounded-sm bg-black px-[26px] py-1 text-center text-[0.32375rem] font-bold text-primary md:mb-[68px] md:mr-[132px] md:px-12 md:py-[6px] md:text-[0.6rem] lg:mb-[100px] lg:mr-36 lg:px-[80px] lg:text-base'
          >
            {button.text}
          </UnstyledButton>
        </Container>
      )}
    </Carousel.Slide>
  );
}

import { Carousel } from '@mantine/carousel';
import NextImage from 'next/image';
import Link from 'next/link';

type SlideProps = {
  href: string;
  banner: string;
};

export default function Slide({ banner, href }: SlideProps) {
  return (
    <Carousel.Slide>
      <Link href={href}>
        <NextImage src={banner} fill alt='hero' className='z-10 object-cover' />
      </Link>
    </Carousel.Slide>
  );
}

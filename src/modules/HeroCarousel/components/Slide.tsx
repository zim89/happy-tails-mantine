import { cn } from '@/shared/lib/utils';
import { Carousel } from '@mantine/carousel';
import NextImage from 'next/image';
import Link from 'next/link';

type SlideProps = {
  href: string;
  banner: string;
  classNames?: Partial<Record<'slide' | 'image', string>>;
};

export default function Slide({
  banner,
  href,
  classNames = { image: '', slide: '' },
}: SlideProps) {
  const { image, ...restClasses } = classNames;

  return (
    <Carousel.Slide classNames={restClasses}>
      <Link href={href}>
        <NextImage
          src={banner}
          fill
          alt='hero'
          className={cn('z-10 object-cover', image)}
        />
      </Link>
    </Carousel.Slide>
  );
}

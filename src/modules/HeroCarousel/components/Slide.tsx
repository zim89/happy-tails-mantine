import { Carousel } from '@mantine/carousel';
import NextImage from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils';

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
          priority
          className={cn('z-10', image)}
          sizes='(max-width: 414px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 100vw'
        />
      </Link>
    </Carousel.Slide>
  );
}

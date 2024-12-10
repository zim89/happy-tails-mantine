import Image from 'next/image';
import Link from 'next/link';

import { Category } from '@/shared/types/types';
import { Carousel } from '@mantine/carousel';

type Props = {
  category: Category;
};

export default function Slide({ category }: Props) {
  return (
    <Carousel.Slide key={category.id} w='12.5rem'>
      <Link
        href={'/' + category.name.toLowerCase()}
        className='flex size-full cursor-pointer flex-col items-center justify-center gap-2 border border-brand-grey-400 shadow-[0_2px_8px_0_#00000029]'
      >
        <Image
          width={48}
          height={48}
          style={{
            filter:
              'brightness(0) saturate(50%) invert(57%) sepia(57%) saturate(3000%) hue-rotate(5deg)',
          }}
          src={category.imgSrc ?? 'https://i.imgur.com/4FsWarQ.png'}
          alt={category.description}
        />
        <p className='text-xl'>{category.name}</p>
      </Link>
    </Carousel.Slide>
  );
}

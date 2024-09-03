import { useCategoriesQuery } from '@/shared/api/categoryApi';
import Image from 'next/image';
import CategoryBadge from './CategoryBadge';

import classes from '../classes.module.css';

export default function CategoriesPresentation() {
  const { data } = useCategoriesQuery({});

  if (!data) return null;

  return (
    <div className='relative mx-auto h-[721px] w-full max-w-screen-lg'>
      <Image
        src='/images/categories-dog.png'
        alt='big photo of a dog with variety of things around. Including leads, toys, cosmetics, collars, clothing and furniture.'
        fill
        className={classes.dragContainer}
      />

      {data.content.map((category) => (
        <CategoryBadge
          key={category.path}
          name={category.name}
          path={`/${category.name.toLowerCase()}`}
          position={{
            x: category.coordinateOnBannerX,
            y: category.coordinateOnBannerY,
          }}
        />
      ))}
    </div>
  );
}

import { useCategoriesQuery } from '@/shared/api/categoryApi';
import Image from 'next/image';
import bgImage from '@/assets/images/categories-dog.png';
import CategoryBadge from './CategoryBadge';

export default function CategoriesPresentation() {
  const { data } = useCategoriesQuery();

  if (!data) return null;

  return (
    <div className='relative mx-auto h-[721px] w-full max-w-screen-lg'>
      <Image
        src={bgImage}
        alt='big photo of a dog with variety of things around. Including leads, toys, cosmetics, collars, clothing and furniture.'
        fill
      />


      {data.content.map((category) => (
        <CategoryBadge
          key={category.path}
          name={category.name}
          path={category.path}
          position={{
            x: category.coordinateOnBannerX,
            y: category.coordinateOnBannerY,
          }}
        />
      ))}
    </div>
  );
}

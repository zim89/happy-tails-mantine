import { Favourite } from '@/shared/types/favourite.types';
import { FavouriteCard } from './FavouriteCard';

type Props = {
  items: Favourite[];
};

export const FavouriteGrid = ({ items }: Props) => {
  return (
    <ul className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6'>
      {items.map((fav, index) => (
        <li key={index}>
          <FavouriteCard favourite={fav} />
        </li>
      ))}
    </ul>
  );
};

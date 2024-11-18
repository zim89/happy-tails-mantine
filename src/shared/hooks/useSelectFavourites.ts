import { useFindManyQuery } from '../api/favouriteApi';
import { Favourite } from '../types/favourite.types';

export const useSelectFavourites = <T>(cb: (categories: Favourite[]) => T) => {
  const { favourites } = useFindManyQuery(
    { limit: 100000, page: 0 },
    { selectFromResult: (res) => ({ favourites: cb(res.data?.content || []) }) }
  );
  return favourites;
};

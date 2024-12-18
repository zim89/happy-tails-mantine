'use client';

import { Indicator } from '@mantine/core';
import { Heart } from 'lucide-react';
import Link from 'next/link';

import { useAuth } from '@/shared/hooks/useAuth';
import { useFindManyQuery } from '@/shared/api/favouriteApi';
import { useAppSelector } from '@/shared/redux/store';
import { selectFavorites } from '@/shared/redux/favorites/favoritesSlice';

export default function FavoriteButton() {
  const { currentUser } = useAuth();

  const { data: serverFavourites } = useFindManyQuery(
    {
      page: 0,
      limit: 1000000000,
    },
    {
      skip: !currentUser,
    }
  );

  const localFavourites = useAppSelector(selectFavorites);

  const favourites = serverFavourites?.content || localFavourites;

  if (favourites == null) return null;

  return (
    <Link
      href={'/wishlist'}
      className='group flex lg:items-center lg:justify-center'
      aria-label='Go to Wishlist'
    >
      <Indicator
        label={favourites?.length || 0}
        position='bottom-end'
        color='#F39324'
        size={14}
        offset={5}
        inline
        classNames={{
          indicator: 'p-0 text-[10px]/[21px] font-bold text-black',
        }}
      >
        <Heart className='iconBtn' />
      </Indicator>
    </Link>
  );
}

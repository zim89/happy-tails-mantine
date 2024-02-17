'use client';
import { Indicator } from '@mantine/core';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useAppSelector } from '@/shared/redux/store';
import { selectFavorites } from '@/shared/redux/favorites/favoritesSlice';

export default function FavoriteButton() {
  const favorites = useAppSelector(selectFavorites);
  const hasFavorites = favorites.length > 0;

  return (
    <Link
      href={'/wishlist'}
      className='group hidden lg:flex lg:items-center lg:justify-center'
    >
      <Indicator
        label={favorites.length}
        disabled={!hasFavorites}
        position='bottom-end'
        color='#F39324'
        size={10}
        offset={5}
        inline
        classNames={{
          indicator: 'p-0 text-[6px]/[7px] font-bold text-black',
        }}
      >
        <Heart className='iconBtn' />
      </Indicator>
    </Link>
  );
}

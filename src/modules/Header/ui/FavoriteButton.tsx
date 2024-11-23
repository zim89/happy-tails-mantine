'use client';

import { Indicator } from '@mantine/core';
import { Heart } from 'lucide-react';
import { useEffect } from 'react';
import Link from 'next/link';

import { useFindManyQuery } from '@/shared/api/favouriteApi';
import { useAuth } from '@/shared/hooks/useAuth';

export default function FavoriteButton() {
  const { currentUser } = useAuth();
  const { data, isError, refetch } = useFindManyQuery({
    limit: 100000000000,
    page: 0,
  });

  const favourites = data?.content.length || 0;

  useEffect(() => {
    (async () => {
      await refetch();
    })();
  }, [currentUser?.firstName, currentUser?.lastName]);

  if (isError || !data) return null;

  const hasFavorites = favourites > 0 && currentUser;

  return (
    <Link
      href={'/wishlist'}
      className='group flex lg:items-center lg:justify-center'
      aria-label='Go to Wishlist'
    >
      <Indicator
        label={favourites}
        disabled={!hasFavorites}
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

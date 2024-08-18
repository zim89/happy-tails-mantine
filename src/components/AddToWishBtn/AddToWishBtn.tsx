'use client';

import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import {
  addToFavorites,
  removeFromFavorites,
  selectFavorites,
} from '@/shared/redux/favorites/favoritesSlice';
import { useAppDispatch, useAppSelector } from '@/shared/redux/store';
import { Product } from '@/shared/types/types';

export interface Props {
  product: Product;
  withText?: boolean;
  disabled?: boolean;
}
export default function AddToWishBtn({ withText, disabled, product }: Props) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const isFavorite = favorites.some(({ id }) => id === product.id);
  const isWishlist = usePathname() === '/wishlist';

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
      return;
    }
    dispatch(addToFavorites(product));
  };

  return (
    <>
      {withText ? (
        <button
          onClick={toggleFavorite}
          disabled={disabled}
          className={clsx(
            'group/fav flex items-center gap-2 whitespace-nowrap bg-primary px-4 py-3 transition-colors duration-300',
            isFavorite
              ? 'text-brand-orange-400 hover:text-brand-orange-500'
              : 'text-secondary hover:text-brand-orange-500',
            disabled && 'text-secondary/40 hover:bg-primary'
          )}
        >
          <Heart
            className={clsx(
              'h-5 w-5 stroke-2 transition-colors duration-300',
              isFavorite &&
                'fill-brand-orange-400 stroke-brand-orange-400 group-hover/fav:fill-brand-orange-500 group-hover/fav:stroke-brand-orange-500'
            )}
          />
          <span className='text-base font-bold transition-colors duration-300'>
            {isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </span>
        </button>
      ) : (
        <button
          onClick={toggleFavorite}
          disabled={disabled}
          className={clsx(
            'group/fav flex h-10 w-10 items-center justify-center rounded-full border border-brand-grey-400 bg-primary transition-colors duration-300 hover:bg-brand-grey-300',
            disabled && 'text-secondary/40 hover:bg-primary'
          )}
        >
          {isWishlist ? (
            <Trash2 className={'h-6 w-6 stroke-2'} />
          ) : (
            <Heart
              className={clsx(
                'h-6 w-6 stroke-2',
                isFavorite && 'fill-secondary'
              )}
            />
          )}
        </button>
      )}
    </>
  );
}

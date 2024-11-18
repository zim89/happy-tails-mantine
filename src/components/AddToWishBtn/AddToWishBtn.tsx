'use client';

import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { createSelector } from '@reduxjs/toolkit';

import {
  addToFavorites,
  removeFromFavorites,
  selectFavorites,
} from '@/shared/redux/favorites/favoritesSlice';
import { useAppDispatch, useAppSelector } from '@/shared/redux/store';
import { Product } from '@/shared/types/types';
import { useAddFavouriteMutation } from '@/shared/api/favouriteApi';

export interface Props {
  product: Product;
  withText?: boolean;
  disabled?: boolean;
  size?: string;
}
export default function AddToWishBtn({
  withText,
  disabled,
  product,
  size,
}: Props) {
  const [add, { isError, isLoading }] = useAddFavouriteMutation();

  const dispatch = useAppDispatch();
  const isFavourite = useAppSelector(
    createSelector([selectFavorites], (items) =>
      items.some(({ id }) => id === product.id)
    )
  );

  const isWishlist = usePathname() === '/wishlist';

  const toggleFavorite = async () => {
    if (isFavourite) {
      dispatch(removeFromFavorites(product.id));
      return;
    }
    // dispatch(addToFavorites(product));
    await add({
      productId: product.id,
      size: (size
        ? size
        : product.productSizes
          ? product.productSizes[0].size
          : 'ONE SIZE') as NonNullable<Product['productSizes']>[number]['size'],
    }).unwrap();
  };

  return (
    <>
      {withText ? (
        <button
          data-testid='btn-with-text'
          onClick={toggleFavorite}
          disabled={disabled}
          className={clsx(
            'group/fav flex items-center gap-2 whitespace-nowrap bg-primary px-4 py-3 transition-colors duration-300',
            isFavourite
              ? 'text-brand-orange-400 hover:text-brand-orange-500'
              : 'text-secondary hover:text-brand-orange-500',
            disabled && 'text-secondary/40 hover:bg-primary'
          )}
        >
          <Heart
            className={clsx(
              'h-5 w-5 stroke-2 transition-colors duration-300',
              isFavourite &&
                'fill-brand-orange-400 stroke-brand-orange-400 group-hover/fav:fill-brand-orange-500 group-hover/fav:stroke-brand-orange-500'
            )}
          />
          <span className='text-base font-bold transition-colors duration-300'>
            {isFavourite ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </span>
        </button>
      ) : (
        <button
          data-testid='btn-without-text'
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
                isFavourite && 'fill-secondary'
              )}
            />
          )}
        </button>
      )}
    </>
  );
}

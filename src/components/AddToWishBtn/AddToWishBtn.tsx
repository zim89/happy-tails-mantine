'use client';

import { Heart } from 'lucide-react';
import clsx from 'clsx';
import { createSelector } from '@reduxjs/toolkit';

import { selectFavorites } from '@/shared/redux/favorites/favoritesSlice';
import { useAppSelector } from '@/shared/redux/store';
import { Product } from '@/shared/types/types';
import {
  useAddFavouriteMutation,
  useDeleteFavouriteMutation,
} from '@/shared/api/favouriteApi';
import { toast } from 'react-toastify';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';
import Loader from '../Loader';

export interface Props {
  product: Product;
  withText?: boolean;
  disabled?: boolean;
  size: string;
}
export default function AddToWishBtn({
  withText,
  disabled,
  product,
  size,
}: Props) {
  const [add, { isLoading }] = useAddFavouriteMutation();
  const [deleteItem] = useDeleteFavouriteMutation();
  const isFavourite = useAppSelector(
    createSelector([selectFavorites], (items) =>
      items.some(({ id }) => id === product.id)
    )
  );

  const toggleFavorite = async () => {
    try {
      if (isFavourite) {
        await deleteItem({ id: product.id }).unwrap();
        return;
      }

      await add({
        productId: product.id,
        size: size.replaceAll(' ', '_') as NonNullable<
          Product['productSizes']
        >[number]['size'],
      }).unwrap();

      toast.success('Successfully added to wishlist');
    } catch (err) {
      if (isAxiosQueryError(err)) {
        console.log(err);
        toast.error(isErrorDataString(err.data) ? err.data : err.data.message);
      }
    }
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
          {!isLoading ? (
            <Heart
              className={clsx(
                'h-6 w-6 stroke-2',
                isFavourite && 'fill-secondary'
              )}
            />
          ) : (
            <Loader size={24} className='mr-2' />
          )}
        </button>
      )}
    </>
  );
}

import { createSelector } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import {
  useAddFavouriteMutation,
  useDeleteFavouriteMutation,
} from '../api/favouriteApi';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { isAxiosQueryError, isErrorDataString } from '../lib/helpers';
import {
  addToFavorites,
  removeFromFavorites,
  selectFavorites,
} from '@/shared/redux/favorites/favoritesSlice';
import { Product } from '../types/types';

type Props = {
  product?: Product;
  size: string;
};

export const useAddToWishList = ({ product, size }: Props) => {
  const [add, { isLoading }] = useAddFavouriteMutation();
  const [deleteItem, { isLoading: deletionOnProgress }] =
    useDeleteFavouriteMutation();

  const isFavourite = useAppSelector(
    createSelector([selectFavorites], (items) =>
      items.some(({ productId }) => product && productId === product.id)
    )
  );

  const handleDelete = async (id: number) => {
    return await deleteItem({ id }).unwrap();
  };

  const toggleFavorite = async () => {
    if (!product) return;

    try {
      if (isFavourite) {
        await handleDelete(product.id);
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

  return {
    isLoading,
    isFavourite,
    toggleFavorite,
    handleDelete,
    deletionOnProgress,
  };
};

export const useAddToWishListLocal = ({ product, size }: Props) => {
  const dispatch = useAppDispatch();
  const isFavourite = useAppSelector(
    createSelector([selectFavorites], (items) =>
      items.some(({ productId }) => product && productId === product.id)
    )
  );

  const handleDelete = async (id: number) => {
    dispatch(removeFromFavorites(id));
  };

  const toggleFavorite = () => {
    if (!product) return;

    if (isFavourite) {
      handleDelete(product.id);
      return;
    }
    dispatch(
      addToFavorites({
        productArticle: product.article,
        productId: product.id,
        productImagePath: product.imagePath,
        productName: product.name,
        productPrice: product.price,
        productSize: size as any,
        productStatus: product.productStatus,
      })
    );
  };

  return {
    isFavourite,
    toggleFavorite,
    isLoading: false,
    handleDelete,
    deletionOnProgress: false,
  };
};

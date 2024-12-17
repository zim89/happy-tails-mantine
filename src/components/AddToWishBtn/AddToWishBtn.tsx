'use client';

import { Product } from '@/shared/types/types';

import { WishButton } from './ui/WishButton';
import { WishListControllerFactory } from './lib/WishListControllerFactory';
import { useAuth } from '@/shared/hooks/useAuth';

export interface Props {
  size: string;
  product: Product;
  withText?: boolean;
  disabled?: boolean;
}
export default function AddToWishBtn({
  withText,
  disabled,
  product,
  size,
}: Props) {
  const { currentUser } = useAuth();

  const getProps = WishListControllerFactory({
    kind: currentUser ? 'Server' : 'Local',
    product,
    size,
  });
  const { isFavourite, isLoading, toggleFavorite } = getProps();

  return (
    <WishButton
      isFavourite={isFavourite}
      isLoading={isLoading}
      toggleFavorite={toggleFavorite}
      disabled={disabled}
      withText={withText}
    />
  );
}

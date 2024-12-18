'use client';

import { Product } from '@/shared/types/types';

import { WishButton } from './ui/WishButton';
import { useWishListController } from './lib/useWishListController';
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

  const { isFavourite, isLoading, toggleFavorite } = useWishListController({
    kind: currentUser ? 'Server' : 'Local',
    product,
    size,
  });

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

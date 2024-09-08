'use client';

import React, { MouseEventHandler } from 'react';

import { useAppDispatch } from '@/shared/redux/store';
import { Product } from '@/shared/types/types';
import { addToCart, openCartDrawer } from '@/shared/redux/cart/cartSlice';
import { cn } from '@/shared/lib/utils';

export interface Props {
  product: Product;
  size?: string;
}
export default function AddToCartBtn({ product, size }: Props) {
  const dispatch = useAppDispatch();
  const isAvailable = product.productStatus === 'IN STOCK';

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, size: size ?? 'ONE SIZE' }));
    dispatch(openCartDrawer());
  };

  return (
    <button
      role='button'
      disabled={!isAvailable}
      onClick={onClick}
      className={cn(
        'btn btn-cart w-full',
        !isAvailable ? 'btn-disabled' : 'btn-cart'
      )}
    >
      {isAvailable ? 'Add to cart' : 'Out of stock'}
    </button>
  );
}

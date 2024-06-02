'use client';
import React, { MouseEventHandler } from 'react';
import { useAppDispatch } from '@/shared/redux/store';
import { Product } from '@/shared/types/types';
import { addToCart, openCartDrawer } from '@/shared/redux/cart/cartSlice';
import { cn } from '@/shared/lib/utils';

interface Props {
  product: Product;
}
export default function AddToCartBtn({ product }: Props) {
  const dispatch = useAppDispatch();
  // FIX ME
  // const isAvailable = product.productStatus === 'IN STOCK';

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    dispatch(openCartDrawer());
  };

  return (
    <button
      // disabled={!isAvailable}
      onClick={onClick}
      className={cn('btn w-full',
      //  !isAvailable ? 'btn-disabled' : 'btn-cart'
      )}
    >
      Add to cart
      {/* {isAvailable ? 'Add to cart' : 'Out of stock'} */}
    </button>
  );
}

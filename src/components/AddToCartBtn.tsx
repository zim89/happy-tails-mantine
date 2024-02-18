'use client';
import React, { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { useAppDispatch } from '@/shared/redux/store';
import { Product } from '@/shared/types/types';
import { addToCart, openCartDrawer } from '@/shared/redux/cart/cartSlice';

interface Props {
  product: Product;
  disabled?: boolean;
}
export default function AddToCartBtn({ disabled, product }: Props) {
  const dispatch = useAppDispatch();

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    dispatch(openCartDrawer());
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx('btn w-full', disabled ? 'btn-disabled' : 'btn-cart')}
    >
      Add to cart
    </button>
  );
}

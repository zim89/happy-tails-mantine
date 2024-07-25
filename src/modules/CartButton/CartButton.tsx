'use client';
import React, { useCallback } from 'react';
import { Indicator, UnstyledButton } from '@mantine/core';
import { ShoppingBag } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/shared/redux/store';
import {
  closeCartDrawer,
  openCartDrawer,
  selectCart,
} from '@/shared/redux/cart/cartSlice';
import { CartDrawer } from './components/CartDrawer';

export default function CartButton() {
  const dispatch = useAppDispatch();

  const cart = useAppSelector(selectCart);
  const hasItemsInCart = cart.length > 0;

  const openCart = useCallback(() => dispatch(openCartDrawer()), [dispatch]);
  const closeCart = useCallback(() => dispatch(closeCartDrawer()), [dispatch]);

  return (
    <>
      <UnstyledButton
        onClick={openCart}
        className={'group flex items-center justify-center text-secondary'}
        aria-label='View Cart Items'
      >
        <Indicator
          label={cart.length}
          disabled={!hasItemsInCart}
          position='bottom-end'
          color='#F39324'
          size={14}
          offset={5}
          inline
          classNames={{
            indicator: 'p-0 text-[0.625rem]/[1.313rem] font-bold text-black',
          }}
        >
          <ShoppingBag className='iconBtn' />
        </Indicator>
      </UnstyledButton>

      <CartDrawer cart={cart} onClose={closeCart} />
    </>
  );
}

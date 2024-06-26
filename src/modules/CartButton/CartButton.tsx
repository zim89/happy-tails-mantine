'use client';
import { useCallback } from 'react';
import { Drawer, Indicator, ScrollArea, UnstyledButton } from '@mantine/core';
import { ShoppingBag } from 'lucide-react';

import CartHeader from './ui/CartHeader';
import CartItem from './ui/CartItem';
import CartFooter from './ui/CartFooter';

import { useAppDispatch, useAppSelector } from '@/shared/redux/store';
import {
  closeCartDrawer,
  openCartDrawer,
  selectCart,
  selectCartIsOpen,
} from '@/shared/redux/cart/cartSlice';
import { useDeviceSize } from '@/shared/lib/hooks';

export default function CartButton() {
  const dispatch = useAppDispatch();
  const { isTablet } = useDeviceSize();
  const isOpen = useAppSelector(selectCartIsOpen);
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

      <Drawer
        opened={isOpen}
        onClose={closeCart}
        position='right'
        overlayProps={{ backgroundOpacity: 0.2, color: '#161616' }}
        withCloseButton={false}
        size={isTablet ? 529 : '100%'}
        classNames={{
          body: 'flex h-full flex-col p-0',
        }}
      >
        <CartHeader length={cart.length} close={closeCart} />

        <ScrollArea h={'100%'} w={'100%'} type='auto'>
          <div className={'px-9'}>
            {cart.length === 0 ? (
              <p className={'mt-4 text-2xl font-light leading-normal'}>
                Your cart is currently empty.
              </p>
            ) : (
              <ul>
                {cart.map((product) => (
                  <li
                    key={product.id}
                    className={
                      'flex items-center gap-6 border-b border-b-brand-grey-300 px-2 py-4 last:border-none'
                    }
                  >
                    <CartItem product={product} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </ScrollArea>

        <CartFooter length={cart.length} close={closeCart} />
      </Drawer>
    </>
  );
}

'use client';
import React from 'react';
import { Drawer, Indicator, ScrollArea, UnstyledButton } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { ShoppingBag } from 'lucide-react';

import CartHeader from '@/modules/Cart/ui/CartHeader';
import CartItem from '@/modules/Cart/ui/CartItem';
import CartFooter from '@/modules/Cart/ui/CartFooter';

import { useAppSelector } from '@/shared/redux/store';
import { selectCart } from '@/shared/redux/cart/cartSlice';

export default function Cart() {
  const [opened, { open, close }] = useDisclosure(false);
  const cart = useAppSelector(selectCart);
  const tablet = useMediaQuery('(min-width: 768px)');

  return (
    <>
      <UnstyledButton
        onClick={open}
        className={'group flex items-center justify-center text-secondary'}
      >
        <Indicator
          label={cart.length}
          disabled={cart.length === 0}
          position='bottom-end'
          color='#F39324'
          size={10}
          offset={5}
          inline
          classNames={{
            indicator: 'p-0 text-[6px]/[7px] font-bold text-black',
          }}
        >
          <ShoppingBag className='iconBtn' />
        </Indicator>
      </UnstyledButton>

      <Drawer
        opened={opened}
        onClose={close}
        position='right'
        overlayProps={{ backgroundOpacity: 0.2, color: '#161616' }}
        withCloseButton={false}
        size={tablet ? 529 : '100%'}
        classNames={{
          body: 'flex h-full flex-col p-0',
        }}
      >
        <CartHeader length={cart.length} close={close} />

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

        <CartFooter length={cart.length} close={close} />
      </Drawer>
    </>
  );
}

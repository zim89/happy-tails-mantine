'use client';
import React from 'react';
import { NumberFormatter } from '@mantine/core';
import Link from 'next/link';

import { useAppSelector } from '@/shared/redux/store';
import { selectCartTotalPrice } from '@/shared/redux/cart/cartSlice';

interface Props {
  length: number;
  close: () => void;
}

// FIXME: types close
export default function CartFooter({ length, close }: Props) {
  const totalPrice = useAppSelector(selectCartTotalPrice);

  return (
    <>
      {length > 0 && (
        <div
          className={
            'border-t border-t-brand-grey-400 bg-brand-grey-200 px-6 py-4'
          }
        >
          <p
            className={
              'mb-6 flex justify-between text-xl font-bold leading-normal'
            }
          >
            <span>Subtotal</span>
            <NumberFormatter prefix='$ ' value={totalPrice} decimalScale={2} />
          </p>

          <div className={'flex flex-col justify-center gap-4'}>
            <Link href={'/checkout'}>
              <button onClick={close} className={'btn btn-primary w-full'}>
                Proceed to check out
              </button>
            </Link>

            <button onClick={close} className={'btn btn-text'}>
              Continue shopping
            </button>
          </div>
        </div>
      )}
    </>
  );
}

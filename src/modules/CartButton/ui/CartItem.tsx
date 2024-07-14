'use client';
import React, { useRef } from 'react';
import {
  NumberFormatter,
  NumberInput,
  NumberInputHandlers,
} from '@mantine/core';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import clsx from 'clsx';
import { useAppDispatch } from '@/shared/redux/store';
import {
  type CartItem,
  decrementCartItem,
  incrementCartItem,
  removeFromCart,
} from '@/shared/redux/cart/cartSlice';
import noImage from '@/assets/images/no-img.png';
import { COLORS } from '@/shared/constants/colors.const';
import { cn } from '@/shared/lib/utils';

export default function CartItem({ product }: { product: CartItem }) {
  const handlersRef = useRef<NumberInputHandlers>(null);
  const dispatch = useAppDispatch();

  const bgColor = `bg-[${COLORS.find((color) => color.name === product.color)?.hex}]`;

  const handleRemove = (product: CartItem) => {
    dispatch(removeFromCart(product));
  };

  const handleIncrement = (product: CartItem) => {
    dispatch(incrementCartItem(product));
  };
  const handleDecrement = (product: CartItem) => {
    dispatch(decrementCartItem(product));
  };
  return (
    <>
      <div className={'relative h-16 w-16'}>
        <Image
          src={product.imagePath ?? noImage}
          alt={product.name}
          fill
          sizes={'33,33%'}
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className={'grow'}>
        <div className={'mb-2 flex items-center justify-between'}>
          <p className={'text-xs leading-normal'}>{product.article}</p>
          <button
            onClick={() => handleRemove(product)}
            className={
              'rounded-0.5 border border-transparent bg-primary px-2 py-1 text-xs leading-normal text-brand-red-400 transition-colors duration-300 hover:border-brand-red-400 hover:bg-brand-red-400/5'
            }
          >
            Remove
          </button>
        </div>

        <p className={'mb-1 text-base font-bold leading-none'}>
          {product.name}
        </p>

        {product.color && (
          <div className='flex items-center gap-2 py-1.5'>
            <span
              className={cn(
                'inline-block size-4 rounded-full border border-brand-grey-400',
                product.color && bgColor
              )}
            />
            <p className='text-sm/[21px] text-black'>
              {product.color ? product.color : ''}{' '}
              {product.color && product.size !== 'ONE SIZE'
                ? `/ ${product.size}`
                : ''}
            </p>
          </div>
        )}

        <p className={'mb-3 text-sm leading-normal'}>
          Price:{' '}
          <NumberFormatter prefix='$ ' value={product.price} decimalScale={2} />
        </p>

        {/* Number Input*/}
        <div className={'flex items-center justify-between'}>
          <ul
            className={
              'flex w-[110px] items-center rounded-sm border border-brand-grey-400'
            }
          >
            <li className={'relative'}>
              <button
                onClick={() => handleDecrement(product)}
                className={clsx(
                  'p-2',
                  product.count === 1 && 'text-brand-grey-400'
                )}
                disabled={product.count === 1}
              >
                <Minus className='h-4 w-4 stroke-2' />
              </button>
              <div
                className={
                  'absolute -bottom-[2px] -right-[1px] -top-[2px] w-[1px] bg-brand-grey-400'
                }
              ></div>
            </li>
            <li>
              <NumberInput
                handlersRef={handlersRef}
                variant='unstyled'
                clampBehavior='strict'
                hideControls
                allowNegative={false}
                allowDecimal={false}
                step={1}
                min={1}
                max={product.totalQuantity}
                value={product.count}
                readOnly
                classNames={{
                  input: 'text-center text-base font-bold text-secondary',
                }}
              />
            </li>
            <span
              className={
                'disabled: text-center text-base font-bold text-secondary'
              }
            ></span>
            <li className={'relative'}>
              <button
                onClick={() => handleIncrement(product)}
                className={clsx(
                  'p-2',
                  product.count === product.totalQuantity &&
                    'text-brand-grey-400'
                )}
                disabled={product.count === product.totalQuantity}
              >
                <Plus className='h-4 w-4 stroke-2' />
              </button>
              <div
                className={
                  'absolute -bottom-[2px] -left-[1px] -top-[2px] w-[1px] bg-brand-grey-400'
                }
              ></div>
            </li>
          </ul>

          <NumberFormatter
            prefix='$ '
            value={Number(product.count) * product.price}
            decimalScale={2}
            className={'text-xl leading-normal'}
          />
        </div>
      </div>
    </>
  );
}

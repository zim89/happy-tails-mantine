'use client';
import React, { useRef, useState } from 'react';
import {
  Anchor,
  Container,
  NumberInput,
  NumberInputHandlers,
  UnstyledButton,
} from '@mantine/core';
import { Info, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
import { Product } from '@/shared/types/types';
import ProductSlider from '@/modules/Product/ui/ProductSlider';
import AddToWishBtn from '@/components/AddToWishBtn';
import AddToCartBtn from '@/components/AddToCartBtn';

interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props) {
  const handlersRef = useRef<NumberInputHandlers>(null);
  const [quantity, setQuantity] = useState<string | number>(
    product.quantity === 0 ? 0 : 1
  );

  return (
    <>
      <section className='section pt-6 lg:pt-8'>
        <Container>
          <div className='block lg:flex lg:gap-6'>
            {/*  Product Image*/}
            <div className='relative mb-9 h-[341px] w-full overflow-hidden md:mx-auto md:w-[458px] lg:h-[352px] lg:w-[472px]'>
              <Image
                src={product.imagePath}
                alt={product.name}
                priority={true}
                style={{ objectFit: 'cover' }}
                fill
              />
            </div>

            {/*Product Content*/}
            <div>
              {/*Product Header*/}
              <div className='mb-6'>
                <h1 className='text-[32px] font-bold leading-[1.2]'>
                  {product.name}
                </h1>
                <p className='text-sm leading-[1.5] text-brand-grey-800'>
                  {product.article}
                </p>
              </div>

              {/*  Product Price*/}
              <div className='mb-8 flex items-center justify-between border-b border-b-brand-grey-600 md:mb-12 lg:mb-14'>
                <span className='text-[28px] leading-normal'>
                  ${product.price}
                </span>
                <span
                  className={clsx(
                    'badge',
                    product.quantity > 0 ? 'badge-success' : 'badge-muted'
                  )}
                >
                  {product.quantity > 0 ? 'in stock' : 'out of stock'}
                </span>
              </div>

              {/*  Product description*/}
              <p className='mb-6'>{product.description}</p>

              {/*  Additional text*/}
              <p className='mb-8 font-light md:mb-12 lg:mb-14'>
                Please check the{' '}
                <Anchor
                  href='#SizeGuide'
                  target='_blank'
                  underline='never'
                  className='relative font-light text-secondary after:absolute after:bottom-0 after:left-0 after:block after:h-[0.5px] after:w-full after:bg-secondary'
                >
                  Size Guide
                </Anchor>{' '}
                for your correct size before ordering
              </p>

              {/*Product footer*/}
              <div className='mb-6 flex items-center justify-between md:mb-12'>
                {/*Number Input*/}
                <div className='flex w-[158px] items-center rounded-[2px] border border-brand-grey-400'>
                  <UnstyledButton
                    onClick={() => handlersRef.current?.decrement()}
                    className={clsx(
                      'px-4 py-3',
                      quantity === 1 && 'text-brand-grey-400'
                    )}
                    disabled={quantity === 1}
                  >
                    <Minus className='h-5 w-5' />
                  </UnstyledButton>
                  <NumberInput
                    handlersRef={handlersRef}
                    variant='unstyled'
                    clampBehavior='strict'
                    hideControls
                    allowNegative={false}
                    allowDecimal={false}
                    step={1}
                    min={1}
                    max={product.quantity}
                    value={quantity}
                    onChange={setQuantity}
                    classNames={{
                      input: 'px-4 py-2 text-center text-base font-bold',
                    }}
                  />
                  <button
                    onClick={() => handlersRef.current?.increment()}
                    className={clsx(
                      'px-4 py-3',
                      quantity === product.quantity && 'text-brand-grey-400'
                    )}
                    disabled={quantity === product.quantity}
                  >
                    <Plus className='h-5 w-5' />
                  </button>
                </div>

                <div className='flex gap-3'>
                  <div className='hidden md:block md:w-[274px]'>
                    <AddToCartBtn />
                  </div>

                  <AddToWishBtn />
                </div>
              </div>

              <div className='md:hidden'>
                <AddToCartBtn />
              </div>

              <div className='mt-8 flex items-center gap-3 bg-brand-green-200 px-4 py-6'>
                <Info className='h-8 w-8 flex-none stroke-2 text-brand-green-500' />
                <p className='text-base font-bold'>
                  Save 15% on selected Accessories when you spend £50 or more
                  with code PETS24*
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ProductSlider />
    </>
  );
}

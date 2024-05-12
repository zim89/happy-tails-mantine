'use client';

import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Anchor,
  Container,
  NumberInput,
  NumberInputHandlers,
} from '@mantine/core';
import Image from 'next/image';
import { Info, Minus, Plus } from 'lucide-react';

import { Product } from '@/shared/types/types';
import AddToWishBtn from '@/components/AddToWishBtn';
import AddToCartBtn from '@/components/AddToCartBtn';
import Breadcrumbs from '@/components/Breadcrumbs';
import { cn } from '@/shared/lib/utils';
import { SizeGuide } from './components/SizeGuide';
import { useDisclosure } from '@mantine/hooks';
import { useSelectProducts } from '@/shared/hooks/useSelectProducts';

const ProductSlider = dynamic(() => import('./ui/ProductSlider'));

interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props) {
  const [opened, { close, toggle, open }] = useDisclosure();
  const sliderData = useSelectProducts((state) =>
    state.filter(
      (prod) =>
        prod.id !== product.id &&
        product.categoryId === prod.categoryId &&
        prod.productStatus === 'IN STOCK'
    )
  );

  const handlersRef = useRef<NumberInputHandlers>(null);
  const [quantity, setQuantity] = useState<string | number>(
    product.quantity === 0 ? 0 : 1
  );
  const isAvailable = product.productStatus === 'IN STOCK';

  return (
    <>
      <section className='pb-16 lg:pb-28'>
        <Container>
          <Breadcrumbs
            crumbs={[
              { href: '/', text: 'Home' },
              {
                href: `/${product.categoryName.toLowerCase()}`,
                text: product.categoryName,
              },
              { text: product.name },
            ]}
            classNames={{ root: 'p-0 pt-4' }}
          />
          <div className='mb-16 block md:mb-20 lg:mb-28 lg:flex lg:gap-6'>
            {/*  ProductDetails Image*/}
            <div className='relative mb-9 h-[341px] w-full flex-none overflow-hidden md:mx-auto md:w-[458px] lg:h-[352px] lg:w-[472px]'>
              <Image
                src={product.imagePath}
                alt={product.name}
                blurDataURL={product.imagePath}
                priority={true}
                fill
                sizes='(min-width: 1280px) 100vw, 50vw'
                style={{ objectFit: 'contain' }}
              />
            </div>

            {/*ProductDetails Content*/}
            <div>
              {/*ProductDetails Header*/}
              <div className='mb-6'>
                <h1 className='text-[32px] font-bold leading-[1.2]'>
                  {product.name}
                </h1>
                <p className='text-sm leading-[1.5] text-brand-grey-800'>
                  {product.article}
                </p>
              </div>

              {/*  ProductDetails Price*/}
              <div className='mb-8 flex items-center justify-between border-b border-b-brand-grey-600 md:mb-12 lg:mb-14'>
                <span className='text-[28px] leading-normal'>
                  ${product.price}
                </span>
                <span
                  className={cn(
                    'badge',
                    product.quantity > 0 ? 'badge-success' : 'badge-muted'
                  )}
                >
                  {product.quantity > 0 ? 'in stock' : 'out of stock'}
                </span>
              </div>

              {/*  ProductDetails description*/}
              <p className='mb-6'>{product.description}</p>

              {/*  Additional text*/}
              <p className='mb-8 font-light md:mb-12 lg:mb-14'>
                Please check the{' '}
                <Anchor
                  href='#SizeGuide'
                  underline='never'
                  onClick={open}
                  className='relative font-light text-secondary after:absolute after:bottom-0 after:left-0 after:block after:h-[0.5px] after:w-full after:bg-secondary'
                >
                  Size Guide
                </Anchor>{' '}
                for your correct size before ordering
              </p>

              {/* Size guiding table */}
              <SizeGuide opened={opened} onClose={close} onToggle={toggle} />

              {/*ProductDetails footer*/}
              <div className='mb-6 flex items-center justify-between md:mb-12'>
                {/*Number Input*/}
                <div className='flex w-[158px] min-w-[158px] items-center rounded-[2px] border border-brand-grey-400'>
                  <button
                    onClick={() => handlersRef.current?.decrement()}
                    disabled={quantity === 1 || !isAvailable}
                    className={cn(
                      'px-4 py-3',
                      (quantity === 1 || !isAvailable) && 'text-brand-grey-400'
                    )}
                  >
                    <Minus className='h-5 w-5' />
                  </button>
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
                    readOnly
                    classNames={{
                      input:
                        'form-input border-0 px-4 py-2 text-center text-base font-bold',
                    }}
                  />
                  <button
                    onClick={() => handlersRef.current?.increment()}
                    disabled={quantity === product.quantity || !isAvailable}
                    className={cn(
                      'px-4 py-3',
                      (quantity === product.quantity || !isAvailable) &&
                        'text-brand-grey-400'
                    )}
                  >
                    <Plus className='h-5 w-5' />
                  </button>
                </div>

                <div className='flex w-[458px] gap-3'>
                  <div className='hidden w-full md:block md:max-w-[274px]'>
                    <AddToCartBtn product={product} />
                  </div>

                  <AddToWishBtn withText product={product} />
                </div>
              </div>

              <div className='md:hidden'>
                <AddToCartBtn product={product} />
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

          {sliderData.length > 0 && (
            <ProductSlider
              data={sliderData}
              targetCategory={product.categoryName}
            />
          )}
        </Container>
      </section>
    </>
  );
}

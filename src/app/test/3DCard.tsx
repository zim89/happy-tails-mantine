'use client';

import { NumberFormatter, UnstyledButton } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { Product } from '@/shared/types/types';
import AddToCartBtn from '@/components/AddToCartBtn/AddToCartBtn';
import AddToWishBtn from '@/components/AddToWishBtn/AddToWishBtn';
import { cn } from '@/shared/lib/utils';
import { generateColorList } from '@/shared/helpers/colors.helpers';
import { generateSizes } from '@/shared/helpers/size.helpers';

import Sketchfab from './sketchfab-viewer';

interface Props {
  product: Product & { uuid?: string };
  router?: AppRouterInstance;
}

export default function Product3DCard({ product, router }: Props) {
  const [shown3D, setShown3D] = useState(false);
  const [viewedColors, setViewedColors] = useState<[number, number]>([0, 3]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const isAvailable = product.productStatus === 'IN STOCK';
  const desktop = useMediaQuery(`(min-width: 1280px)`);
  const colorList = generateColorList(product);

  const sizes = generateSizes(product.productSizes);

  const [selectedSize, setSelectedSize] = useState(
    sizes.length > 0 ? sizes.find((item) => item.isAvailable) : null
  );

  useEffect(() => {
    if (iframeRef.current && product.uuid) {
      const sketchfab = new Sketchfab('1.12.1', iframeRef.current);

      sketchfab.init(product.uuid, {
        success: (api) => {
          console.log('Sketchfab viewer initialized successfully');
          // You can now use the API to control the viewer
        },
        error: (error) => {
          console.error('Error initializing Sketchfab viewer:', error);
        },
      });

      sketchfab.show();
    }
  }, [product.uuid, iframeRef.current]);

  return (
    <Link href={`/products/${product.id}`}>
      <div
        className='group/card h-[479px] max-w-[382px] cursor-pointer rounded-0.5 border border-brand-grey-400 p-7 hover:shadow-card md:w-[340px] lg:h-[460px] lg:w-[373px]'
        onClick={() => router?.push(`/products/${product.id}`)}
      >
        <div
          className={cn(
            'h-full overflow-hidden',
            !isAvailable && 'text-secondary/40'
          )}
        >
          <div
            className={cn(
              'relative mb-5 transition-all duration-500',
              desktop ? 'h-[287px]' : 'h-[223px]',
              sizes.length > 0
                ? 'group-hover/card:h-[170px]'
                : 'group-hover/card:h-[223px]',
              !isAvailable ? 'grayscale' : 'grayscale-0'
            )}
          >
            {!shown3D ? (
              <Image
                src={product.imagePath ?? '/images/no-img.png'}
                alt={product.name}
                fill
                priority={true}
                sizes='100%'
                style={{
                  objectFit: 'contain',
                }}
              />
            ) : (
              <iframe
                ref={iframeRef}
                className={cn('h-full w-full')}
                allow='autoplay; fullscreen; xr-spatial-tracking'
                xr-spatial-tracking
                execution-while-out-of-viewport
                execution-while-not-rendered
                web-share
                allowFullScreen
              />
            )}
          </div>

          <div className='mb-2 flex h-[18px] items-center justify-between'>
            <p className='text-start text-xs leading-normal'>
              {product.article}
            </p>
            <ul className='hidden lg:flex lg:gap-2'>
              {colorList.length > 0 &&
                colorList.slice(...viewedColors).map((item) => {
                  return (
                    <li key={item.productId}>
                      <Link
                        href={item.href}
                        className={cn(
                          'inline-block size-[18px] rounded-full border border-brand-grey-400',
                          item.colorName === product.color && 'border-2'
                        )}
                        style={{
                          backgroundColor: item.colorHex,
                        }}
                      />
                    </li>
                  );
                })}
              {colorList.length > 3 && (
                <li className='-mt-[2px] text-sm/[21px] text-brand-grey-800'>
                  <UnstyledButton
                    onClick={(e) => {
                      e.preventDefault();

                      if (colorList.length === viewedColors[1]) {
                        return setViewedColors([0, 3]);
                      }

                      setViewedColors([
                        viewedColors[0] + 3,
                        Math.min(viewedColors[1] + 3, colorList.length),
                      ]);
                    }}
                  >
                    + {colorList.slice(3).length}
                  </UnstyledButton>
                </li>
              )}
            </ul>
          </div>

          <p className='mb-3 h-12 text-xl font-bold leading-none'>
            {product.name}
          </p>

          <p
            className={cn(
              'relative text-start text-base',
              sizes.length === 0 && 'mb-5'
            )}
          >
            <NumberFormatter
              prefix='$ '
              value={product.price}
              decimalScale={2}
            />
            {product.uuid && (
              <UnstyledButton
                className={cn(
                  'absolute right-12 top-1/2 z-10 -translate-y-1/2 contrast-0 filter transition-all duration-300 lg:opacity-0 lg:group-hover/card:opacity-100',
                  shown3D && 'contrast-100'
                )}
                onClick={(e) => {
                  e.preventDefault();

                  setShown3D(!shown3D);
                }}
              >
                <Image
                  src='/icons/cube.svg'
                  width={32}
                  height={32}
                  alt='3D view'
                />
              </UnstyledButton>
            )}
            <span
              onClick={(e) => e.preventDefault()}
              className='absolute right-0 top-1/2 z-10 -translate-y-1/2 transition-all duration-300 lg:opacity-0 lg:group-hover/card:opacity-100'
            >
              <AddToWishBtn
                product={product}
                size={selectedSize?.size || 'ONE SIZE'}
              />
            </span>
          </p>

          {sizes.length > 0 && (
            <ul className='flex justify-between py-5'>
              {sizes.map((item) => (
                <li key={item.size}>
                  <button
                    disabled={!item.isAvailable}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSize(item);
                    }}
                    className={cn(
                      'flex h-8 w-12 items-center justify-center rounded-3xl border border-brand-grey-400 text-base text-black disabled:text-brand-grey-400',
                      item.size === selectedSize?.size &&
                        'border-2 border-black'
                    )}
                  >
                    {item.size}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <AddToCartBtn product={product} count={1} size={selectedSize?.size} />
        </div>
      </div>
    </Link>
  );
}

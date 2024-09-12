'use client';

import { NumberFormatter } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Product } from '@/shared/types/types';
import AddToCartBtn from '@/components/AddToCartBtn/AddToCartBtn';
import AddToWishBtn from '@/components/AddToWishBtn/AddToWishBtn';
import { cn } from '@/shared/lib/utils';
import { generateColorList } from '@/shared/helpers/colors.helpers';
import { useState } from 'react';
import { generateSizes } from '@/shared/helpers/size.helpers';
import { BG_COLORS } from '@/shared/constants/colors.const';

interface Props {
  product: Product;
  router?: AppRouterInstance;
}
export default function ProductCard({ product, router }: Props) {
  const isAvailable = product.productStatus === 'IN STOCK';
  const desktop = useMediaQuery(`(min-width: 1280px)`);
  const colorList = generateColorList(product);

  const sizes = generateSizes(product.productSizes);
  const [selectedSize, setSelectedSize] = useState(
    sizes.length > 0 ? sizes.find((item) => item.isAvailable) : null
  );

  return (
    <div
      className='group/card h-[479px] max-w-[382px] cursor-pointer rounded-0.5 border border-brand-grey-400 p-7 hover:shadow-card md:w-[340px] lg:w-[373px]'
      onClick={() => router?.push(`/products/${product.id}`)}
    >
      <div
        className={clsx(
          'h-full overflow-hidden',
          !isAvailable && 'text-secondary/40'
        )}
      >
        <Link href={`/products/${product.id}`}>
          <div
            className={clsx(
              'relative mb-5 transition-all duration-500',
              desktop ? 'h-[287px]' : 'h-[223px]',
              sizes.length > 0
                ? 'group-hover/card:h-[170px]'
                : 'group-hover/card:h-[223px]',
              !isAvailable ? 'grayscale' : 'grayscale-0'
            )}
          >
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
          </div>
        </Link>

        <div className='mb-2 flex h-[18px] items-center justify-between'>
          <p className='text-start text-xs leading-normal'>{product.article}</p>
          <ul className='hidden lg:flex lg:gap-2'>
            {colorList.length > 0 &&
              colorList
                .filter((item) => item.colorName !== product.color)
                .map((item) => {
                  return (
                    <li key={item.productId}>
                      <Link
                        href={item.href}
                        className={cn(
                          `inline-block size-[18px] rounded-full border border-brand-grey-400`,
                          BG_COLORS[item.colorName]
                        )}
                      />
                    </li>
                  );
                })}
          </ul>
        </div>

        <p className='mb-3 h-12 text-xl font-bold leading-none'>
          {product.name}
        </p>

        <p
          className={clsx(
            'relative text-start text-base',
            sizes.length === 0 && 'mb-5'
          )}
        >
          <NumberFormatter prefix='$ ' value={product.price} decimalScale={2} />
          <span className='absolute right-0 top-1/2 z-10 -translate-y-1/2 transition-all duration-300 lg:opacity-0 lg:group-hover/card:opacity-100'>
            <AddToWishBtn product={product} />
          </span>
        </p>

        {sizes.length > 0 && (
          <ul className='flex justify-between py-5'>
            {sizes.map((item) => (
              <li key={item.size}>
                <button
                  disabled={!item.isAvailable}
                  onClick={() => setSelectedSize(item)}
                  className={cn(
                    'flex h-8 w-12 items-center justify-center rounded-3xl border border-brand-grey-400 text-base text-black disabled:text-brand-grey-400',
                    item.size === selectedSize?.size && 'border-2 border-black'
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
  );
}

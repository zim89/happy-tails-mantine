'use client';
import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Product } from '@/shared/types/types';
import AddToCartBtn from '@/components/AddToCartBtn';
import AddToWishBtn from '@/components/AddToWishBtn';

interface Props {
  product: Product;
  router?: AppRouterInstance;
}
export default function ProductCard({ product, router }: Props) {
  const isAbsent = product.productStatus === 'TEMPORARILY_ABCENT';
  const desktop = useMediaQuery(`(min-width: 1280px)`);

  return (
    <div
      className='hover:shadow-card rounded-0.5 group/card h-[479px] max-w-[382px] cursor-pointer border border-brand-grey-400 p-7 md:w-[340px] lg:w-[373px]'
      onClick={() => router?.push(`/products/${product.id}`)}
    >
      <div
        className={clsx(
          'h-full overflow-hidden',
          isAbsent && 'text-secondary/40'
        )}
      >
        <Link href={`/products/${product.id}`}>
          <div
            className={clsx(
              'relative mb-5 transition-all duration-500',
              desktop ? 'h-[287px] group-hover/card:h-[223px]' : 'h-[223px]',
              isAbsent ? 'grayscale' : 'grayscale-0'
            )}
          >
            <Image
              src={product.imagePath}
              alt={product.name}
              fill
              priority={true}
              sizes='100%'
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
          <p className='mb-2 text-xs leading-normal'>{product.article}</p>
          <p className='mb-3 h-12 text-xl font-bold leading-none'>
            {product.name}
          </p>
        </Link>

        <p className={clsx('relative mb-5 text-base')}>
          $ {product.price}{' '}
          <span className='absolute right-0 top-1/2 z-10 -translate-y-1/2 transition-all duration-300 lg:opacity-0 lg:group-hover/card:opacity-100'>
            <AddToWishBtn />
          </span>
        </p>

        <AddToCartBtn disabled={isAbsent} />
      </div>
    </div>
  );
}

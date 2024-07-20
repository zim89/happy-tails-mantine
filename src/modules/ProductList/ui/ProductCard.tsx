'use client';

import { NumberFormatter } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import noImage from '@/assets/images/no-img.png';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Product } from '@/shared/types/types';
import AddToCartBtn from '@/components/AddToCartBtn';
import AddToWishBtn from '@/components/AddToWishBtn';
import { cn } from '@/shared/lib/utils';
import { generateColorList } from '@/shared/helpers/colors.helpers';

interface Props {
  product: Product;
  router?: AppRouterInstance;
}
export default function ProductCard({ product, router }: Props) {
  const isAvailable = product.productStatus === 'IN STOCK';
  const desktop = useMediaQuery(`(min-width: 1280px)`);
  const colorList = generateColorList(product);

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
              desktop ? 'h-[287px] group-hover/card:h-[223px]' : 'h-[223px]',
              !isAvailable ? 'grayscale' : 'grayscale-0'
            )}
          >
            <Image
              src={product.imagePath ?? noImage}
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

        <div className='mb-2 flex items-center justify-between'>
          <p className='text-xs leading-normal'>{product.article}</p>
          <ul className='hidden lg:flex lg:gap-2'>
            {colorList.length > 0 &&
              colorList
                .filter((item) => item.colorName !== product.color)
                .map((item) => {
                  const bgColor = `bg-[${item.colorHex}]`;
                  return (
                    <li key={item.productId}>
                      <Link
                        href={item.href}
                        className={cn(
                          `inline-block size-[18px] rounded-full`,
                          bgColor
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

        <p className={clsx('relative mb-5 text-start text-base')}>
          <NumberFormatter prefix='$ ' value={product.price} decimalScale={2} />
          <span className='absolute right-0 top-1/2 z-10 -translate-y-1/2 transition-all duration-300 lg:opacity-0 lg:group-hover/card:opacity-100'>
            <AddToWishBtn product={product} />
          </span>
        </p>

        <AddToCartBtn product={product} />
      </div>
    </div>
  );
}

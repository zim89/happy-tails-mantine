'use client';

import { NumberFormatter, UnstyledButton } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import AddToCartBtn from '@/components/AddToCartBtn/AddToCartBtn';
import { Favourite } from '@/shared/types/favourite.types';
import { useSelectProducts } from '@/shared/hooks/useSelectProducts';
import Loader from '@/components/Loader';
import { cn } from '@/shared/lib/utils';
import { BG_COLORS } from '@/shared/constants/colors.const';
import { useWishListController } from '@/components/AddToWishBtn/lib/useWishListController';
import { useAuth } from '@/shared/hooks/useAuth';

type Props = {
  favourite: Favourite;
  router?: AppRouterInstance;
};

export const FavouriteCard = ({ favourite, router }: Props) => {
  const { currentUser } = useAuth();

  const sourceProduct = useSelectProducts((state) => {
    return state.find((p) => p.id === favourite.productId);
  });

  const { handleDelete, deletionOnProgress } = useWishListController(
    currentUser
      ? { kind: 'Server', product: sourceProduct, size: favourite.productSize }
      : {
          kind: 'Local',
          product: sourceProduct,
          size: favourite.productSize,
        }
  );

  const isAvailable = favourite.productStatus === 'IN STOCK';

  const deleteFavourite = async (id: number) => {
    try {
      await handleDelete(id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className='group/card h-[400px] max-w-[382px] cursor-pointer rounded-0.5 border border-brand-grey-400 p-7 hover:shadow-card md:w-[340px] lg:h-[430px] lg:w-[373px]'
      onClick={() => router?.push(`/products/${favourite.productId}`)}
    >
      <div
        className={cn(
          'h-full overflow-hidden',
          !isAvailable && 'text-secondary/40'
        )}
      >
        <div
          className={cn(
            'relative mb-5 h-[170px] transition-all duration-500 group-hover/card:h-[170px] lg:h-[250px]',
            !isAvailable ? 'grayscale' : 'grayscale-0'
          )}
        >
          <Image
            src={favourite.productImagePath ?? '/images/no-img.png'}
            alt={favourite.productName}
            fill
            priority={true}
            sizes='100%'
            style={{
              objectFit: 'contain',
            }}
          />
        </div>

        <div className='mb-2 flex h-[18px] items-center justify-between'>
          <p className='text-start text-xs leading-normal'>
            {favourite.productArticle}
          </p>
        </div>
        <Link href={`/products/${favourite.productId}`}>
          <p className='mb-3 h-12 text-xl font-bold leading-none transition-colors hover:text-brand-orange-400'>
            {favourite.productName}
          </p>
        </Link>
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <p className='relative text-start text-base'>
              <NumberFormatter
                prefix='$ '
                value={favourite.productPrice}
                decimalScale={2}
              />
            </p>
            {favourite.productSize !== 'ONE SIZE' && (
              <div className='flex h-8 w-12 items-center justify-center rounded-3xl border-2 border-black text-base text-black disabled:text-brand-grey-400'>
                {favourite.productSize}
              </div>
            )}
            {sourceProduct?.color && sourceProduct.color !== 'ONE COLOR' && (
              <span
                className={
                  'inline-block size-6 rounded-full border-2 border-brand-grey-400'
                }
                style={{
                  backgroundColor: BG_COLORS[sourceProduct.color],
                }}
              />
            )}
          </div>
          {!deletionOnProgress ? (
            <UnstyledButton
              classNames={{
                root: 'bg-transparent flex items-center gap-1 text-brand-red-400 hover:text-brand-red-500',
              }}
              onClick={(e) => {
                e.stopPropagation();
                deleteFavourite(favourite.productId);
              }}
            >
              <Trash2 size={16} />
              Remove
            </UnstyledButton>
          ) : (
            <Loader className='mr-6 mt-2' size={16} />
          )}
        </div>

        {sourceProduct && (
          <div className='mt-4 lg:mt-14'>
            <AddToCartBtn
              product={sourceProduct}
              count={1}
              size={favourite.productSize || 'ONE SIZE'}
            />
          </div>
        )}
      </div>
    </div>
  );
};

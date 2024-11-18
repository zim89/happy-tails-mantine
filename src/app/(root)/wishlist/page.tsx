'use client';

import React, { useState } from 'react';
import { Breadcrumbs, Container, Group, Pagination } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import Link from 'next/link';
import { Heart } from 'lucide-react';

import PaginationNextBtn from '@/components/PaginationNextBtn/PaginationNextBtn';
import PaginationPrevBtn from '@/components/PaginationPrevBtn/PaginationPrevBtn';
import ProductList from '@/modules/ProductList';
import { useAppSelector } from '@/shared/redux/store';
import { selectFavorites } from '@/shared/redux/favorites/favoritesSlice';
import { useFindManyQuery } from '@/shared/api/favouriteApi';
import { FavouriteList } from '@/modules/FavouriteList';

export default function Page() {
  const { data, isLoading } = useFindManyQuery({ page: 0, limit: 10000000000 });

  // const favorites = useAppSelector(selectFavorites);
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 10,
    duration: 500,
  });
  const [activePage, setPage] = useState(1);
  const [limit] = useState(6);

  const onPaginationChange = (value: number) => {
    setPage(value);
    scrollIntoView();
  };

  return (
    <>
      <div className='container'>
        <Breadcrumbs
          classNames={{
            root: '[--bc-separator-margin:2px] text-xs/normal py-4 mb-4 md:max-lg:mb-3 lg:text-sm/normal',
            separator: 'text-secondary text-xs/normal',
          }}
        >
          <Link href='/'>Home</Link>
          <span className='text-brand-grey-600'>Wishlist</span>
        </Breadcrumbs>

        <h2 className='text-center text-[1.75rem]/normal font-bold md:text-4xl/normal'>
          Your Wishlist Products
        </h2>
      </div>

      {!data ||
        (data.content.length === 0 && (
          <section className={'pb-24 pt-12 md:pb-36 lg:pt-16'}>
            <div className='container'>
              <h3
                className={
                  'mb-2 text-center text-2xl/normal font-light md:mx-auto md:w-[400px] lg:w-full'
                }
              >
                Your Wishlist is empty! Start adding items now.
              </h3>
              <p
                className={
                  'mb-8 text-center text-base font-light md:mx-auto md:w-[448px] lg:w-[552px]'
                }
              >
                The Wishlist feature simplifies the process of tracking
                everything you adore and your shopping activities, whether
                you&apos;re using your computer, phone, or tablet. No more
                wasting time searching for that item you loved on your phone the
                other day—it&apos;s all conveniently stored in one place!
              </p>

              <div className={'flex justify-center'}>
                <Link
                  href={'/products'}
                  className={'btn btn-primary inline-block w-full md:w-auto'}
                >
                  Continue shopping
                </Link>
              </div>
            </div>
          </section>
        ))}

      {data && data.content.length > 0 && (
        <section className={'py-12 md:py-16'}>
          {data.content.length > 0 && (
            <div className={'mb-6 bg-brand-grey-200 md:mb-8 md:bg-transparent'}>
              <div className='container'>
                <div
                  className={
                    'flex gap-3 py-4 md:rounded-0.5 md:bg-brand-grey-200 md:px-6'
                  }
                >
                  <Heart className={'h-6 w-6 fill-secondary'} />
                  <p>
                    You currently have{' '}
                    <span className={'font-bold'}>
                      {data.content.length} items
                    </span>{' '}
                    on your list.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className='container' ref={targetRef}>
            {/* <ProductList
              data={data.content.slice(
                (activePage - 1) * limit,
                activePage * limit
              )}
            /> */}
            <FavouriteList favourites={data.content} />
            {data.content.length > limit && (
              <Pagination.Root
                mt={{ base: 24, md: 48, lg: 72 }}
                value={activePage}
                onChange={onPaginationChange}
                total={
                  data.content.length % limit > 0
                    ? ~~(data.content.length / limit) + 1
                    : data.content.length / limit
                }
                siblings={1}
                classNames={{
                  control: 'pagination-control',
                  dots: 'pagination-dots',
                }}
              >
                <Group gap={0} justify='center'>
                  <div
                    className={
                      'flex justify-center gap-0 rounded-0.5 border border-brand-grey-400'
                    }
                  >
                    <Pagination.Previous icon={PaginationPrevBtn} />
                    <Pagination.Items />
                    <Pagination.Next icon={PaginationNextBtn} />
                  </div>
                </Group>
              </Pagination.Root>
            )}
          </div>
        </section>
      )}
    </>
  );
}

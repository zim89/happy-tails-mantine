'use client';

import { useScrollIntoView } from '@mantine/hooks';
import { Group, Pagination } from '@mantine/core';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ITEMS_LIMIT_PER_PAGE } from '@/shared/config/appVariables';
import PaginationPrevBtn from '@/components/PaginationPrevBtn';
import PaginationNextBtn from '@/components/PaginationNextBtn';
import { useDeviceSize } from '@/shared/lib/hooks';
import { useAuth } from '@/shared/hooks/useAuth';

import { EmptyPage } from './components/EmptyPage';
import { FavouriteListHeader } from './components/FavouriteListHeader';
import { FavouriteGrid } from './components/FavouriteGrid';
import { FavouriteSkeleton } from './components/FavouriteSkeleton';
import { useFindManyQuery } from '@/shared/api/favouriteApi';
import { useAppSelector } from '@/shared/redux/store';
import { selectFavorites } from '@/shared/redux/favorites/favoritesSlice';

export const FavouriteList = () => {
  const { currentUser } = useAuth();
  const [page, setPage] = useState(1);

  const { data: serverFavourites, isLoading } = useFindManyQuery(
    {
      page: page - 1,
      limit: ITEMS_LIMIT_PER_PAGE,
    },
    {
      skip: !currentUser,
    }
  );

  const localFavourites = useAppSelector(selectFavorites);

  const favourites = serverFavourites?.content || localFavourites;

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 10,
    duration: 500,
  });

  const searchParams = useSearchParams();
  const { isMobile } = useDeviceSize();
  const path = usePathname();
  const { replace } = useRouter();

  const onPaginationChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    replace(`${path}?${params.toString()}`);
    setPage(() => page);
    scrollIntoView();
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!params.has('page')) return;

    if (params.get('page')! === '1' && Number(params.get('page')!) !== page) {
      setPage(1);
    } else if (params.get('page')) {
      setPage(Number(params.get('page')!));
    }
  }, [page, searchParams]);

  if (isLoading) return <FavouriteSkeleton />;

  return (
    <>
      {(!favourites || favourites.length === 0) && <EmptyPage />}
      {favourites && favourites.length && (
        <section className='py-12 md:py-16'>
          {/* Header */}
          <FavouriteListHeader favNumber={favourites.length} />

          {/* Products' grid */}
          <div className='container' ref={targetRef}>
            <FavouriteGrid items={favourites} />

            {/* Pagination */}
            {favourites.length >= ITEMS_LIMIT_PER_PAGE && (
              <Pagination.Root
                mt={{ base: 24, md: 48, lg: 72 }}
                value={page}
                onChange={onPaginationChange}
                total={favourites.length / 12}
                siblings={isMobile ? 0 : 1}
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
};

'use client';
import dynamic from 'next/dynamic';

import { useFindManyQuery } from '@/shared/api/productApi';
import { Group, Pagination } from '@mantine/core';
import PaginationNextBtn from '@/components/PaginationNextBtn';
import PaginationPrevBtn from '@/components/PaginationPrevBtn';
import { useScrollIntoView } from '@mantine/hooks';
import { useContext, useEffect, useMemo, useState } from 'react';
import { FilterX } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ProductCountContext } from './ProductCountContext';
import { useDeviceSize } from '@/shared/lib/hooks';
import type { Category, Sort } from '@/shared/types/types';

const RawProductList = dynamic(() => import('@/modules/ProductList'));

const limit = 12;

export type CatalogProductListProps = {
  category?: Category;
};

export default function CatalogProductList({
  category,
}: CatalogProductListProps) {
  const [_, setProductCount] = useContext(ProductCountContext);
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const path = usePathname();
  const { replace } = useRouter();
  const { isMobile, isTablet, isDesktop } = useDeviceSize();

  const onPaginationChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    replace(`${path}?${params.toString()}`);
    setPage(() => page);
    scrollIntoView();
  };

  let filter = useMemo(() => {
    if (
      !searchParams.has('category') ||
      !searchParams.has('price') ||
      !searchParams.has('productSize') ||
      !searchParams.has('color') ||
      !searchParams.has('inStock')
    )
      return;

    return {
      category: searchParams.get('category')!,
      price: searchParams.get('price')!,
      size: searchParams.get('productSize')!,
      color: searchParams.get('color')!,
      onlyInStock: searchParams.get('inStock') === 'true',
    };
  }, [searchParams]);

  const { data, error, isLoading } = useFindManyQuery({
    categoryId: category?.id,
    page: page - 1,
    limit,
    filter,
    name: searchParams.has('name') ? searchParams.get('name')! : '',
    sort: searchParams.get('sort')?.split('-') as Sort | undefined,
  });

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: isDesktop ? 214 : isTablet ? 176 : 144,
    duration: 500,
  });

  useEffect(() => {
    setProductCount(data?.totalElements ?? 0);
  }, [data?.totalElements, setProductCount]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (
      params.has('page') &&
      params.get('page')! === '1' &&
      Number(params.get('page')!) !== page
    )
      setPage(1);
  }, [page, searchParams]);

  if (isLoading)
    return (
      <div>
        <p className='mb-[6.1875rem] mt-8 text-center font-light text-brand-grey-700 md:mb-36 md:text-2xl/normal'>
          Loading...
        </p>
      </div>
    );

  if (error || !data)
    return (
      <div>
        <p className='mb-[6.1875rem] mt-8 text-center font-light text-brand-grey-700 md:mb-36 md:text-2xl/normal'>
          Something went wrong...
        </p>
      </div>
    );

  return (
    <div ref={targetRef}>
      {!data.empty ? (
        <div className='mb-12 mt-4 md:mb-16 md:max-lg:mt-6 lg:mb-[4.5rem]'>
          <RawProductList data={data.content} />

          {data.totalElements > limit && (
            <Pagination.Root
              mt={{ base: 24, md: 48, lg: 72 }}
              value={page}
              onChange={onPaginationChange}
              total={data.totalPages}
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
      ) : (
        <p className='mb-[6.1875rem] mt-8 text-center font-light text-brand-grey-700 md:mb-36 md:text-2xl/normal'>
          {filter ? (
            <span>
              <FilterX className='mr-2 inline-block' />
              No matching results
            </span>
          ) : (
            'There are no products in this category yet'
          )}
        </p>
      )}
    </div>
  );
}

'use client';

import { Category } from '@/shared/api/categoryApi';
import RawProductList from '@/modules/ProductList';
import { useFindAllByCategoryQuery } from '@/shared/api/productApi';
import { Group, Pagination } from '@mantine/core';
import PaginationNextBtn from '@/components/PaginationNextBtn';
import PaginationPrevBtn from '@/components/PaginationPrevBtn';
import { useScrollIntoView } from '@mantine/hooks';
import { useState } from 'react';

const limit = 12;

export default function ProductList({ category }: { category: Category }) {
  const [page, setPage] = useState(1);

  const onPaginationChange = (page: number) => {
    setPage(page);
    scrollIntoView();
  };

  const { data, error, isLoading } = useFindAllByCategoryQuery({
    id: category.id,
    page: page - 1,
    limit,
  });

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 10,
    duration: 500,
  });

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
          <Pagination.Root
            mt={{ base: 24, md: 48, lg: 72 }}
            value={page}
            onChange={onPaginationChange}
            total={data.totalPages}
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
        </div>
      ) : (
        <p className='mb-[6.1875rem] mt-8 text-center font-light text-brand-grey-700 md:mb-36 md:text-2xl/normal'>
          There are no products in this category yet
        </p>
      )}
    </div>
  );
}

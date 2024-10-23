'use client';

import { Group, Pagination, Select } from '@mantine/core';
import { ChevronDown } from 'lucide-react';
import { Table } from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';

import PaginationPrevBtn from '../PaginationPrevBtn/PaginationPrevBtn';
import PaginationNextBtn from '../PaginationNextBtn/PaginationNextBtn';
import { useSearchString } from '@/shared/helpers/searchParams.helpers';

export type Props<T> = {
  visible?: boolean;
  table: Table<T>;
  segment?: string;
};

export const TablePagination = <T,>({ visible, table, segment }: Props<T>) => {
  const router = useRouter();
  const params = useSearchParams();
  const [createQueryString] = useSearchString(params);
  const limit = params.get('limit') || '10';
  const page = params.get('page') || '1';

  const paginate = (value: number) => {
    table.setPageIndex(value - 1);

    let path =
      '?' +
      createQueryString({
        page: `${value}`,
      });

    if (segment) path = path.concat(segment);

    router.push(path);
  };

  const handleSelect = (value: string) => {
    table.setPageSize(Number(value));

    let path =
      '?' +
      createQueryString({
        page: '1',
        limit: value,
      });

    if (segment) path = path.concat(segment);

    router.replace(path);
  };

  return (
    <div className='mt-[46px] flex flex-col justify-between gap-4 md:flex-row md:items-center print:hidden'>
      {table.getRowCount() > 0 && (
        <Select
          label='Results Per Page'
          value={limit}
          withCheckIcon={false}
          rightSection={<ChevronDown className='text-secondary' />}
          onChange={(value) => value && handleSelect(value)}
          data={['10', '20', '30', '40', '50']}
          classNames={{
            root: 'form-root flex items-center',
            label: 'form-label mr-2',
            input: 'form-input w-[4.3125rem] font-bold',
          }}
        />
      )}

      {visible && (
        <Pagination.Root
          value={Number(page)}
          onChange={paginate}
          total={table.getPageCount()}
          classNames={{
            root: 'self-start',
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
  );
};

import { Group, Pagination, Select } from '@mantine/core';
import { ChevronDown } from 'lucide-react';
import { Table } from '@tanstack/react-table';

import PaginationPrevBtn from './PaginationPrevBtn';
import PaginationNextBtn from './PaginationNextBtn';

type Props<T> = {
  visible?: boolean;
  table: Table<T>;
};

export const TablePagination = <T,>({ visible, table }: Props<T>) => {
  if (!visible) return;

  const paginate = (value: number) => {
    table.setPageIndex(value - 1);
  };

  return (
    <div className='mt-[46px] flex items-center justify-between'>
      <Select
        label='Results Per Page'
        withCheckIcon={false}
        rightSection={<ChevronDown className='text-secondary' />}
        value={table.getState().pagination.pageSize.toString()}
        onChange={(value) => {
          table.setPageSize(Number(value));
        }}
        data={['10', '20', '30', '40', '50']}
        classNames={{
          root: 'form-root flex items-center',
          label: 'form-label mr-2',
          input: 'form-input w-[4.3125rem] font-bold',
        }}
      />

      <Pagination.Root
        value={table.getState().pagination.pageIndex + 1}
        onChange={paginate}
        total={table.getPageCount()}
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
  );
};

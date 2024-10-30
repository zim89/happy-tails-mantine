'use client';

import { UnstyledButton } from '@mantine/core';
import {
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { Order } from '@/shared/types/types';

import classes from '../classes.module.css';
import { EntriesCount } from '@/components/EntriesCount/EntriesCount';
import { SearchEntry } from '@/components/SearchEntry';
import { useDebouncedState } from '@mantine/hooks';
import { CustomBadge } from '@/components/Badge';
import { EmptyRow } from '@/components/EmptyRow/EmptyRow';
import { TablePagination } from '@/components/TablePagination/TablePagination';
import dayjs from 'dayjs';
import {
  removeSearchParams,
  useSearchString,
} from '@/shared/helpers/searchParams.helpers';
import { useRouter, useSearchParams } from 'next/navigation';
import { ResizableTable } from '@/components/ResizableTable';
import { MemoizedTableBody } from '@/components/TableBody';
import {
  DEFAULT_TABLE_SIZE,
  MAX_TABLE_SIZE,
} from '@/shared/constants/sizes.const';
import { ResizableTableHead } from '@/components/ResizableTableHead';

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor('number', {
    cell: (info) => <span className={classes.cell}>{info.getValue()}</span>,
    header: () => 'Order id',
    minSize: 90,
  }),
  columnHelper.accessor('orderProductDTOList', {
    cell: (info) => (
      <span className={cn(classes.cell, 'max-w-[204px] text-[0.625rem]')}>
        {info
          .getValue()
          .map(({ productName }) => productName)
          .join(', ')}
      </span>
    ),
    header: () => 'Product(s)',
    minSize: 200,
    enableSorting: false,
  }),
  columnHelper.accessor('createdDate', {
    cell: (info) => (
      <span>{dayjs.unix(info.getValue()).format('MMM DD, YYYY (HH:mm)')}</span>
    ),
    header: 'Date',
    minSize: 80,
  }),
  columnHelper.accessor('orderStatus', {
    cell: (info) => (
      <CustomBadge
        color={info.getValue().toLowerCase()}
        name={info.getValue()}
      />
    ),
    header: 'Status',
    enableSorting: false,
    minSize: 110,
  }),
  columnHelper.accessor('totalPrice', {
    cell: (info) => <span>$ {info.getValue()}</span>,
    header: 'Total paid',
    enableSorting: false,
    minSize: 90,
  }),
  columnHelper.accessor('paymentMethod', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: 'Payment',
    enableSorting: false,
    minSize: 100,
  }),
];

type Props = {
  orders: Order[];
};
export const Table = ({ orders }: Props) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [search, setSearch] = useDebouncedState('', 200);

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  const [createQueryString] = useSearchString(searchParams);

  const table = useReactTable({
    columns,
    data: orders || [],
    defaultColumn: {
      size: DEFAULT_TABLE_SIZE / 6,
      maxSize: MAX_TABLE_SIZE / 6,
    },
    columnResizeMode: 'onChange',
    state: {
      columnFilters,
      globalFilter: search,
      pagination: {
        pageIndex: page ? Number(page) - 1 : 0,
        pageSize: Number(limit) || 10,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setSearch,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className='mt-8'>
      <div
        className={cn('bg-white', classes.orderCategories)}
        style={{ width: table.getTotalSize() }}
      >
        <h3 className='mr-3 flex-1 text-xl font-bold'>Order history</h3>
        <ul className='flex space-x-3'>
          <li>
            <UnstyledButton
              className={cn(
                'h-[1.8125rem] rounded-sm px-2 text-secondary hover:bg-brand-grey-200',
                !table.getColumn('orderStatus')?.getFilterValue() &&
                  'bg-brand-grey-300'
              )}
              onClick={() => {
                const params = removeSearchParams(searchParams, ['status']);
                table.getColumn('orderStatus')?.setFilterValue(null);
                router.replace('?' + params.toString());
              }}
            >
              All Orders
            </UnstyledButton>
          </li>
          {Array.from(
            orders.reduce(
              (acc, order) => acc.add(order.orderStatus),
              new Set<string>()
            )
          ).map((status) => (
            <li key={status}>
              <UnstyledButton
                className={cn(
                  'h-[1.8125rem] rounded-sm px-2 capitalize text-secondary hover:bg-brand-grey-200',
                  table.getColumn('orderStatus')?.getFilterValue() === status &&
                    'bg-brand-grey-300'
                )}
                onClick={() => {
                  table.getColumn('orderStatus')?.setFilterValue(status);
                  router.replace(
                    '?' +
                      createQueryString({
                        status: status.replaceAll(' ', '_'),
                        page: '1',
                      })
                  );
                }}
              >
                {status.toLocaleLowerCase()}
              </UnstyledButton>
            </li>
          ))}
        </ul>
      </div>

      <div
        className='flex items-center justify-between border border-b-0 bg-white px-4 py-6'
        style={{ width: table.getTotalSize() }}
      >
        <EntriesCount
          current={
            table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
            1
          }
          pageSize={
            table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
            table.getRowModel().rows.length
          }
          size={table.getCoreRowModel().rows.length}
        />

        <SearchEntry value={search} handleChange={setSearch} />
      </div>

      <ResizableTable
        tableProps={{
          highlightOnHover: true,
          horizontalSpacing: 16,
          width: '100%',
          border: 1,
          borderColor: '#EEE',
          withTableBorder: true,
          bg: 'white',
        }}
        table={table}
      >
        <ResizableTableHead headerGroup={table.getHeaderGroups()} />
        <MemoizedTableBody
          rowModel={table.getRowModel()}
          table={table}
          classNames={{ tr: 'tr items-center' }}
        />
      </ResizableTable>

      <EmptyRow
        visible={table.getRowModel().rows.length === 0}
        message='User has not made any orders in the store yet'
        className='min-h-full'
      />

      <div style={{ width: table.getTotalSize() }}>
        <TablePagination visible={table.getPageCount() > 1} table={table} />
      </div>
    </div>
  );
};

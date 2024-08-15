'use client';

import { Table as MantineTable, UnstyledButton } from '@mantine/core';
import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

import { formatDateTimeWithBrackets } from '@/shared/lib/helpers';
import { cn } from '@/shared/lib/utils';
import { Order } from '@/shared/types/types';

import classes from '../classes.module.css';
import { EntriesCount } from '@/components/EntriesCount';
import { SearchEntry } from '@/components/SearchEntry';
import { useDebouncedState } from '@mantine/hooks';
import { CustomBadge } from '@/components/Badge';
import { TableHead } from '@/components/TableHead';
import { EmptyRow } from '@/components/EmptyRow';
import { TablePagination } from '@/components/TablePagination';
import dayjs from 'dayjs';

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor('number', {
    cell: (info) => <span className={classes.cell}>{info.getValue()}</span>,
    header: () => 'Order id',
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
  }),
  columnHelper.accessor('totalPrice', {
    cell: (info) => <span>$ {info.getValue()}</span>,
    header: 'Total paid',
    enableSorting: false,
  }),
  columnHelper.accessor('paymentMethod', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: 'Payment',
    enableSorting: false,
  }),
];

type Props = {
  orders: Order[];
};
export const Table = ({ orders }: Props) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [search, setSearch] = useDebouncedState('', 200);

  const table = useReactTable({
    columns,
    data: orders || [],
    state: {
      columnFilters,
      globalFilter: search,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setSearch,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className='mt-8 bg-white'>
      <div className={classes.orderCategories}>
        <h3 className='mr-3 flex-1 text-xl font-bold'>Order history</h3>
        <ul className='flex space-x-3'>
          <li>
            <UnstyledButton
              className={cn(
                'h-[1.8125rem] rounded-sm px-2 text-secondary hover:bg-brand-grey-200',
                !table.getColumn('orderStatus')?.getFilterValue() &&
                  'bg-brand-grey-300'
              )}
              onClick={() =>
                table.getColumn('orderStatus')?.setFilterValue(null)
              }
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
                onClick={() =>
                  table.getColumn('orderStatus')?.setFilterValue(status)
                }
              >
                {status.toLocaleLowerCase()}
              </UnstyledButton>
            </li>
          ))}
        </ul>
      </div>

      <div className='flex items-center justify-between border border-b-0 bg-white px-4 py-6'>
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

      <MantineTable
        highlightOnHover
        horizontalSpacing={16}
        width={'100%'}
        border={1}
        borderColor='#EEE'
        withTableBorder
      >
        <TableHead headerGroup={table.getHeaderGroups()} />
        {/* <TableBody rowModel={table.getRowModel()} /> */}
        <MantineTable.Tbody>
          {table.getRowModel().rows.length > 0 &&
            table.getRowModel().rows.map((row) => (
              <MantineTable.Tr key={row.id} className={classes.printText}>
                {row.getVisibleCells().map((cell) => (
                  <MantineTable.Td key={cell.id}>
                    <span className='line-clamp-1'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </span>
                  </MantineTable.Td>
                ))}
              </MantineTable.Tr>
            ))}
        </MantineTable.Tbody>
      </MantineTable>

      <EmptyRow
        visible={table.getRowModel().rows.length === 0}
        message='User has not made any orders in the store yet'
        className='min-h-full'
      />

      {table.getPageCount() > 1 && <TablePagination visible table={table} />}
    </div>
  );
};

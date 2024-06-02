"use client";

import { Table, Button } from '@mantine/core';
import {
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useSelectOrders } from '@/shared/hooks/useSelectOrders';
import { formatDateTimeWithBrackets } from '@/shared/lib/helpers';
import { cn } from '@/shared/lib/utils';
import { Order } from '@/shared/types/types';

import classes from './classes.module.css';
import { EntriesCount } from '@/components/EntriesCount';
import { SearchEntry } from '@/components/SearchEntry';
import { useDebouncedState } from '@mantine/hooks';
import { CustomBadge } from '@/components/Badge';
import { TableHead } from '@/components/TableHead';
import { TableBody } from '@/components/TableBody';
import { EmptyRow } from '@/components/EmptyRow';
import { TablePagination } from '@/components/TablePagination';
import { useState } from 'react';

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor('number', {
    cell: (info) => <span className={classes.cell}>{info.getValue()}</span>,
    header: () => 'Order id',
  }),
  columnHelper.accessor('orderProductDTOList', {
    cell: (info) => (
      <span className={cn(classes.cell, 'text-[0.625rem] max-w-[204px]')}>
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
    cell: (info) => <span>{formatDateTimeWithBrackets(info.getValue())}</span>,
    header: 'Date',
  }),
  columnHelper.accessor('orderStatus', {
    cell: (info) => <CustomBadge
    color={info.getValue().toLowerCase()}
    name={info.getValue()}
  />,
    header: 'Status',
    enableSorting: false
  }),
  columnHelper.accessor('totalPrice', {
    cell: (info) => <span>$ {info.getValue()}</span>,
    header: 'Total paid',
    enableSorting: false
  }),
  columnHelper.accessor('paymentMethod', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: 'Payment',
    enableSorting: false
  }),
];

type Props = {
  email: string
}
export default function OrderHistoryTable({ email }: Props) {
  const orders = useSelectOrders((state) =>
    state.filter((order) => order.email === email)
  );

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [search, setSearch] = useDebouncedState('', 200);

  const table = useReactTable({
    data: orders || [],
    columns,
    state: {
      columnFilters,
      globalFilter: search,
    },
    onGlobalFilterChange: setSearch,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className='mt-8 bg-white'>
      <div className={classes.orderCategories}>
        <h3 className='mr-3 flex-1 text-xl font-bold'>Order history</h3>
        <ul className='flex space-x-3'>
          <li>
            <Button
              className={cn(
                'h-[1.8125rem] px-2 text-secondary',
                !table.getColumn('orderStatus')?.getFilterValue() &&
                  'bg-brand-grey-300'
              )}
              onClick={() =>
                table.getColumn('orderStatus')?.setFilterValue(null)
              }
            >
              All Orders
            </Button>
          </li>
          {Array.from(
            orders.reduce(
              (acc, order) => acc.add(order.orderStatus),
              new Set<string>()
            )
          ).map((status) => (
            <li key={status}>
              <Button
                className={cn(
                  'h-[1.8125rem] px-2 text-secondary',
                  table.getColumn('orderStatus')?.getFilterValue() === status &&
                    'bg-brand-grey-300'
                )}
                onClick={() =>
                  table.getColumn('orderStatus')?.setFilterValue(status)
                }
              >
                {status}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className='flex items-center justify-between border-[1px] border-b-0 bg-white px-4 py-6'>
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

      <Table
        highlightOnHover
        horizontalSpacing={16}
        width={'100%'}
        border={1}
        borderColor='#EEE'
        withTableBorder
      >
        <TableHead headerGroup={table.getHeaderGroups()} />
        <TableBody rowModel={table.getRowModel()} />
      </Table>

      <EmptyRow visible={table.getRowModel().rows.length === 0} message='User has not made any orders in the store yet'/>

      <TablePagination visible={table.getPageCount() > 1} table={table} />
    </div>
  );
}

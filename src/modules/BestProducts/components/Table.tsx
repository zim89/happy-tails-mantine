'use client';

import { Table, Badge } from '@mantine/core';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';

import { Product } from '@/shared/types/types';
import { TableHead } from '@/components/TableHead';
import { TableBody } from '@/components/TableBody';
import { EmptyRow } from '@/components/EmptyRow/EmptyRow';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<Product & { totalPaid: number }>();

const badgePalette: {
  [P in string]: string;
} = {
  'in stock': '#389b48',
  'out of stock': '#c63129',
};

const columns = [
  columnHelper.accessor('article', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: 'Product',
    enableSorting: false,
    size: 200,
  }),
  columnHelper.accessor('name', {
    cell: (info) => (
      <span className='block max-w-36 overflow-hidden text-ellipsis whitespace-nowrap'>
        {info.getValue()}
      </span>
    ),
    header: 'Total order',
    enableSorting: false,
    size: 200,
  }),
  columnHelper.accessor('productStatus', {
    cell: (info) => (
      <Badge
        bg={badgePalette[info.getValue().toLowerCase()]}
        classNames={{
          root: 'h-[1.375rem] overflow-ellipsis px-2',
          label: 'text-xs',
        }}
        styles={{
          root: { color: 'white' },
        }}
      >
        {info.getValue()}
      </Badge>
    ),
    header: 'Status',
    enableSorting: false,
    size: 250,
  }),
  columnHelper.accessor('totalPaid', {
    cell: (info) => (
      <div className='flex justify-end'>
        <span className='whitespace-pre'>$ {info.getValue().toFixed(2)}</span>
      </div>
    ),
    header: 'Total paid',
    enableSorting: false,
    size: 10,
  }),
];

type Props = {
  data: Product[];
};
export default function ProductsTable({ data }: Props) {
  const tableRows = useMemo(() => {
    return data
      .map((prod) => ({
        ...prod,
        totalPaid: (prod.unitsSold || 0) * prod.price,
      }))
      .sort((a, b) => (a.totalPaid < b.totalPaid ? 1 : -1));
  }, [data]);

  const table = useReactTable({
    // This is used, just to make possible to initially sort total paid
    data: tableRows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className='w-full overflow-hidden rounded border border-brand-grey-300'>
      <div className='flex items-center justify-between bg-white px-4 py-6'>
        <h2 className='mr-6 text-base/[1.5rem] font-bold'>
          Best Selling Products
        </h2>
      </div>

      <Table
        bgcolor='white'
        withTableBorder
        borderColor='transparent'
        classNames={{
          table: 'h-[calc(100%-5em)]',
          tr: 'border-t border-brand-grey-300',
        }}
      >
        <TableHead headerGroup={table.getHeaderGroups()} />
        <TableBody rowModel={table.getRowModel()} table={table} />
      </Table>

      <EmptyRow
        visible={table.getRowModel().rows.length === 0}
        message='You have no any product yet'
        className='h-full'
      />
    </div>
  );
}

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
import { EmptyRow } from '@/components/EmptyRow';
import { useEffect } from 'react';

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
    size: 10,
  }),
  columnHelper.accessor('name', {
    cell: (info) => (
      <span className='block max-w-36 overflow-hidden text-ellipsis whitespace-nowrap'>
        {info.getValue()}
      </span>
    ),
    header: 'Total order',
    enableSorting: false,
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
    size: 10,
  }),
  columnHelper.accessor('totalPaid', {
    cell: (info) => <span className='whitespace-pre'>$ {info.getValue()}</span>,
    header: 'Total paid',
    enableSorting: true,
    size: 10,
  }),
];

type Props = {
  data: Product[];
};
export default function ProductsTable({ data }: Props) {
  const table = useReactTable({
    // This is used, just to make possible to sort total paid
    data: data.map((prod) => ({
      ...prod,
      totalPaid: (prod.unitsSold || 0) * prod.price,
    })),
    columns,
    initialState: {
      sorting: [
        {
          id: 'totalPaid',
          desc: true,
        },
      ],
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className='h-full w-full overflow-hidden rounded border border-brand-grey-300'>
      <div className='flex items-center justify-between bg-white px-4 py-6'>
        <h2 className='mr-6 text-base/[1.5rem] font-bold'>
          Best Selling Products
        </h2>
      </div>

      <Table
        bgcolor='white'
        withTableBorder
        borderColor='transparent'
        classNames={{ tr: 'border-t border-brand-grey-300' }}
      >
        <TableHead headerGroup={table.getHeaderGroups()} />
        <TableBody rowModel={table.getRowModel()} />
      </Table>

      <EmptyRow
        visible={table.getRowModel().rows.length === 0}
        message='You have no any product yet'
        className='h-full'
      />
    </div>
  );
}

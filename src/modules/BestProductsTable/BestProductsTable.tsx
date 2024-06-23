'use client';

import { Table, Badge } from '@mantine/core';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useDebouncedState } from '@mantine/hooks';
import Image from 'next/image';

import { Product } from '@/shared/types/types';
import { TableHead } from '@/components/TableHead';
import { TableBody } from '@/components/TableBody';
import { EmptyRow } from '@/components/EmptyRow';

const columnHelper = createColumnHelper<Product>();

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
    cell: (info) => <span>{info.getValue()}</span>,
    header: 'Total order',
    enableSorting: false,
  }),
  columnHelper.accessor('price', {
    cell: (info) => <span className='whitespace-pre'>$ {info.getValue()}</span>,
    header: 'Price',
    enableSorting: false,
    size: 10,
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
];

type Props = {
  data: Product[];
};
export default function ProductsTable({ data }: Props) {
  const [search, setSearch] = useDebouncedState('', 200);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: search,
    },
    onGlobalFilterChange: setSearch,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
        classNames={{ tr: 'border-t border-[#EEE]' }}
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

'use client';

import { Table as MantineTable } from '@mantine/core';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useContext, useMemo } from 'react';

import { cn } from '@/shared/lib/utils';
import { TableHead } from '@/components/TableHead';
import { TableBody } from '@/components/TableBody';
import classes from '../classes.module.css';
import { context } from '../lib/utils';
import { Actions } from './Actions';
import { ProductSizeValues } from '@/shared/types/types';

const columnHelper = createColumnHelper<{
  size: ProductSizeValues;
  quantity: number;
}>();

const columns = [
  columnHelper.accessor('size', {
    cell: (info) => {
      return <span>{info.getValue()}</span>;
    },
    header: 'Size',
    enableSorting: false,
    size: 100,
  }),
  columnHelper.accessor('quantity', {
    cell: (info) => (
      <span className={cn('whitespace-pre', classes.columnCell)}>
        {info.getValue()}
      </span>
    ),
    header: 'Quantity',
    enableSorting: false,
    size: 500,
  }),
  columnHelper.display({
    id: 'actions',
    cell: (info) => {
      const index = info.row.index;

      return (
        <div className='flex justify-end'>
          <Actions index={index} />
        </div>
      );
    },
    size: 0,
    header: 'Action',
  }),
];

export default function Table() {
  const { sizes } = useContext(context);

  const data = useMemo(() => {
    return sizes.map((size) => ({
      size: size.id === 'form' ? size.values.size : size.size,
      quantity: size.id === 'form' ? size.values.quantity : size.quantity,
    }));
  }, [sizes]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!data.length) return null;

  return (
    <MantineTable
      bgcolor='white'
      withTableBorder
      borderColor='#EEE'
      mt={48}
      w={685}
    >
      <TableHead headerGroup={table.getHeaderGroups()} />
      <TableBody rowModel={table.getRowModel()} />
    </MantineTable>
  );
}

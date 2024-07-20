'use client';

import { Table as MantineTable } from '@mantine/core';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useDebouncedState } from '@mantine/hooks';
import Image from 'next/image';
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
  description: string | null;
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

  const data = useMemo(
    () =>
      sizes
        .filter((s) => s.id === 'form')
        .map((s) => {
          if (s.id === 'form') {
            return {
              size: s.values.size,
              quantity: s.values.quantity,
              description: s.values.description,
            };
          } else {
            return {
              size: s.size,
              quantity: s.quantity,
              description: s.description,
            };
          }
        }),
    [sizes]
  );

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

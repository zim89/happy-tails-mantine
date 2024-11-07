'use client';

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useContext, useMemo } from 'react';
import { Table as MantineTable } from '@mantine/core';

import { cn } from '@/shared/lib/utils';
import { TableBody } from '@/components/TableBody';
import classes from '../classes.module.css';
import { context } from '../lib/utils';
import { Actions } from './Actions';
import { ProductSizeValues } from '@/shared/types/types';
import { ResizableTable } from '@/components/ResizableTable';
import {
  DEFAULT_TABLE_SIZE,
  MAX_TABLE_SIZE,
} from '@/shared/constants/sizes.const';
import { ResizableTableHead } from '@/components/ResizableTableHead';
import { TableHead } from '@/components/TableHead';

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
    minSize: 100,
  }),
  columnHelper.accessor('quantity', {
    cell: (info) => (
      <span className={cn('whitespace-pre', classes.columnCell)}>
        {info.getValue()}
      </span>
    ),
    header: 'Quantity',
    enableSorting: false,
    minSize: 200,
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
    header: 'Action',
    enableSorting: false,
    minSize: 100,
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
    defaultColumn: {
      size: DEFAULT_TABLE_SIZE / 3,
      maxSize: MAX_TABLE_SIZE / 3,
    },
    columnResizeMode: 'onChange',
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!data.length) return null;

  return (
    <MantineTable
      bgcolor='white'
      withTableBorder={true}
      borderColor='#EEE'
      mt={48}
    >
      <TableHead headerGroup={table.getHeaderGroups()} />
      <TableBody table={table} rowModel={table.getRowModel()} />
    </MantineTable>
  );
}

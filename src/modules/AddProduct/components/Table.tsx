'use client';

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Image from 'next/image';
import { useContext, useMemo } from 'react';

import { cn } from '@/shared/lib/utils';
import { MemoizedTableBody } from '@/components/TableBody';
import classes from '../classes.module.css';
import { VariantForm, context } from '../lib/utils';
import { Actions } from './Actions';
import {
  DEFAULT_TABLE_SIZE,
  MAX_TABLE_SIZE,
} from '@/shared/constants/sizes.const';
import { ResizableTable } from '@/components/ResizableTable';
import { ResizableTableHead } from '@/components/ResizableTableHead';

const columnHelper = createColumnHelper<VariantForm>();

const columns = [
  columnHelper.accessor('values.variantImage', {
    cell: (info) => {
      const candidate = info.getValue();

      if (!candidate) return null;

      const src = URL.createObjectURL(candidate);

      return <Image width={50} height={50} src={src} alt='' />;
    },
    header: 'Image',
    enableSorting: false,
    minSize: 100,
    enableResizing: false,
  }),
  columnHelper.accessor('values.color', {
    cell: (info) => (
      <span className={classes.columnCell}>{info.getValue()}</span>
    ),
    header: 'Color',
    enableSorting: false,
    minSize: 100,
  }),
  columnHelper.accessor('values.size', {
    cell: (info) => (
      <span className={classes.columnCell}>{info.getValue()}</span>
    ),
    header: 'Size',
    minSize: 100,
    enableSorting: false,
  }),
  columnHelper.accessor('values.price', {
    cell: (info) => (
      <span className={classes.columnCell}>$ {info.getValue()}</span>
    ),
    header: 'Price',
    minSize: 100,
    enableSorting: false,
  }),
  columnHelper.accessor('values.quantity', {
    cell: (info) => (
      <span className={cn('whitespace-pre', classes.columnCell)}>
        {info.getValue()}
      </span>
    ),
    header: 'Quantity',
    enableSorting: false,
    minSize: 100,
  }),
  columnHelper.display({
    id: 'actions',
    cell: (info) => {
      const candidate = info.row.original.values.variantImage;

      if (!candidate) return null;

      // Find a uniquely identifiable criteria for a variant
      const criteria = candidate.lastModified;

      return (
        <div className='flex justify-end'>
          <Actions criteria={criteria} />
        </div>
      );
    },
    minSize: 30,
  }),
];

export default function Table() {
  const { variants } = useContext(context);

  const data = useMemo(
    () =>
      variants.filter(
        (variant) => variant && variant.isValid()
      ) as VariantForm[],
    [variants]
  );

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      size: DEFAULT_TABLE_SIZE / 6,
      maxSize: MAX_TABLE_SIZE / 5,
    },
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
  });

  if (!data.length) return null;

  return (
    <ResizableTable
      tableProps={{
        bgcolor: 'white',
        withTableBorder: true,
        borderColor: '#EEE',
        mt: 48,
      }}
      table={table}
    >
      <ResizableTableHead headerGroup={table.getHeaderGroups()} />
      <MemoizedTableBody
        classNames={{ tr: 'tr items-center' }}
        rowModel={table.getRowModel()}
        table={table}
      />
    </ResizableTable>
  );
}

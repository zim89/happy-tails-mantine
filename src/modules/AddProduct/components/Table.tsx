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
import { VariantForm, context } from '../lib/utils';
import { Actions } from './Actions';

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
    size: 200,
  }),
  columnHelper.accessor('values.color', {
    cell: (info) => (
      <span className={classes.columnCell}>{info.getValue()}</span>
    ),
    header: 'Color',
    enableSorting: false,
    size: 200,
  }),
  columnHelper.accessor('values.size', {
    cell: (info) => (
      <span className={classes.columnCell}>{info.getValue()}</span>
    ),
    header: 'Size',
    size: 200,
    enableSorting: false,
  }),
  columnHelper.accessor('values.price', {
    cell: (info) => (
      <span className={classes.columnCell}>$ {info.getValue()}</span>
    ),
    header: 'Price',
    size: 200,
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
    size: 10,
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
    size: 20,
  }),
];

export default function Table() {
  const [search, setSearch] = useDebouncedState('', 200);
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
    getCoreRowModel: getCoreRowModel(),
  });

  if (!data.length) return null;

  return (
    <MantineTable bgcolor='white' withTableBorder borderColor='#EEE' mt={48}>
      <TableHead headerGroup={table.getHeaderGroups()} />
      <TableBody rowModel={table.getRowModel()} />
    </MantineTable>
  );
}

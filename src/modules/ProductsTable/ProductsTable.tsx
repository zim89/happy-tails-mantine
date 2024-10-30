'use client';

import { Button, Badge } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { useDebouncedState } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

import { Product } from '@/shared/types/types';
import { cn } from '@/shared/lib/utils';
import { useSelectCategories } from '@/shared/hooks/useSelectCategories';
import { EntriesCount } from '@/components/EntriesCount/EntriesCount';
import { SearchEntry } from '@/components/SearchEntry';
import { MemoizedTableBody } from '@/components/TableBody';
import { TablePagination } from '@/components/TablePagination/TablePagination';
import { EmptyRow } from '@/components/EmptyRow/EmptyRow';
import classes from './classes.module.css';
import { Actions } from './ui/Actions';
import {
  removeSearchParams,
  useSearchString,
} from '@/shared/helpers/searchParams.helpers';
import PageHeader from '@/components/PageHeader';
import { ResizableTable } from '@/components/ResizableTable';
import {
  DEFAULT_TABLE_SIZE,
  MAX_TABLE_SIZE,
} from '@/shared/constants/sizes.const';
import { ResizableTableHead } from '@/components/ResizableTableHead';

const columnHelper = createColumnHelper<Product>();

const badgePalette: {
  [P in string]: string;
} = {
  'in stock': '#389b48',
  'out of stock': '#c63129',
};

const columns = [
  columnHelper.accessor('imagePath', {
    cell: (info) => (
      <Image width={50} height={50} src={info.getValue() || ''} alt='' />
    ),
    header: 'Image',
    minSize: 60,
    enableResizing: false,
    enableSorting: false,
  }),
  columnHelper.accessor('name', {
    cell: (info) => (
      <span className={classes.columnCell}>{info.getValue()}</span>
    ),
    minSize: 80,
  }),
  columnHelper.accessor('id', {
    cell: (info) => (
      <span className={classes.columnCell}>{info.getValue()}</span>
    ),
    header: 'Code',
    minSize: 50,
    enableSorting: false,
  }),
  columnHelper.accessor('categoryName', {
    cell: (info) => (
      <span className={classes.columnCell}>{info.getValue()}</span>
    ),
    header: 'Category',
    minSize: 80,
    enableSorting: false,
  }),
  columnHelper.accessor('price', {
    cell: (info) => (
      <span className={cn('whitespace-pre', classes.columnCell)}>
        $ {info.getValue()}
      </span>
    ),
    minSize: 70,
    header: 'Price',
  }),
  columnHelper.accessor('totalQuantity', {
    cell: (info) => (
      <span className={classes.columnCell}>{info.getValue()}</span>
    ),
    minSize: 100,
    header: 'Quantity',
  }),
  columnHelper.accessor('productStatus', {
    cell: (info) => (
      <Badge
        bg={badgePalette[info.getValue().toLowerCase()]}
        classNames={{
          root: cn(classes.columnCell, 'h-[1.375rem] overflow-ellipsis px-2'),
          label: 'text-xs',
        }}
        styles={{
          root: { color: 'white' },
        }}
      >
        {info.getValue()}
      </Badge>
    ),
    minSize: 80,
    header: 'Status',
  }),
  columnHelper.display({
    id: 'actions',
    cell: (info) => <Actions ctx={info} />,
    minSize: 60,
    enableResizing: false,
    enableSorting: false,
  }),
];

type Props = {
  data: Product[];
};
export default function ProductsTable({ data }: Props) {
  const [search, setSearch] = useDebouncedState('', 200);
  const router = useRouter();

  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  const [createQueryString] = useSearchString(searchParams);

  const [cols] = useState<typeof columns>(() => [...columns]);

  const categories = useSelectCategories((res) =>
    res.map((cat) => ({ name: cat.name, title: cat.title, id: cat.id }))
  );

  const table = useReactTable({
    data,
    columns: cols,
    defaultColumn: {
      size: DEFAULT_TABLE_SIZE / 8,
      maxSize: MAX_TABLE_SIZE / 6,
    },
    columnResizeMode: 'onChange',
    state: {
      globalFilter: search,
      pagination: {
        pageIndex: page ? Number(page) - 1 : 0,
        pageSize: Number(limit) || 10,
      },
    },
    onGlobalFilterChange: setSearch,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  console.log('Resizing...');

  return (
    <>
      <PageHeader
        style={{ width: table.getTotalSize() + 1.5 }}
        rightSection={
          <Link
            className='flex items-center gap-2 rounded bg-secondary px-4 py-[10px] font-black text-primary'
            href='/admin/products/new'
          >
            <PlusCircle width={20} />
            Add product
          </Link>
        }
      >
        {(Group) => (
          <>
            <Group title='Products' additional='Manage your product catalog' />
          </>
        )}
      </PageHeader>

      <div
        className='flex items-center justify-between border border-b-0 bg-primary px-4 py-6'
        style={{ width: table.getTotalSize() + 1.5 }}
      >
        <h2 className='mr-6 text-base/[24px] font-bold'>Products Catalog</h2>
        <div className='flex flex-wrap gap-x-6'>
          <Button
            variant='transparent'
            onClick={() => {
              const params = removeSearchParams(searchParams, ['filter']);
              table.getColumn('categoryName')?.setFilterValue(null);
              router.replace('?' + params.toString());
            }}
            classNames={{
              root: cn(
                'rounded-sm px-2 py-1 text-sm text-secondary hover:bg-brand-grey-200 hover:text-secondary',
                !table.getColumn('categoryName')?.getFilterValue() &&
                  'bg-brand-grey-300'
              ),
            }}
          >
            All Products
          </Button>
          {categories.length > 0 &&
            categories.map(({ title, id, name }, index) => (
              <Button
                variant='transparent'
                onClick={() => {
                  table.getColumn('categoryName')?.setFilterValue(name);
                  router.replace(
                    '?' +
                      createQueryString({
                        filter: `${id}`,
                      })
                  );
                }}
                key={index}
                classNames={{
                  root: cn(
                    'rounded-sm px-3 py-2 text-sm text-secondary hover:bg-brand-grey-200 hover:text-secondary',
                    table.getColumn('categoryName')?.getFilterValue() ===
                      name && 'bg-brand-grey-300'
                  ),
                }}
              >
                {title}
              </Button>
            ))}
        </div>
      </div>

      <div
        className='flex items-center justify-between border border-b-0 bg-primary px-4 py-6'
        style={{ width: table.getTotalSize() + 1.5 }}
      >
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

      <ResizableTable
        table={table}
        tableProps={{
          bgcolor: 'white',
          withTableBorder: true,
          borderColor: '#EEE',
        }}
      >
        <ResizableTableHead headerGroup={table.getHeaderGroups()} />
        <MemoizedTableBody
          table={table}
          rowModel={table.getRowModel()}
          classNames={{ tr: 'tr items-center' }}
        />
      </ResizableTable>

      <EmptyRow
        visible={table.getRowModel().rows.length === 0}
        message='You have no any product yet'
      />
      <div style={{ width: table.getTotalSize() }}>
        <TablePagination visible={table.getPageCount() > 1} table={table} />
      </div>
    </>
  );
}

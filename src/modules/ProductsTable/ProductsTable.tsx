'use client';

import {
  Button,
  Table,
  Badge,
} from '@mantine/core';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table';
import { useDebouncedState } from '@mantine/hooks';
import Image from 'next/image';

import { Product } from '@/shared/types/types';
import { cn } from '@/shared/lib/utils';
import classes from './classes.module.css';
import { Actions } from './ui/Actions';
import { useSelectCategories } from '@/shared/hooks/useSelectCategories';
import { EntriesCount } from '@/components/EntriesCount';
import { SearchEntry } from '@/components/SearchEntry';
import { TableHead } from '@/components/TableHead';
import { TableBody } from '@/components/TableBody';
import { TablePagination } from '@/components/TablePagination';
import { EmptyRow } from '@/components/EmptyRow';

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
      <Image width={50} height={50} src={info.getValue()} alt='' />
    ),
    header: 'Image',
    enableSorting: false,
    size: 112,
  }),
  columnHelper.accessor('name', {
    cell: (info) => (
      <span className={classes.columnCell}>{info.getValue()}</span>
    ),
    size: 317,
  }),
  columnHelper.accessor('id', {
    cell: (info) => (
      <span className={classes.columnCell}>{info.getValue()}</span>
    ),
    header: 'Code',
    size: 89,
    enableSorting: false,
  }),
  columnHelper.accessor('categoryName', {
    cell: (info) => (
      <span className={classes.columnCell}>{info.getValue()}</span>
    ),
    header: 'Category',
    size: 89,
    enableSorting: false,
  }),
  columnHelper.accessor('price', {
    cell: (info) => (
      <span className={cn('whitespace-pre', classes.columnCell)}>
        $ {info.getValue()}
      </span>
    ),
    header: 'Price',
    size: 89,
  }),
  columnHelper.accessor('quantity', {
    cell: (info) => (
      <span className={classes.columnCell}>{info.getValue()}</span>
    ),
    header: 'Quantity',
    size: 89,
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
    header: 'Status',
    size: 89,
    enableSorting: false,
  }),
  columnHelper.display({
    id: 'actions',
    cell: (info) => <Actions ctx={info} />,
    size: 50,
  }),
];

type Props = {
  data: Product[];
};
export default function ProductsTable({ data }: Props) {
  const [search, setSearch] = useDebouncedState('', 200);
  const categories = useSelectCategories((res) =>
    res.map((cat) => ({ name: cat.name, title: cat.title }))
  );

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
    <>
      <div className='flex items-center justify-between border-[1px] border-b-0 bg-white px-4 py-6'>
        <h2 className='mr-6 text-base/[24px] font-bold'>Products Catalog</h2>
        <div className='flex gap-6'>
          <Button
            variant="transparent"
            onClick={() =>
              table.getColumn('categoryName')?.setFilterValue(null)
            }
            classNames={{
              root: cn(
                'rounded-sm px-2 py-1 text-sm text-[#161616] hover:bg-brand-grey-300 hover:text-[#161616]',
                !table.getColumn('categoryName')?.getFilterValue() &&
                  'bg-gray-300'
              ),
            }}
          >
            All Products
          </Button>
          {categories.length > 0 &&
            categories.map(({ name, title }, index) => (
              <Button
                variant="transparent"
                onClick={() =>
                  table.getColumn('categoryName')?.setFilterValue(name)
                }
                key={index}
                classNames={{
                  root: cn(
                    'rounded-sm px-3 py-2 text-sm text-[#161616] hover:bg-brand-grey-300 hover:text-[#161616]',
                    table.getColumn('categoryName')?.getFilterValue() ===
                      name && 'bg-gray-300'
                  ),
                }}
              >
                {title}
              </Button>
            ))}
        </div>
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

      <Table bgcolor='white' withTableBorder borderColor='#EEE'>
        <TableHead headerGroup={table.getHeaderGroups()}/>
        <TableBody rowModel={table.getRowModel()} />
      </Table>

      <EmptyRow visible={table.getRowModel().rows.length === 0} message="You have no any product yet" />

      <TablePagination visible={table.getPageCount() > 1} table={table} />
    </>
  );
}

'use client';
import {
  Button,
  Group,
  Pagination,
  Table,
  TextInput,
  Badge,
  Select,
} from '@mantine/core';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { useDebouncedState } from '@mantine/hooks';
import Image from 'next/image';
import { ChevronDown, Search } from 'lucide-react';

import { Product } from '@/shared/types/types';
import PaginationPrevBtn from '@/components/PaginationPrevBtn';
import PaginationNextBtn from '@/components/PaginationNextBtn';
import { cn } from '@/shared/lib/utils';
import classes from './classes.module.css';
import { Actions } from './ui/Actions';
import { useSelectCategories } from '@/shared/hooks/useSelectCategories';

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
    size: 112
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
    size: 89
  }),
  columnHelper.accessor('categoryName', {
    cell: (info) => (
      <span className={classes.columnCell}>{info.getValue()}</span>
    ),
    header: 'Category',
    size: 89
  }),
  columnHelper.accessor('price', {
    cell: (info) => (
      <span className={cn('whitespace-pre', classes.columnCell)}>
        $ {info.getValue()}
      </span>
    ),
    header: 'Price',
    size: 89
  }),
  columnHelper.accessor('quantity', {
    cell: (info) => (
      <span className={classes.columnCell}>{info.getValue()}</span>
    ),
    header: 'Quantity',
    size: 89
  }),
  columnHelper.accessor('productStatus', {
    cell: (info) => (
      <Badge
        bg={badgePalette[info.getValue().toLowerCase()]}
        classNames={{
          root: cn(classes.columnCell, 'h-[1.375rem] px-2 overflow-ellipsis'),
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
    size: 89
  }),
  columnHelper.display({
    id: "actions",
    cell: (info) => <Actions ctx={info} />,
    size: 50
  })
];

type Props = {
  data: Product[];
};
export default function ProductsTable({ data }: Props) {
  const [search, setSearch] = useDebouncedState('', 200);
  const categories = useSelectCategories((res) => res.map(cat => ({ name: cat.name, title: cat.title })));

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: search,
    },
    onGlobalFilterChange: setSearch,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const paginate = (value: number) => {
    table.setPageIndex(value - 1);
  };

  return (
    <>
      <div className='flex items-center justify-between border-[1px] border-b-0 bg-white px-4 py-6'>
        <h2 className='mr-6 text-base/[24px] font-bold'>Products Catalog</h2>
        <div className='flex gap-6'>
          <Button
            onClick={() =>
              table.getColumn('categoryName')?.setFilterValue(null)
            }
            classNames={{
              root: cn(
                'rounded-sm px-2 py-1 text-sm text-[#161616]',
                !table.getColumn('categoryName')?.getFilterValue() &&
                  'bg-gray-300'
              ),
            }}
          >
            All Products
          </Button>
          {categories.length > 0 && categories.map(({ name, title }, index) => (
            <Button
              onClick={() =>
                table.getColumn('categoryName')?.setFilterValue(name)
              }
              key={index}
              classNames={{
                root: cn(
                  'rounded-sm px-3 py-2 text-sm text-[#161616]',
                  table.getColumn('categoryName')?.getFilterValue() === name &&
                    'bg-gray-300'
                ),
              }}
            >
              {title}
            </Button>
          ))}
        </div>
      </div>

      <div className='flex items-center justify-between border-[1px] border-b-0 bg-white px-4 py-6'>
        <p className='text-sm/[21px]'>
          Displaying{' '}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{' '}
          to{' '}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            table.getRowModel().rows.length}{' '}
          of {table.getCoreRowModel().rows.length} entries
        </p>

        <TextInput
          placeholder='Search'
          width={297}
          leftSection={<Search className='h-4 w-4' />}
          defaultValue={search}
          onChange={(e) => setSearch(e.target.value)}
          classNames={{
            root: 'form-root',
            label: 'form-label',
            input: cn(
              'form-input',
              'rounded-0.5 border border-brand-grey-400 bg-primary py-3 pl-8 pr-4 text-base placeholder:text-base placeholder:text-brand-grey-600 hover:border-secondary focus:border-secondary'
            ),
            section: 'text-brand-grey-600',
          }}
        />
      </div>

      <Table bgcolor='white' withTableBorder borderColor='#EEE'>
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className='bg-[#eee]'>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={cn(
                    'text-left text-xs/[14.4px] font-bold uppercase',
                    classes.columnSpacing
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </Table.Thead>
        <Table.Tbody>
          {table.getRowModel().rows.length > 0 && table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={classes.columnSpacing}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          {table.getRowModel().rows.length === 0 && <p className="p-4">There are no products yet</p>}
        </Table.Tbody>
      </Table>

      {table.getPageCount() > 1 && (
        <div className='mt-[46px] flex items-center justify-between'>
          <Select
            label='Results Per Page'
            withCheckIcon={false}
            rightSection={<ChevronDown className='text-secondary' />}
            value={table.getState().pagination.pageSize.toString()}
            onChange={(value) => {
              table.setPageSize(Number(value));
            }}
            data={['10', '20', '30', '40', '50']}
            classNames={{
              root: 'form-root flex items-center',
              label: 'form-label mr-2',
              input: 'form-input w-[4.3125rem] font-bold',
            }}
          />

          <Pagination.Root
            value={table.getState().pagination.pageIndex + 1}
            onChange={paginate}
            total={table.getPageCount()}
            classNames={{
              control: 'pagination-control',
              dots: 'pagination-dots',
            }}
          >
            <Group gap={0} justify='center'>
              <div
                className={
                  'flex justify-center gap-0 rounded-0.5 border border-brand-grey-400'
                }
              >
                <Pagination.Previous icon={PaginationPrevBtn} />
                <Pagination.Items />
                <Pagination.Next icon={PaginationNextBtn} />
              </div>
            </Group>
          </Pagination.Root>
        </div>
      )}
    </>
  );
};

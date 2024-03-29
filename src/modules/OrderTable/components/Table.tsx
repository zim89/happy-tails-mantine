'use client';

import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Badge,
  Button,
  Group,
  Input,
  Table as MantineTable,
  Pagination,
  Select,
} from '@mantine/core';

import type { Order } from '@/shared/types/types';
import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import dayjs from 'dayjs';
import PaginationPrevBtn from '@/components/PaginationPrevBtn';
import PaginationNextBtn from '@/components/PaginationNextBtn';
import { RowActions } from './RowActions';
import { useDebouncedState } from '@mantine/hooks';

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor('number', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => 'Order Id',
  }),
  columnHelper.accessor('userId', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => 'Customers',
  }),
  columnHelper.accessor('orderProductDTOList', {
    cell: (info) => (
      <span className='text-[0.625rem]'>
        {info
          .getValue()
          .map(({ productName }) => productName)
          .join(', ')}
      </span>
    ),
    header: () => 'Product(s)',
    enableSorting: false,
  }),
  columnHelper.accessor('createdDate', {
    cell: (info) => (
      <span>{dayjs(info.getValue()).format('MMM DD, YYYY (HH:mm)')}</span>
    ),
    header: () => 'Date',
  }),
  columnHelper.accessor('orderStatus', {
    cell: (info) => (
      <Badge
        bg={
          {
            'in progress': '#fbbc04',
            new: '#4285f4',
            cancelled: '#c63129',
            shipped: '#2a7436',
            completed: '#b4b4b4',
            'return processing': '#84201c',
            processing: '#389b48',
          }[info.getValue().toLowerCase()]
        }
        className='h-[1.375rem] px-2'
      >
        {info.getValue()}
      </Badge>
    ),
    header: () => 'Status',
    filterFn: 'equalsString',
    enableSorting: false,
  }),
  columnHelper.accessor('price', {
    cell: (info) => <span>$ {info.getValue()}</span>,
    header: () => 'Total Paid',
    enableSorting: false,
  }),
  columnHelper.accessor('paymentMethod', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => 'Payment',
    enableSorting: false,
  }),
  columnHelper.display({
    id: 'actions',
    cell: (info) => (
      <div className='flex justify-center'>
        <RowActions ctx={info} />
      </div>
    ),
  }),
];

export default function Table({ data }: { data: Order[] }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useDebouncedState('', 200);
  console.log('🚀 ~ Table ~ globalFilter:', globalFilter);

  const table = useReactTable({
    columns,
    data,
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugAll: true,
  });

  return (
    <div>
      <div className='flex items-center border border-b-0 border-brand-grey-300 p-4'>
        <h3 className='mr-3 flex-1 text-xl font-bold'>Orders</h3>
        <ul className='flex space-x-3'>
          <li>
            <Button
              className={cn(
                'h-[1.8125rem] px-2 text-secondary',
                !table.getColumn('orderStatus')?.getFilterValue() &&
                  'bg-brand-grey-300'
              )}
              onClick={() =>
                table.getColumn('orderStatus')?.setFilterValue(null)
              }
            >
              All Orders
            </Button>
          </li>
          {Array.from(
            data.reduce(
              (acc, order) => acc.add(order.orderStatus),
              new Set<string>()
            )
          ).map((status) => (
            <li key={status}>
              <Button
                className={cn(
                  'h-[1.8125rem] px-2 text-secondary',
                  table.getColumn('orderStatus')?.getFilterValue() === status &&
                    'bg-brand-grey-300'
                )}
                onClick={() =>
                  table.getColumn('orderStatus')?.setFilterValue(status)
                }
              >
                {status}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex items-center border border-b-0 border-brand-grey-300 p-4'>
        <p>
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
        <Input
          className='ml-auto'
          placeholder='Search Order'
          leftSection={<Search size={16} />}
          defaultValue={globalFilter}
          onChange={(value) => setGlobalFilter(value.target.value)}
        />
      </div>

      <MantineTable
        highlightOnHover
        horizontalSpacing={16}
        width={'100%'}
        border={1}
        borderColor='#EEE'
        withTableBorder
        className='mb-12'
      >
        <MantineTable.Thead>
          {table.getHeaderGroups().map((group) => (
            <MantineTable.Tr
              className='h-[3.5rem] bg-brand-grey-300 text-xs uppercase text-brand-grey-800'
              key={group.id}
            >
              {group.headers.map((header) => (
                <MantineTable.Th key={header.id}>
                  <div className='flex items-center'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getCanSort() ? (
                      <button
                        className='relative ml-2 h-6 w-3'
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <ChevronUp
                          size={12}
                          className={cn(
                            'absolute top-0',
                            header.column.getIsSorted() === 'desc' && 'hidden'
                          )}
                        />
                        <ChevronDown
                          size={12}
                          className={cn(
                            'absolute bottom-0',
                            header.column.getIsSorted() === 'asc' && 'hidden'
                          )}
                        />
                      </button>
                    ) : null}
                  </div>
                </MantineTable.Th>
              ))}
            </MantineTable.Tr>
          ))}
        </MantineTable.Thead>
        <MantineTable.Tbody>
          {table.getRowModel().rows.map((row) => (
            <MantineTable.Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <MantineTable.Td key={cell.id}>
                  <span className='line-clamp-1'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </span>
                </MantineTable.Td>
              ))}
            </MantineTable.Tr>
          ))}
        </MantineTable.Tbody>
      </MantineTable>
      <div className='flex justify-between'>
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
            root: 'flex items-center',
            label: 'text-base font-bold mr-2',
            input: 'w-[4.3125rem] font-bold',
          }}
        />
        <Pagination.Root
          value={table.getState().pagination.pageIndex + 1}
          onChange={(value) => table.setPageIndex(value - 1)}
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
    </div>
  );
}

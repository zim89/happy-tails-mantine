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
import { flushSync } from 'react-dom';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Table as MantineTable, UnstyledButton } from '@mantine/core';

import type { Order } from '@/shared/types/types';
import { cn } from '@/shared/lib/utils';
import { RowActions } from './RowActions';
import { useDebouncedState } from '@mantine/hooks';
import { CustomBadge } from '@/components/Badge/Badge';
import UpdateStatus from './UpdateStatus';
import classes from '../styles.module.css';
import { EntriesCount } from '@/components/EntriesCount/EntriesCount';
import { SearchEntry } from '@/components/SearchEntry';
import { EmptyRow } from '@/components/EmptyRow/EmptyRow';
import { TablePagination } from '@/components/TablePagination/TablePagination';
import { TableHead } from '@/components/TableHead';

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor('number', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => 'Order Id',
  }),
  columnHelper.accessor('email', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => 'Customers',
  }),
  columnHelper.accessor('orderProductDTOList', {
    cell: (info) => (
      <span className={cn('text-[0.625rem]', classes.printText)}>
        {info
          .getValue()
          .map(({ productName }) => productName)
          .join(', ')}
      </span>
    ),
    header: () => 'Product(s)',
    minSize: 200,
    enableSorting: false,
  }),
  columnHelper.accessor('createdDate', {
    cell: (info) => (
      <span>{dayjs.unix(info.getValue()).format('MMM DD, YYYY (HH:mm)')}</span>
    ),
    header: () => 'Date',
  }),
  columnHelper.accessor('orderStatus', {
    cell: (info) => (
      <UpdateStatus orderRow={info.cell.row.original}>
        {(toggle) => (
          <UnstyledButton onClick={toggle} classNames={{ root: 'p-0' }}>
            <CustomBadge
              color={info.getValue().toLowerCase()}
              name={info.getValue()}
            />
          </UnstyledButton>
        )}
      </UpdateStatus>
    ),
    header: () => 'Status',
    filterFn: 'equalsString',
    enableSorting: false,
  }),
  columnHelper.accessor('totalPrice', {
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
      <div className={classes.actions}>
        <RowActions ctx={info} />
      </div>
    ),
  }),
];

export default function Table({ data }: { data: Order[] }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useDebouncedState('', 200);

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
  });

  // While printing it reveals all table records
  useEffect(() => {
    const beforePrintHandler = () => {
      // Used to update the state before revealing a printing modal
      flushSync(() => table.setPageSize(Number.MAX_SAFE_INTEGER));
    };

    const afterPrintHandler = () => {
      table.setPageSize(10);
    };

    window.addEventListener('beforeprint', beforePrintHandler);
    window.addEventListener('afterprint', afterPrintHandler);

    return () => {
      window.removeEventListener('beforeprint', beforePrintHandler);
      window.removeEventListener('afterprint', afterPrintHandler);
    };
  }, []);

  return (
    <div>
      <div className={classes.orderCategories}>
        <h3 className='mr-3 flex-1 text-xl font-bold'>Orders</h3>
        <ul className='flex space-x-3'>
          <li>
            <UnstyledButton
              className={cn(
                'h-[1.8125rem] rounded-sm px-2 text-secondary hover:bg-brand-grey-200',
                !table.getColumn('orderStatus')?.getFilterValue() &&
                  'bg-brand-grey-300'
              )}
              onClick={() =>
                table.getColumn('orderStatus')?.setFilterValue(null)
              }
            >
              All Orders
            </UnstyledButton>
          </li>
          {Array.from(
            data.reduce(
              (acc, order) => acc.add(order.orderStatus),
              new Set<string>()
            )
          ).map((status) => (
            <li key={status}>
              <UnstyledButton
                className={cn(
                  'h-[1.8125rem] rounded-sm px-2 capitalize text-secondary hover:bg-brand-grey-200',
                  table.getColumn('orderStatus')?.getFilterValue() === status &&
                    'bg-brand-grey-300'
                )}
                onClick={() =>
                  table.getColumn('orderStatus')?.setFilterValue(status)
                }
              >
                {status.toLocaleLowerCase()}
              </UnstyledButton>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.orderHUD}>
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

        <SearchEntry value={globalFilter} handleChange={setGlobalFilter} />
      </div>

      <MantineTable
        highlightOnHover
        horizontalSpacing={16}
        width={'100%'}
        border={1}
        borderColor='#EEE'
        withTableBorder
      >
        <TableHead headerGroup={table.getHeaderGroups()} />
        <MantineTable.Tbody>
          {table.getRowModel().rows.length > 0 &&
            table.getRowModel().rows.map((row) => (
              <MantineTable.Tr key={row.id} className={classes.printText}>
                {row.getVisibleCells().map((cell) => (
                  <MantineTable.Td key={cell.id}>
                    <span className='line-clamp-1'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </span>
                  </MantineTable.Td>
                ))}
              </MantineTable.Tr>
            ))}
        </MantineTable.Tbody>
      </MantineTable>

      <EmptyRow
        visible={table.getRowModel().rows.length === 0}
        message='You have no any orders yet'
      />

      <TablePagination visible={table.getPageCount() > 1} table={table} />
    </div>
  );
}

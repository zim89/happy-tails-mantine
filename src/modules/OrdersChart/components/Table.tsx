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

import { Button, Table as MantineTable } from '@mantine/core';

import type { Order } from '@/shared/types/types';
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { cn } from '@/shared/lib/utils';
import dayjs from 'dayjs';
import { useDebouncedState } from '@mantine/hooks';
import { CustomBadge } from '@/components/Badge/Badge';
import UpdateStatus from '@/modules/OrderTable/components/UpdateStatus';
import { EntriesCount } from '@/components/EntriesCount';
import { SearchEntry } from '@/components/SearchEntry';
import { EmptyRow } from '@/components/EmptyRow';
import { TablePagination } from '@/components/TablePagination';
import { TableHead } from '@/components/TableHead';

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor('number', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => 'Order Id',
    enableSorting: false,
  }),
  columnHelper.accessor('email', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => 'Customers',
    enableSorting: false,
  }),
  columnHelper.accessor('createdDate', {
    cell: (info) => (
      <span>{dayjs(info.getValue()).format('MMM DD, YYYY (HH:mm)')}</span>
    ),
    header: () => 'Date',
    enableSorting: false,
  }),
  columnHelper.accessor('orderStatus', {
    cell: (info) => (
      <UpdateStatus orderRow={info.cell.row.original}>
        {(toggle) => (
          <Button onClick={toggle} classNames={{ root: 'p-0' }}>
            <CustomBadge
              color={info.getValue().toLowerCase()}
              name={info.getValue()}
            />
          </Button>
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
    <div className='flex-1 overflow-hidden rounded border border-[#EEE]'>
      <div>
        <h3 className='bg-white p-4 text-xl font-bold'>Recent Orders</h3>
      </div>

      <MantineTable
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
              <MantineTable.Tr key={row.id}>
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
        className='border-0'
      />
    </div>
  );
}

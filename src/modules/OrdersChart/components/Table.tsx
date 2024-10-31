'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { Table as MantineTable } from '@mantine/core';

import type { Order } from '@/shared/types/types';
import { CustomBadge } from '@/components/Badge/Badge';
import { EmptyRow } from '@/components/EmptyRow/EmptyRow';
import { TableHead } from '@/components/TableHead';

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor('number', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => 'Order Id',
    enableSorting: false,
    enableResizing: false,
  }),
  columnHelper.accessor('email', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => 'Customers',
    enableSorting: false,
    enableResizing: false,
  }),
  columnHelper.accessor('createdDate', {
    cell: (info) => (
      <span>{dayjs.unix(info.getValue()).format('MMM DD, YYYY (HH:mm)')}</span>
    ),
    header: () => 'Date',
    enableSorting: false,
    enableResizing: false,
  }),
  columnHelper.accessor('orderStatus', {
    cell: (info) => (
      <CustomBadge
        color={info.getValue().toLowerCase()}
        name={info.getValue()}
      />
    ),
    header: () => 'Status',
    filterFn: 'equalsString',
    enableSorting: false,
    enableResizing: false,
  }),
  columnHelper.accessor('totalPrice', {
    cell: (info) => <span>$ {info.getValue()}</span>,
    header: () => 'Total Paid',
    enableSorting: false,
    enableResizing: false,
  }),
];

export default function Table({ data }: { data: Order[] }) {
  const tableRows = useMemo(() => {
    return data
      .slice(0)
      .sort((a, b) => (a.createdDate < b.createdDate ? 1 : -1))
      .slice(0, 6);
  }, [data]);

  const table = useReactTable({
    columns,
    data: tableRows,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='flex-1 overflow-hidden rounded border border-brand-grey-300'>
      <div>
        <h3 className='bg-white p-4 text-xl font-bold'>Recent Orders</h3>
      </div>

      <MantineTable
        horizontalSpacing={16}
        width={'100%'}
        border={1}
        bg='#FFF'
        borderColor='#EEE'
        withTableBorder
        classNames={{ td: 'py-3' }}
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

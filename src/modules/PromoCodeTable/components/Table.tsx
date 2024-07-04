'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Table as MantineTable, UnstyledButton } from '@mantine/core';

import { cn } from '@/shared/lib/utils';
import dayjs from 'dayjs';
import { EmptyRow } from '@/components/EmptyRow';
import { TablePagination } from '@/components/TablePagination';
import { TableHead } from '@/components/TableHead';
import { PromoCode } from '../lib/data';
import { Clock3, PlusCircle } from 'lucide-react';
import { CustomBadge } from '@/components/Badge';

const columnHelper = createColumnHelper<PromoCode>();

const columns = [
  columnHelper.accessor('status', {
    cell: (info) => (
      <CustomBadge
        palette={{
          ACTIVE: '#389B48',
          COMPLETED: '#B4B4B4',
        }}
        color={info.getValue()}
        name={info.getValue()}
      />
    ),
    header: 'Status',
  }),
  columnHelper.accessor('discount', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: 'Discount, %',
  }),
  columnHelper.accessor('minOrder', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: 'Min order amount, $',
    minSize: 200,
  }),
  columnHelper.accessor('startDate', {
    cell: (info) => (
      <span>{dayjs(info.getValue()).format('MMM DD, YYYY')}</span>
    ),
    header: 'Start date',
  }),
  columnHelper.accessor('expirationDate', {
    cell: (info) => (
      <span>{dayjs(info.getValue()).format('MMM DD, YYYY')}</span>
    ),
    header: 'Expiration date',
  }),
  columnHelper.accessor('value', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: 'Promo code',
  }),
  columnHelper.display({
    id: 'actions',
    cell: (info) => (
      <div>
        <div>Actions</div>
      </div>
    ),
    header: 'Action',
  }),
];

export default function Table({ data }: { data: PromoCode[] }) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting: false,
  });

  const activeCodes = data.reduce(
    (acc, curr) => (curr.status === 'ACTIVE' ? acc + 1 : acc),
    0
  );

  return (
    <>
      <div className='flex border-x border-x-brand-grey-300 bg-white px-4 py-6'>
        {activeCodes > 0 ? (
          <h3 className='inline-flex items-center gap-2 text-sm font-normal text-brand-green-500'>
            <Clock3 size={24} />
            Active {activeCodes} Promo Codes
          </h3>
        ) : (
          <h3 className='inline-flex items-center gap-2 text-brand-grey-600'>
            <Clock3 size={24} />
            No active Promo Codes
          </h3>
        )}
        <UnstyledButton className='ml-auto flex items-center gap-2 rounded bg-secondary px-4 py-[10px] text-sm font-black text-primary'>
          <PlusCircle width={20} />
          Add new promo code
        </UnstyledButton>
      </div>

      <MantineTable
        highlightOnHover
        horizontalSpacing={16}
        width={'100%'}
        border={1}
        borderColor='#EEE'
        withTableBorder
        classNames={{
          td: 'py-6',
          tr: 'bg-brand-grey-200',
        }}
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
        className='bg-brand-grey-200'
        visible={table.getRowModel().rows.length === 0}
        message='You have not added any promo code yet'
      />

      <TablePagination visible={table.getPageCount() > 1} table={table} />
    </>
  );
}

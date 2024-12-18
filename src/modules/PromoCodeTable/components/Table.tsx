'use client';

import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import { Clock3 } from 'lucide-react';

import { EmptyRow } from '@/components/EmptyRow/EmptyRow';
import { TablePagination } from '@/components/TablePagination/TablePagination';
import { CustomBadge } from '@/components/Badge';
import AddCodeModal from '@/modules/AddCodeModal';
import { Discount } from '@/shared/api/discountApi';
import { Actions } from './Actions';
import { useSearchParams } from 'next/navigation';
import { ResizableTable } from '@/components/ResizableTable';
import { MemoizedTableBody } from '@/components/TableBody';
import {
  DEFAULT_TABLE_SIZE,
  MAX_TABLE_SIZE,
} from '@/shared/constants/sizes.const';
import { ResizableTableHead } from '@/components/ResizableTableHead';
import BrandBox from '@/components/BrandBox';

const columnHelper = createColumnHelper<Discount>();

const columns = [
  columnHelper.display({
    id: 'status',
    cell: (info) => {
      return (
        <CustomBadge
          palette={{
            ACTIVE: '#389B48',
            COMPLETED: '#B4B4B4',
            UPCOMING: '#FBBC04',
          }}
          color={
            info.row.original.beginningDate > Date.now()
              ? 'UPCOMING'
              : info.row.original.expirationDate < Date.now()
                ? 'COMPLETED'
                : 'ACTIVE'
          }
          name={
            info.row.original.beginningDate > Date.now()
              ? 'UPCOMING'
              : info.row.original.expirationDate < Date.now()
                ? 'COMPLETED'
                : 'ACTIVE'
          }
        />
      );
    },
    minSize: 85,
    header: 'Status',
  }),
  columnHelper.accessor('discount', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: 'Discount, %',
    minSize: 100,
  }),
  columnHelper.accessor('minPrice', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: 'Min order amount, $',
    minSize: 170,
  }),
  columnHelper.accessor('beginningDate', {
    cell: (info) => {
      return <span>{dayjs(info.getValue()).format('MMM DD, YYYY')}</span>;
    },
    header: 'Start date',
    minSize: 100,
  }),
  columnHelper.accessor('expirationDate', {
    cell: (info) => (
      <span>{dayjs(info.getValue()).format('MMM DD, YYYY')}</span>
    ),
    header: 'Expiration date',
    minSize: 140,
  }),
  columnHelper.accessor('code', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: 'Promo code',
    minSize: 100,
  }),
  columnHelper.display({
    id: 'actions',
    cell: (info) => <Actions {...info.row.original} />,
    header: 'Action',
    enableResizing: false,
  }),
];

export default function Table({ data }: { data: Discount[] }) {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  const table = useReactTable({
    columns,
    data,
    defaultColumn: {
      // Default column size
      size: DEFAULT_TABLE_SIZE / 7,
      // Maximum column size
      maxSize: MAX_TABLE_SIZE / 6,
    },
    state: {
      pagination: {
        pageIndex: page && page !== 'null' ? Number(page) - 1 : 0,
        pageSize: Number(limit) || 10,
      },
    },
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting: false,
  });

  const activeCodes = data.reduce(
    (acc, curr) => (curr.expirationDate > Date.now() ? acc + 1 : acc),
    0
  );

  return (
    <BrandBox title='Promo code' contentClassname='p-0'>
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
        <AddCodeModal />
      </div>
      <ResizableTable
        tableProps={{
          highlightOnHover: true,
          horizontalSpacing: 16,
          width: '100%',
          border: 1,
          borderColor: '#EEE',
          withTableBorder: true,
          classNames: {
            td: 'py-6',
            tr: 'bg-brand-grey-200',
          },
        }}
        table={table}
      >
        <ResizableTableHead headerGroup={table.getHeaderGroups()} />
        <MemoizedTableBody
          rowModel={table.getRowModel()}
          table={table}
          classNames={{ tr: 'tr items-center' }}
        />
      </ResizableTable>

      <EmptyRow
        className='bg-brand-grey-200'
        visible={table.getRowModel().rows.length === 0}
        message='You have not added any promo code yet'
      />

      <div
        style={{ width: table.getTotalSize(), padding: '0px 16px 16px 16px' }}
      >
        <TablePagination
          visible={table.getPageCount() > 1}
          table={table}
          segment='#promo'
        />
      </div>
    </BrandBox>
  );
}

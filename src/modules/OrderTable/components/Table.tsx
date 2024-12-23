'use client';

import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { flushSync } from 'react-dom';
import { useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import { UnstyledButton } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedState } from '@mantine/hooks';

import type { Order } from '@/shared/types/types';
import { cn } from '@/shared/lib/utils';
import { RowActions } from './RowActions';
import { CustomBadge } from '@/components/Badge/Badge';
import UpdateStatus from './UpdateStatus';
import classes from '../styles.module.css';
import { EntriesCount } from '@/components/EntriesCount/EntriesCount';
import { SearchEntry } from '@/components/SearchEntry';
import { EmptyRow } from '@/components/EmptyRow/EmptyRow';
import { TablePagination } from '@/components/TablePagination/TablePagination';
import {
  removeSearchParams,
  useSearchString,
} from '@/shared/helpers/searchParams.helpers';
import { ResizableTable } from '@/components/ResizableTable';
import { MemoizedTableBody } from '@/components/TableBody';
import OrderCounter from '@/components/OrderCounter';
import { calculateOrders } from '@/shared/lib/helpers';
import AdminOrderHeader from '@/modules/AdminOrderHeader';
import {
  DEFAULT_TABLE_SIZE,
  MAX_TABLE_SIZE,
} from '@/shared/constants/sizes.const';
import { ResizableTableHead } from '@/components/ResizableTableHead';

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor('number', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => 'Order Id',
    minSize: 100,
  }),
  columnHelper.accessor('email', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => 'Customers',
    minSize: 120,
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
    minSize: 100,
    enableSorting: false,
  }),
  columnHelper.accessor('createdDate', {
    cell: (info) => (
      <span>{dayjs.unix(info.getValue()).format('MMM DD, YYYY (HH:mm)')}</span>
    ),
    header: () => 'Date',
    minSize: 70,
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
    minSize: 60,
  }),
  columnHelper.accessor('totalPrice', {
    cell: (info) => <span>$ {info.getValue()}</span>,
    header: () => 'Total Paid',
    enableSorting: false,
    minSize: 80,
  }),
  columnHelper.accessor('paymentMethod', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => 'Payment',
    enableSorting: false,
    enableResizing: false,
    minSize: 100,
  }),
  columnHelper.display({
    id: 'actions',
    cell: (info) => (
      <div className={classes.actions}>
        <RowActions ctx={info} />
      </div>
    ),
    enableResizing: false,
    minSize: 60,
    enableSorting: false,
  }),
];

export default function Table({ data }: { data: Order[] }) {
  const [globalFilter, setGlobalFilter] = useDebouncedState('', 200);

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  const [createQueryString] = useSearchString(searchParams);

  const table = useReactTable({
    columns,
    data,
    defaultColumn: {
      size: DEFAULT_TABLE_SIZE / 8,
      maxSize: MAX_TABLE_SIZE / 6,
    },
    columnResizeMode: 'onChange',
    initialState: {
      sorting: [
        {
          id: 'createdDate',
          desc: true,
        },
      ],
    },
    state: {
      globalFilter,
      pagination: {
        pageSize: Number(limit) || 10,
        pageIndex: page && page !== 'null' ? Number(page) - 1 : 0,
      },
    },
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
      table.setPageSize(Number(page) - 1);
    };

    window.addEventListener('beforeprint', beforePrintHandler);
    window.addEventListener('afterprint', afterPrintHandler);

    return () => {
      window.removeEventListener('beforeprint', beforePrintHandler);
      window.removeEventListener('afterprint', afterPrintHandler);
    };
  }, []);

  const calculatedTypes = useMemo(() => calculateOrders(data), [data]);

  return (
    <>
      <div style={{ width: table.getTotalSize() }}>
        <AdminOrderHeader />
        <OrderCounter
          className={classes.counter}
          newOrders={calculatedTypes['NEW']}
          inProgress={calculatedTypes['IN PROGRESS']}
          completed={calculatedTypes['COMPLETED']}
          canceled={calculatedTypes['CANCELLED']}
        />
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
                onClick={() => {
                  const params = removeSearchParams(searchParams, ['status']);
                  table.getColumn('orderStatus')?.setFilterValue(null);
                  router.replace('?' + params.toString());
                }}
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
                    table.getColumn('orderStatus')?.getFilterValue() ===
                      status && 'bg-brand-grey-300'
                  )}
                  onClick={() => {
                    table.getColumn('orderStatus')?.setFilterValue(status);
                    router.replace(
                      '?' +
                        createQueryString({
                          status: status.replaceAll(' ', '_'),
                          page: '1',
                        })
                    );
                  }}
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
      </div>

      <ResizableTable
        table={table}
        tableProps={{
          horizontalSpacing: 16,
          border: 1,
          borderColor: '#EEE',
          withTableBorder: true,
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
        message='You have no any orders yet'
      />

      <div style={{ width: table.getTotalSize() }}>
        <TablePagination visible={table.getPageCount() > 1} table={table} />
      </div>
    </>
  );
}

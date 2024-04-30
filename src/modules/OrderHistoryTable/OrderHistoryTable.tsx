import { Table, Button, Pagination, Group, Select } from '@mantine/core';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useSelectOrders } from '@/shared/hooks/useSelectOrders';
import { formatOrderDate } from '@/shared/lib/helpers';
import { cn } from '@/shared/lib/utils';
import { Order } from '@/shared/types/types';

import classes from './classes.module.css';
import { EntriesCount } from '@/components/EntriesCount';
import { SearchEntry } from '@/components/SearchEntry';
import { useDebouncedState } from '@mantine/hooks';
import { ChevronDown, ChevronUp } from 'lucide-react';
import PaginationPrevBtn from '@/components/PaginationPrevBtn';
import PaginationNextBtn from '@/components/PaginationNextBtn';
import { CustomBadge } from '@/components/Badge';

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor('number', {
    cell: (info) => <span className={classes.cell}>{info.getValue()}</span>,
    header: () => 'ORDER ID',
  }),
  columnHelper.accessor('orderProductDTOList', {
    cell: (info) => (
      <span className={cn(classes.cell, 'text-[0.625rem] max-w-[204px]')}>
        {info
          .getValue()
          .map(({ productName }) => productName)
          .join(', ')}
      </span>
    ),
    header: () => 'PRODUCT(s)',
    minSize: 200,
    enableSorting: false,
  }),
  columnHelper.accessor('createdDate', {
    cell: (info) => <span>{formatOrderDate(info.getValue())}</span>,
    header: 'DATE',
  }),
  columnHelper.accessor('orderStatus', {
    cell: (info) => <CustomBadge
    color={info.getValue().toLowerCase()}
    name={info.getValue()}
  />,
    header: 'STATUS',
    enableSorting: false
  }),
  columnHelper.accessor('price', {
    cell: (info) => <span>$ {info.getValue()}</span>,
    header: 'TOTAL PAID',
    enableSorting: false
  }),
  columnHelper.accessor('paymentMethod', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: 'PAYMENT',
    enableSorting: false
  }),
];

export default function OrderHistoryTable() {
  const orders = useSelectOrders((state) =>
    state.filter((order) => order.email === 'admin@example.com')
  );

  const [search, setSearch] = useDebouncedState('', 200);

  const table = useReactTable({
    data: orders || [],
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

  const paginate = (value: number) => {
    table.setPageIndex(value - 1);
  };

  return (
    <div className='mt-8 bg-white'>
      <div className={classes.orderCategories}>
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
            orders.reduce(
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

      <Table
        highlightOnHover
        horizontalSpacing={16}
        width={'100%'}
        border={1}
        borderColor='#EEE'
        withTableBorder
      >
        <Table.Thead>
          {table.getHeaderGroups().map((group) => (
            <Table.Tr
              key={group.id}
              classNames={{ tr: 'bg-[#EEEEEE] text-[#787878]' }}
            >
              {group.headers.map((header) => (
                <Table.Th key={header.id} classNames={{ th: 'p-4 whitespace-nowrap' }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {header.column.getCanSort() ? (
                    <button
                      className='relative ml-2 -translate-y-1'
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <ChevronUp
                        size={12}
                        className={cn(
                          'absolute bottom-0',
                          header.column.getIsSorted() === 'desc' && 'hidden'
                        )}
                      />
                      <ChevronDown
                        size={12}
                        className={cn(
                          'absolute top-0',
                          header.column.getIsSorted() === 'asc' && 'hidden'
                        )}
                      />
                    </button>
                  ) : null}
                </Table.Th>
              ))}
            </Table.Tr>
          ))}
        </Table.Thead>
        <Table.Tbody>
        {table.getRowModel().rows.length > 0 &&
            table.getRowModel().rows.map((row) => (
              <Table.Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Td key={cell.id} classNames={{ td: 'p-4' }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
        </Table.Tbody>
      </Table>

      {table.getRowModel().rows.length === 0 && (
        <p className='border-[1px] border-[#EEE] p-4 text-sm/[21px] text-[#787878]'>
          User has not made any orders in the store yet
        </p>
      )}

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
        </div>)}
    </div>
  );
}

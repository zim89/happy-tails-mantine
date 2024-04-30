import { useDebouncedState } from '@mantine/hooks';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Table as MantineTable, Pagination, Select, Group } from '@mantine/core';

import { User } from '@/shared/types/auth.types';
import { EntriesCount } from '@/components/EntriesCount';
import { SearchEntry } from '@/components/SearchEntry';
import { cn } from '@/shared/lib/utils';
import { formatArrayToDate } from '@/shared/lib/helpers';

import classes from '../classes.module.css';
import { Actions } from './Actions';
import { ChevronDown, ChevronUp } from 'lucide-react';
import PaginationPrevBtn from '@/components/PaginationPrevBtn';
import PaginationNextBtn from '@/components/PaginationNextBtn';

type Props = {
  data: User[];
};

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('userId', {
    cell: (info) => {
      return (
        <span className={cn(classes.cell, 'max-w-[94px]')}>
          {info.getValue()}
        </span>
      );
    },
    header: 'User id',
  }),
  columnHelper.accessor('firstName', {
    cell: (info) => {
      return (
        <span className='whitespace-pre'>
          {info.row.original.firstName} {info.row.original.lastName}
        </span>
      );
    },
    header: 'Name',
  }),
  columnHelper.accessor('email', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: 'Email',
    enableSorting: false,
  }),
  columnHelper.accessor('attributes', {
    cell: (info) => (
      <span>{info.row.original.attributes?.phone || 'None'}</span>
    ),
    header: 'Phone',
    enableSorting: false,
  }),
  columnHelper.accessor('registerDate', {
    cell: (info) => {
      // Apr 26, 2024 (22:18) => ['Apr 26,', '2024', '(22:18)']
      const splittedDate = formatArrayToDate(info.getValue()).split(/(\w{4})/g);

      return <div>
        <span className="whitespace-pre">{splittedDate[0]}{splittedDate[1]}</span>
        <span>{splittedDate[2]}</span>
      </div>;
    },
    header: 'Date',
  }),
  columnHelper.display({
    id: 'actions',
    cell: (info) => <Actions ctx={info} />,
    size: 50,
    header: 'Action',
    enableSorting: false,
  }),
];

export const Table = ({ data }: Props) => {
  const [search, setSearch] = useDebouncedState('', 200);

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

  const paginate = (value: number) => {
    table.setPageIndex(value - 1);
  };

  return (
    <>
      <div className='mt-10 flex items-center justify-between border-[1px] border-b-0 bg-white p-4'>
        <h2 className='mr-6 text-xl/[24px] font-bold'>Users</h2>
      </div>

      <div className='flex items-center justify-between border-[1px] border-b-0 bg-white p-4'>
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

      <MantineTable highlightOnHover bgcolor='white' withTableBorder borderColor='#EEE'>
        <MantineTable.Thead>
          {table.getHeaderGroups().map((group) => (
            <MantineTable.Tr key={group.id} classNames={{ tr: 'bg-[#EEE]' }}>
              {group.headers.map((header) => (
                <MantineTable.Th
                  key={header.id}
                  classNames={{ th: 'p-4 text-[#787878] uppercase' }}
                >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getCanSort() ? (
                      <button className="relative ml-2 -translate-y-1" onClick={header.column.getToggleSortingHandler()}>
                        <ChevronUp
                          size={12}
                          className={cn(
                            "absolute bottom-0",
                            header.column.getIsSorted() === 'desc' && 'hidden'
                          )}
                        />
                        <ChevronDown
                          size={12}
                          className={cn(
                            "absolute top-0",
                            header.column.getIsSorted() === 'asc' && 'hidden'
                          )}
                        />
                      </button>
                    ) : null}
                </MantineTable.Th>
              ))}
            </MantineTable.Tr>
          ))}
        </MantineTable.Thead>
        <MantineTable.Tbody>
          {table.getRowModel().rows.length > 0 &&
            table.getRowModel().rows.map((row) => (
              <MantineTable.Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <MantineTable.Td key={cell.id} classNames={{ td: 'p-4' }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </MantineTable.Td>
                ))}
              </MantineTable.Tr>
            ))}
        </MantineTable.Tbody>
      </MantineTable>

      {table.getRowModel().rows.length === 0 && (
        <p className='border-[1px] border-[#EEE] p-4 text-sm/[21px] text-[#787878]'>
          You have no any users yet
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
    </>
  );
};

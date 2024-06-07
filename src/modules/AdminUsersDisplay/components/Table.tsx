import { useDebouncedState } from '@mantine/hooks';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Table as MantineTable } from '@mantine/core';

import { User } from '@/shared/types/auth.types';
import { EntriesCount } from '@/components/EntriesCount';
import { SearchEntry } from '@/components/SearchEntry';
import { cn } from '@/shared/lib/utils';
import { formatDateFromArray } from '@/shared/lib/helpers';

import classes from '../classes.module.css';
import { Actions } from './Actions';
import { TableHead } from '@/components/TableHead';
import { TableBody } from '@/components/TableBody';
import { EmptyRow } from '@/components/EmptyRow';
import { TablePagination } from '@/components/TablePagination';

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
  // columnHelper.accessor('attributes', {
  //   cell: (info) => (
  //     <span>{info.row.original.attributes?.phone || 'None'}</span>
  //   ),
  //   header: 'Phone',
  //   enableSorting: false,
  // }),
  columnHelper.accessor('registerDate', {
    cell: (info) => {
      // Apr 26, 2024 (22:18) => ['Apr 26,', '2024', '(22:18)']
      const splittedDate = formatDateFromArray(info.getValue()).split(
        /(\w{4})/g
      );

      return (
        <div>
          <span className='whitespace-pre'>
            {splittedDate[0]}
            {splittedDate[1]}
          </span>
          <span>{splittedDate[2]}</span>
        </div>
      );
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

      <MantineTable
        highlightOnHover
        bgcolor='white'
        withTableBorder
        borderColor='#EEE'
      >
        <TableHead headerGroup={table.getHeaderGroups()} />
        <TableBody rowModel={table.getRowModel()} />
      </MantineTable>

      <EmptyRow
        visible={table.getRowModel().rows.length === 0}
        message='You have no any users yet'
      />

      <TablePagination visible={table.getPageCount() > 1} table={table} />
    </>
  );
};

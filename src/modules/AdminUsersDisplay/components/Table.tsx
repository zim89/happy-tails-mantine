import { useDebouncedState } from '@mantine/hooks';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { User } from '@/shared/types/auth.types';
import { EntriesCount } from '@/components/EntriesCount/EntriesCount';
import { SearchEntry } from '@/components/SearchEntry';
import { cn } from '@/shared/lib/utils';
import { formatDateFromArray } from '@/shared/lib/helpers';

import classes from '../classes.module.css';
import { Actions } from './Actions';
import { MemoizedTableBody } from '@/components/TableBody';
import { EmptyRow } from '@/components/EmptyRow/EmptyRow';
import { TablePagination } from '@/components/TablePagination/TablePagination';
import { useSearchParams } from 'next/navigation';
import { ResizableTable } from '@/components/ResizableTable';
import {
  DEFAULT_TABLE_SIZE,
  MAX_TABLE_SIZE,
} from '@/shared/constants/sizes.const';
import { ResizableTableHead } from '@/components/ResizableTableHead';

type Props = {
  data: User[];
};

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('userId', {
    cell: (info) => {
      return <span>{info.getValue()}</span>;
    },
    header: 'User id',
    minSize: 90,
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
    minSize: 80,
  }),
  columnHelper.accessor('email', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: 'Email',
    enableSorting: false,
    minSize: 90,
  }),

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
    minSize: 80,
  }),
  columnHelper.display({
    id: 'actions',
    cell: (info) => <Actions ctx={info} />,
    size: 80,
    header: 'Action',
    enableSorting: false,
    enableResizing: false,
  }),
];

export const Table = ({ data }: Props) => {
  const [search, setSearch] = useDebouncedState('', 200);
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      size: DEFAULT_TABLE_SIZE / 5,
      maxSize: MAX_TABLE_SIZE / 4,
    },
    state: {
      globalFilter: search,
      pagination: {
        pageIndex: page ? Number(page) - 1 : 0,
        pageSize: Number(limit) || 10,
      },
    },
    columnResizeMode: 'onChange',
    onGlobalFilterChange: setSearch,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <div style={{ width: table.getTotalSize() + 2 }}>
        <div className='mt-10 flex items-center justify-between border border-b-0 bg-white p-4'>
          <h2 className='mr-6 text-xl/[24px] font-bold'>Users</h2>
        </div>

        <div className='flex items-center justify-between border border-b-0 bg-white p-4'>
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
      </div>

      <ResizableTable
        table={table}
        tableProps={{
          bgcolor: 'white',
          withTableBorder: true,
          borderColor: '#EEE',
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
        message='You have no any users yet'
      />
      <div style={{ width: table.getTotalSize() }}>
        <TablePagination visible={table.getPageCount() > 1} table={table} />
      </div>
    </>
  );
};

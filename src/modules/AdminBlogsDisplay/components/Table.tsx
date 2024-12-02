import { useDebouncedState } from '@mantine/hooks';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';
import { Button, Table as MantineTable, Select } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

import { Post } from '@/shared/api/postApi';
import { cn } from '@/shared/lib/utils';
import { EmptyRow } from '@/components/EmptyRow/EmptyRow';
import { SearchEntry } from '@/components/SearchEntry';
import { TablePagination } from '@/components/TablePagination/TablePagination';
import { useSearchString } from '@/shared/helpers/searchParams.helpers';

import classes from '../classes.module.css';
import { CustomTableRow } from './CustomTableRow';

const sortingFieldsMap: {
  [P in string]: { field: string; order: 'desc' | 'asc' };
} = {
  'Date (new to old)': {
    field: 'createdAt',
    order: 'desc',
  },
  'Date (old to new)': {
    field: 'createdAt',
    order: 'asc',
  },
  'Name A - Z': {
    field: 'title',
    order: 'asc',
  },
  'Name Z - A': {
    field: 'title',
    order: 'desc',
  },
};

type Props = {
  data: Post[];
};

const columnHelper = createColumnHelper<Post>();

// It's used only for sorting and filtering purposes
const columns = [
  columnHelper.accessor('title', {}),
  columnHelper.accessor('postStatus', {}),
  columnHelper.accessor('createdAt', { sortingFn: 'alphanumeric' }),
];

export const Table = ({ data }: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const limit = params.get('limit');
  const page = params.get('page');
  const searchParam = params.get('search');
  const [createQueryString] = useSearchString(params);
  const [search, setSearch] = useDebouncedState(searchParam || '', 200);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: search,
      pagination: {
        pageIndex: page && page !== 'null' ? Number(page) - 1 : 0,
        pageSize: Number(limit) || 10,
      },
    },
    onGlobalFilterChange: setSearch,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const rowModel = table.getRowModel();

  return (
    <>
      <div className='flex items-center justify-between border border-b-0 bg-white p-4'>
        <h2 className='mr-6 text-xl/[1.5rem] font-bold'>Articles</h2>
        <div className='flex gap-6'>
          <Button
            variant='transparent'
            onClick={() => {
              table.getColumn('postStatus')?.setFilterValue(null);
              router.replace(
                '?' +
                  createQueryString({
                    page: '1',
                  })
              );
            }}
            classNames={{
              root: cn(
                'rounded-sm px-2 py-1 text-sm text-secondary hover:bg-brand-grey-300 hover:text-secondary',
                !table.getColumn('postStatus')?.getFilterValue() &&
                  'bg-brand-grey-300'
              ),
            }}
          >
            All
          </Button>
          {Array.from(
            data.reduce(
              (acc, post) => acc.add(post.postStatus),
              new Set<string>()
            )
          ).map((status) => (
            <Button
              key={status}
              variant='transparent'
              className={cn(
                'rounded-sm px-2 py-1 text-sm text-secondary hover:bg-brand-grey-300 hover:text-secondary',
                table.getColumn('postStatus')?.getFilterValue() === status &&
                  'bg-brand-grey-300'
              )}
              onClick={() => {
                table.getColumn('postStatus')?.setFilterValue(status);
                router.replace(
                  '?' +
                    createQueryString({
                      page: '1',
                    })
                );
              }}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      <div className='flex items-center justify-between border bg-white p-4'>
        <Select
          label='Sort By'
          allowDeselect={false}
          rightSection={<ChevronDown size={16} />}
          defaultValue='Date (new to old)'
          onChange={(e) => {
            if (e && sortingFieldsMap[e]) {
              const { field, order } = sortingFieldsMap[e];
              table.getColumn(field)?.toggleSorting(order === 'desc');
            }
          }}
          classNames={{
            input: 'border-0 form-input font-bold user-select-none',
            root: 'flex items-center',
            section: 'right-8',
          }}
          data={
            [
              'Date (new to old)',
              'Date (old to new)',
              'Name A - Z',
              'Name Z - A',
            ] as const
          }
        />

        <SearchEntry value={search} handleChange={setSearch} />
      </div>

      <MantineTable
        highlightOnHover
        classNames={{
          tr: 'bg-primary shadow-[0px_0px_1px_1px_#EEE] hover:shadow-[0px_8px_4px_#EEE] w-full',
          td: classes.td,
          table: 'border-spacing-y-4 border-separate',
        }}
      >
        <MantineTable.Tbody className='flex flex-col gap-4'>
          {rowModel.rows.length > 0 &&
            rowModel.rows.map((row) => {
              return (
                <CustomTableRow key={row.original.id} row={row.original} />
              );
            })}
        </MantineTable.Tbody>
      </MantineTable>

      <EmptyRow
        visible={table.getRowModel().rows.length === 0}
        message='You have no written blog yet'
      />

      <TablePagination visible={table.getPageCount() > 1} table={table} />
    </>
  );
};

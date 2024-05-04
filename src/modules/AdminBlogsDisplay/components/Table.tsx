import { useDebouncedState } from '@mantine/hooks';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button, Table as MantineTable } from '@mantine/core';

import { Post } from '@/shared/api/postApi';
import { EntriesCount } from '@/components/EntriesCount';
import classes from '../classes.module.css';
import { SearchEntry } from '@/components/SearchEntry';
import { cn } from '@/shared/lib/utils';
import { EmptyRow } from '@/components/EmptyRow';
import { TablePagination } from '@/components/TablePagination';
import { CustomBadge } from '@/components/Badge';
import Image from 'next/image';
import { formatPostDateFromNumber } from '@/shared/lib/helpers';
import { Actions } from './Actions';
import React from 'react';
import { TableBody } from '@/components/TableBody';

type Props = {
  data: Post[];
};

const columnHelper = createColumnHelper<Post>();

const columns = [
  columnHelper.accessor('posterImgSrc', {
    cell: (info) => {
      return (
        <Image
          src={info.getValue()}
          width={120}
          height={120}
          className='aspect-square max-w-[120px] object-cover'
          alt={info.row.original.slug}
        />
      );
    },
  }),
  columnHelper.accessor('publishedAt', {
    cell: (info) => {
      return (
        <hgroup>
          <h3 className='text-lg whitespace-nowrap overflow-hidden text-ellipsis max-w-[600px]'>{info.row.original.title}</h3>
          <p className='font-light'>
            {formatPostDateFromNumber(info.getValue())}
          </p>
        </hgroup>
      );
    },
  }),
  columnHelper.accessor('postStatus', {
    cell: (info) => (
      <CustomBadge
        color={info.getValue().toLowerCase()}
        name={info.getValue()}
        palette={{
          published: '#389B48',
          draft: '#FBBC04',
          archived: '#B4B4B4',
        }}
      />
    ),
  }),
  columnHelper.display({
    id: 'actions',
    cell: (info) => <Actions />,
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
  });

  return (
    <>
      <div className='flex items-center justify-between border-[1px] border-b-0 bg-white p-4'>
        <h2 className='mr-6 text-xl/[24px] font-bold'>Articles</h2>
        <div className='flex gap-6'>
          <Button
            onClick={() => table.getColumn('postStatus')?.setFilterValue(null)}
            classNames={{
              root: cn(
                'rounded-sm px-2 py-1 text-sm text-[#161616]',
                !table.getColumn('postStatus')?.getFilterValue() &&
                  'bg-gray-300'
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
              className={cn(
                'rounded-sm px-2 py-1 text-sm text-[#161616]',
                table.getColumn('postStatus')?.getFilterValue() === status &&
                  'bg-brand-grey-300'
              )}
              onClick={() =>
                table.getColumn('postStatus')?.setFilterValue(status)
              }
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      <div className='flex items-center justify-between border-[1px] bg-white p-4'>
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
        classNames={{
          tr: 'bg-white shadow-[0px_0px_1px_1px_#EEE] hover:shadow-[0px_8px_4px_#EEE] cursor-pointer',
          td: classes.td,
          table: 'border-spacing-y-4 border-separate',
        }}
      >
        <TableBody rowModel={table.getRowModel()} />
      </MantineTable>

      <EmptyRow
        visible={table.getRowModel().rows.length === 0}
        message='You have no written blog yet'
      />

      <TablePagination visible={table.getPageCount() > 1} table={table} />
    </>
  );
};

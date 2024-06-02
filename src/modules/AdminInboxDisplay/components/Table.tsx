"use client";

import { useDebouncedState } from '@mantine/hooks';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Table as MantineTable, Checkbox, Menu, UnstyledButton } from '@mantine/core';

import { EntriesCount } from '@/components/EntriesCount';
import { SearchEntry } from '@/components/SearchEntry';
import { TableHead } from '@/components/TableHead';
import { TableBody } from '@/components/TableBody';
import { EmptyRow } from '@/components/EmptyRow';
import { TablePagination } from '@/components/TablePagination';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type Props = {
  data: any[];
};

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('name', {
    header: "",
    enableSorting: false,
  }),
  columnHelper.accessor('message', {
    header: "",
    enableSorting: false,
  }),
  columnHelper.accessor('status', {
    header: "",
    enableSorting: false,
  }),
  columnHelper.accessor('receivedAt', {
    header: "",
    enableSorting: false,
  }),
  columnHelper.display({
    id: 'actions',
    cell: (info) => <></>,
    header: '',
    enableSorting: false,
  }),
];

export const Table = ({ data }: Props) => {
  const [search, setSearch] = useDebouncedState('', 200);
  const [checked, setChecked] = useState(false);

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
        <h2 className='mr-6 text-xl/[24px] font-bold'>Messages</h2>
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

      <MantineTable bgcolor='white' withTableBorder borderColor='#EEE'>
        {/* Table header */}
        <div className='bg-[#EEE] px-5 py-4'>
          <Menu position='bottom-start' classNames={{ dropdown: "-ml-[52px] mt-[10px] p-0 py-2" }}>
            <div className="flex items-center gap-4">
              <Checkbox size='xs' checked={checked} onChange={e => setChecked(e.target.checked)} color='black' styles={{ icon: { stroke: "black" } }}/>
              <Menu.Target>
                <ChevronDown size={16} className='cursor-pointer' />
              </Menu.Target>
            </div>
            <Menu.Dropdown classNames={{ dropdown: "flex flex-col text-sm" }}>
              <UnstyledButton className="py-2 px-4 hover:bg-brand-grey-200">All</UnstyledButton>
              <UnstyledButton className="py-2 px-4 hover:bg-brand-grey-200">None</UnstyledButton>
              <UnstyledButton className="py-2 px-4 hover:bg-brand-grey-200">Read</UnstyledButton>
              <UnstyledButton className="py-2 px-4 hover:bg-brand-grey-200">Unread</UnstyledButton>
              <UnstyledButton className="py-2 px-4 hover:bg-brand-grey-200">Starred</UnstyledButton>
              <UnstyledButton className="py-2 px-4 hover:bg-brand-grey-200">Unstarred</UnstyledButton>
            </Menu.Dropdown>
          </Menu>
        </div>
        <TableBody rowModel={table.getRowModel()} />
      </MantineTable>

      <EmptyRow visible={table.getRowModel().rows.length === 0} message="No new messages. Please check back later." />

      <TablePagination visible={table.getPageCount() > 1} table={table} />
    </>
  );
};
'use client';

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
import {
  Table as MantineTable,
  Checkbox,
  Menu,
  UnstyledButton,
  Badge,
  LoadingOverlay,
} from '@mantine/core';
import { useState, useMemo, type ChangeEvent } from 'react';
import { Mail } from 'lucide-react';

import { EntriesCount } from '@/components/EntriesCount/EntriesCount';
import { SearchEntry } from '@/components/SearchEntry';
import { EmptyRow } from '@/components/EmptyRow/EmptyRow';
import { TablePagination } from '@/components/TablePagination/TablePagination';
import { Star } from './Star';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';
import { InboxActions } from './InboxActions';
import DeleteMessagesModal from '@/modules/DeleteMessagesModal';
import { BADGE_PALETTE } from '../lib/inbox.const';
import type { Feedback } from '@/shared/types/feedback.types';
import { useBulkEditMutation } from '@/shared/api/feedbackApi';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';

const columnHelper = createColumnHelper<Feedback>();

const columns = [
  columnHelper.accessor('userName', {
    header: '',
    enableSorting: false,
    size: 150,
    cell: (info) => (
      <p className='mx-4 overflow-hidden text-ellipsis whitespace-pre text-sm font-bold'>
        {info.getValue()}
      </p>
    ),
  }),
  columnHelper.accessor('content', {
    header: '',
    enableSorting: false,
    size: 458,
    cell: (info) => (
      <p className='max-w-[458px] overflow-hidden text-ellipsis whitespace-pre font-bold'>
        {info.getValue()}
      </p>
    ),
  }),
  columnHelper.accessor('feedbackStatus', {
    header: '',
    enableSorting: false,
    // Instead of { width: auto }
    size: 100000,
    cell: (info) => (
      <span className='mx-3'>
        <Badge color={BADGE_PALETTE[info.getValue()]}>{info.getValue()}</Badge>
      </span>
    ),
  }),
  columnHelper.accessor('sentAt', {
    header: '',
    enableSorting: false,
    size: 25000,
    cell: (info) => (
      <span className=''>
        {dayjs.unix(info.getValue()).format('DD MMM, YYYY (HH:mm)')}
      </span>
    ),
  }),
];

export const InboxTable = ({ data }: { data: Feedback[] }) => {
  const [search, setSearch] = useDebouncedState('', 200);
  const [checked, _] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const [bulkEdit] = useBulkEditMutation();

  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  let tableData = useMemo(() => {
    if (data.length === 0) return [];

    return [...data].sort((a, b) => b.id - a.id);
  }, [data]);

  const table = useReactTable({
    data: tableData,
    columns,
    initialState: {
      sorting: [
        {
          desc: true,
          id: 'sentAt',
        },
      ],
    },
    state: {
      globalFilter: search,
      pagination: {
        pageIndex: page ? Number(page) - 1 : 0,
        pageSize: Number(limit) || 10,
      },
    },
    onGlobalFilterChange: setSearch,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleMarkAsRead = async () => {
    const data = table.getRowModel().rows.reduce((acc, row) => {
      if (selected.includes(row.original.id)) {
        acc.push({ ...row.original, feedbackStatus: 'REVIEWING' });
      }
      return acc;
    }, [] as Feedback[]);

    try {
      setLoading(true);
      await bulkEdit(data).unwrap();
      toast.success('Feedbacks marked as read!');
    } catch (err) {
      if (isAxiosQueryError(err)) {
        toast.error(isErrorDataString(err.data) ? err.data : err.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;

    if (!value) {
      setSelected([]);
    } else {
      const selected = table.getRowModel().rows.reduce((acc, row) => {
        acc.push(row.original.id);
        return acc;
      }, [] as number[]);
      setSelected(selected);
    }
  };

  return (
    <>
      <div className='mt-10 flex items-center justify-between border border-b-0 bg-white p-4'>
        <h2 className='mr-6 text-xl/[1.5rem] font-bold'>Messages</h2>
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

      <MantineTable
        withTableBorder
        borderColor='#EEE'
        className='relative bg-primary'
        styles={{ td: { padding: '16px 0px' }, tr: { verticalAlign: 'sub' } }}
      >
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{
            radius: 'sm',
            blur: 2,
          }}
          loaderProps={{ color: '#161616' }}
          classNames={{ loader: 'absolute top-1/3 left-1/2' }}
        />
        {/* Table header */}
        <MantineTable.Thead classNames={{ thead: 'bg-brand-grey-300' }}>
          <MantineTable.Tr>
            <MantineTable.Th colSpan={7} classNames={{ th: 'py-5 px-4' }}>
              <Menu
                opened={opened}
                onClose={() => setOpened(false)}
                position='bottom-start'
                classNames={{ dropdown: '-ml-[46px] px-0 py-2' }}
              >
                <span className='flex items-center gap-4'>
                  <Checkbox
                    size='xs'
                    checked={selected.length > 0 || checked}
                    onChange={handleChecked}
                    color='black'
                    styles={{ icon: { stroke: 'black' } }}
                    classNames={{ input: 'cursor-pointer' }}
                  />
                  {(selected.length > 0 ||
                    (checked && selected.length > 0)) && (
                    <span className='flex gap-12'>
                      <UnstyledButton
                        className='flex items-center gap-2 text-sm'
                        onClick={handleMarkAsRead}
                      >
                        <Mail size={16} />
                        Mark as read
                      </UnstyledButton>
                      <DeleteMessagesModal
                        messages={selected}
                        setSelected={setSelected}
                      />
                    </span>
                  )}
                </span>
              </Menu>
            </MantineTable.Th>
          </MantineTable.Tr>
        </MantineTable.Thead>

        {/* Table body */}
        <MantineTable.Tbody>
          {table.getRowModel().rows.length > 0 &&
            table.getRowModel().rows.map((row) => (
              <MantineTable.Tr key={row.id}>
                {/* Checkbox */}
                <MantineTable.Td>
                  <Checkbox
                    size='xs'
                    disabled={checked && !selected.includes(row.original.id)}
                    checked={selected.includes(row.original.id)}
                    onChange={() => {
                      !selected.includes(row.original.id) &&
                        setSelected((prev) => [...prev, row.original.id]);
                      selected.includes(row.original.id) &&
                        setSelected((prev) =>
                          prev.filter((id) => id !== row.original.id)
                        );
                    }}
                    classNames={{ root: 'mx-4', input: 'cursor-pointer' }}
                    color='black'
                    styles={{ icon: { stroke: 'black' } }}
                  />
                </MantineTable.Td>
                {/* Starred */}
                <MantineTable.Td>
                  <Star id={row.original.id} starred={row.original.starred} />
                </MantineTable.Td>
                {/* Other columns */}
                {row.getVisibleCells().map((cell) => {
                  return (
                    <MantineTable.Td
                      key={cell.id}
                      styles={{ td: { width: `${cell.column.getSize()}px` } }}
                      classNames={{ td: 'p-4' }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </MantineTable.Td>
                  );
                })}
                {/* Actions */}
                <MantineTable.Td>
                  <InboxActions message={row.original} />
                </MantineTable.Td>
              </MantineTable.Tr>
            ))}
        </MantineTable.Tbody>
      </MantineTable>

      <EmptyRow
        visible={table.getRowModel().rows.length === 0}
        message='No new messages. Please check back later.'
      />
      <TablePagination visible={table.getPageCount() > 1} table={table} />
    </>
  );
};

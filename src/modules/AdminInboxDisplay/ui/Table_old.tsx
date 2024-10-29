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
} from '@mantine/core';
import { useState, useMemo, useEffect, type ChangeEvent } from 'react';
import { ChevronDown, Mail, Star as StarIcon } from 'lucide-react';

import { EntriesCount } from '@/components/EntriesCount/EntriesCount';
import { SearchEntry } from '@/components/SearchEntry';
import { EmptyRow } from '@/components/EmptyRow/EmptyRow';
import { TablePagination } from '@/components/TablePagination/TablePagination';
import { Star } from './Star';
import {
  formatDateToClockTime,
  isAxiosQueryError,
  isErrorDataString,
} from '@/shared/lib/helpers';
import { InboxActions } from './InboxActions';
import { cn } from '@/shared/lib/utils';
import DeleteMessagesModal from '@/modules/DeleteMessagesModal';
import { BADGE_PALETTE, FILTER_OPTIONS } from '../lib/inbox.const';
import type { Feedback } from '@/shared/types/feedback.types';
import {
  useBulkEditMutation,
  useBulkRemoveMutation,
} from '@/shared/api/feedbackApi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const columnHelper = createColumnHelper<Feedback & { checked: boolean }>();

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
    size: 30,
    cell: (info) => <span>{formatDateToClockTime(info.getValue())}</span>,
  }),
];

export const InboxTable = ({ data }: { data: Feedback[] }) => {
  const [search, setSearch] = useDebouncedState('', 200);
  const [checked, setChecked] = useState(false);
  const [filter, setFilter] = useState<string>('');
  const [selected, setSelected] = useState<number[]>([]);
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const [bulkEdit] = useBulkEditMutation();
  const [bulkRemove] = useBulkRemoveMutation();

  let tableData = useMemo(() => {
    let copy = data.map((msg) => {
      return {
        ...msg,
        checked: selected.includes(msg.id) ? true : false,
      };
    });

    return copy;
  }, [data, selected]);

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
    },
    onGlobalFilterChange: setSearch,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleMarkAsRead = async () => {
    const data = table.getRowModel().rows.reduce((acc, row) => {
      if (row.original.checked) {
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

  const handleMarkAsStarred = async () => {
    const data = table.getRowModel().rows.reduce((acc, row) => {
      if (row.original.checked) {
        acc.push({ ...row.original, starred: true });
      }
      return acc;
    }, [] as Feedback[]);
    try {
      setLoading(true);
      await bulkEdit(data).unwrap();
      toast.success('Feedbacks starred!');
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
      setFilter('');
    }

    if (value && selected.length === 0) {
      setFilter(FILTER_OPTIONS[0].value);
    }
  };

  useEffect(() => {
    const selected = table.getRowModel().rows.reduce((acc, row) => {
      switch (filter) {
        case 'All':
          acc.push(row.original.id);
          break;
        case 'Read':
          if (row.original.feedbackStatus === 'REVIEWING') {
            acc.push(row.original.id);
          }
          break;
        case 'Unread':
          if (row.original.feedbackStatus === 'NEW') {
            acc.push(row.original.id);
          }
          break;
        case 'Starred':
          if (row.original.starred) {
            acc.push(row.original.id);
          }
          break;
        case 'Unstarred':
          if (!row.original.starred) {
            acc.push(row.original.id);
          }
          break;
        default:
          break;
      }
      return acc;
    }, [] as number[]);

    setSelected(selected);
    if (selected.length > 0) setChecked(true);
  }, [filter, table]);

  useEffect(() => {
    if (selected.length === 0) {
      setChecked(false);
      setFilter('');
    }
    if (selected.length > 0) setChecked(true);
    console.log(selected);
  }, [selected]);

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
        className='bg-primary'
        styles={{ td: { padding: '16px 0px' }, tr: { verticalAlign: 'sub' } }}
      >
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
                <div className='flex items-center gap-4'>
                  <Checkbox
                    size='xs'
                    checked={selected.length > 0 || checked}
                    onChange={handleChecked}
                    color='black'
                    styles={{ icon: { stroke: 'black' } }}
                  />
                  <Menu.Target>
                    <ChevronDown
                      onClick={() => setOpened(true)}
                      size={16}
                      className='cursor-pointer'
                    />
                  </Menu.Target>
                  {(selected.length > 0 ||
                    (checked && selected.length > 0)) && (
                    <div className='flex gap-12'>
                      <UnstyledButton
                        className='flex items-center gap-2 text-sm'
                        onClick={handleMarkAsRead}
                      >
                        <Mail size={16} />
                        Mark as read
                      </UnstyledButton>
                      <UnstyledButton
                        className='flex items-center gap-2 text-sm'
                        onClick={handleMarkAsStarred}
                      >
                        <StarIcon size={16} />
                        Add star
                      </UnstyledButton>
                      <DeleteMessagesModal
                        messages={selected}
                        setSelected={setSelected}
                      />
                    </div>
                  )}
                </div>
                <Menu.Dropdown
                  classNames={{ dropdown: 'flex flex-col text-sm' }}
                >
                  {FILTER_OPTIONS.map((fil) => (
                    <UnstyledButton
                      key={fil.id}
                      onClick={() => {
                        setFilter(fil.value);
                        setOpened(false);
                      }}
                      className={cn(
                        'px-4 py-2 hover:bg-brand-grey-200',
                        fil.value === filter && 'bg-brand-grey-300'
                      )}
                    >
                      {fil.title}
                    </UnstyledButton>
                  ))}
                </Menu.Dropdown>
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
                    disabled={checked && filter === 'ALL'}
                    checked={row.original.checked}
                    onChange={() => {
                      !row.original.checked &&
                        setSelected((prev) => [...prev, row.original.id]);
                      row.original.checked &&
                        setSelected((prev) =>
                          prev.filter((id) => id !== row.original.id)
                        );
                    }}
                    classNames={{ root: 'mx-4' }}
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

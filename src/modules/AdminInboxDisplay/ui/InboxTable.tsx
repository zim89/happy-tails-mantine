import { EmptyRow } from '@/components/EmptyRow';
import { EntriesCount } from '@/components/EntriesCount';
import { ResizableTable } from '@/components/ResizableTable';
import { ResizableTableHead } from '@/components/ResizableTableHead';
import { SearchEntry } from '@/components/SearchEntry';
import { MemoizedTableBody } from '@/components/TableBody';
import { TablePagination } from '@/components/TablePagination';
import {
  DEFAULT_TABLE_SIZE,
  MAX_TABLE_SIZE,
} from '@/shared/constants/sizes.const';
import type { Feedback } from '@/shared/types/feedback.types';
import {
  Badge,
  Checkbox,
  LoadingOverlay,
  Popover,
  UnstyledButton,
} from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useSearchParams } from 'next/navigation';
import { BADGE_PALETTE } from '../lib/inbox.const';
import dayjs from 'dayjs';
import { Star } from './Star';
import { InboxActions } from './InboxActions';
import { useMemo, useState, type ChangeEvent } from 'react';
import { handleDispatchError } from '@/shared/lib/helpers';
import { useBulkEditMutation } from '@/shared/api/feedbackApi';
import { toast } from 'react-toastify';
import { Mail } from 'lucide-react';
import DeleteMessagesModal from '@/modules/DeleteMessagesModal';
import { handleError } from '@/shared/helpers/error.helpers';

export const InboxTable = ({ data }: { data: Feedback[] }) => {
  const [checked, _] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [bulkEdit] = useBulkEditMutation();
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useDebouncedState('', 200);
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  const columnHelper = createColumnHelper<Feedback>();

  const columns = [
    columnHelper.display({
      id: 'checkbox',
      cell: (info) => (
        <Checkbox
          size='xs'
          disabled={checked && !selected.includes(info.row.original.id)}
          checked={selected.includes(info.row.original.id)}
          onChange={() => {
            !selected.includes(info.row.original.id) &&
              setSelected((prev) => [...prev, info.row.original.id]);
            selected.includes(info.row.original.id) &&
              setSelected((prev) =>
                prev.filter((id) => id !== info.row.original.id)
              );
          }}
          classNames={{ input: 'cursor-pointer' }}
          color='black'
          styles={{ icon: { stroke: 'black' } }}
        />
      ),
      size: 50,
      header: () => (
        <Popover
          opened={selected.length > 0 || (checked && selected.length > 0)}
          position='top-start'
          offset={8}
          withArrow
          shadow='md'
        >
          <Popover.Target>
            <Checkbox
              size='xs'
              checked={selected.length > 0 || checked}
              onChange={handleChecked}
              color='black'
              styles={{ icon: { stroke: 'black' } }}
              classNames={{ input: 'cursor-pointer' }}
            />
          </Popover.Target>
          <Popover.Dropdown>
            <div className='relative flex flex-col gap-2'>
              <LoadingOverlay
                visible={isLoading}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'black', size: 24 }}
              />
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
            </div>
          </Popover.Dropdown>
        </Popover>
      ),
    }),
    columnHelper.accessor('starred', {
      header: 'Starred',
      enableSorting: true,
      size: 100,
      cell: (info) => (
        <span className=''>
          <Star id={info.row.original.id} starred={info.getValue()} />
        </span>
      ),
    }),
    columnHelper.accessor('userName', {
      header: 'User name',
      enableSorting: true,
      size: 150,
      cell: (info) => (
        <p className='mx-4 overflow-hidden text-ellipsis whitespace-pre text-sm font-bold'>
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('content', {
      header: 'Content',
      enableSorting: false,
      size: 458,
      cell: (info) => (
        <p className='max-w-[458px] overflow-hidden text-ellipsis whitespace-pre font-bold'>
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('feedbackStatus', {
      header: 'Status',
      enableSorting: true,
      size: 120,
      cell: (info) => (
        <span className=''>
          <Badge color={BADGE_PALETTE[info.getValue()]}>
            {info.getValue()}
          </Badge>
        </span>
      ),
    }),
    columnHelper.accessor('sentAt', {
      header: 'Sent at',
      enableSorting: true,
      size: 150,
      cell: (info) => (
        <span className=''>
          {dayjs.unix(info.getValue()).format('DD MMM, YYYY (HH:mm)')}
        </span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      cell: (info) => <InboxActions message={info.row.original} />,
      size: 80,
      header: 'Action',
      enableSorting: false,
      enableResizing: false,
    }),
  ];

  let tableData = useMemo(() => {
    if (data.length === 0) return [];

    return [...data].sort((a, b) => b.id - a.id);
  }, [data]);

  const table = useReactTable({
    data: tableData,
    columns,
    defaultColumn: {
      size: DEFAULT_TABLE_SIZE / 5,
      maxSize: MAX_TABLE_SIZE / 4,
    },
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
        pageIndex: page && page !== 'null' ? Number(page) - 1 : 0,
        pageSize: Number(limit) || 10,
      },
    },
    onGlobalFilterChange: setSearch,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  async function handleMarkAsRead() {
    setIsLoading(true);
    const data = table.getRowModel().rows.reduce((acc, row) => {
      if (selected.includes(row.original.id)) {
        acc.push({ ...row.original, feedbackStatus: 'REVIEWING' });
      }
      return acc;
    }, [] as Feedback[]);

    try {
      toast.success('Feedbacks marked as read');
      await bulkEdit(data).unwrap();
      setSelected([]);
    } catch (err) {
      handleError(err, toast.error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleChecked(e: ChangeEvent<HTMLInputElement>) {
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
  }

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
        message='No new messages. Please check back later.'
      />
      <div style={{ width: table.getTotalSize() }}>
        <TablePagination visible={table.getPageCount() > 1} table={table} />
      </div>
    </>
  );
};

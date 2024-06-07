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
} from '@mantine/core';
import { useState, useMemo } from 'react';
import {
  AlertTriangle,
  Check,
  ChevronDown,
  Mail,
  Star as StarIcon,
} from 'lucide-react';

import { EntriesCount } from '@/components/EntriesCount';
import { SearchEntry } from '@/components/SearchEntry';
import { EmptyRow } from '@/components/EmptyRow';
import { TablePagination } from '@/components/TablePagination';
import { Message } from '../lib/mock';
import { Star } from './Star';
import { formatDateToClockTime } from '@/shared/lib/helpers';
import { Actions } from './Actions';
import { CustomBadge } from '@/components/Badge';
import { cn } from '@/shared/lib/utils';
import DeleteMessagesModal from '@/modules/DeleteMessagesModal';
import { useNotification } from '@/shared/hooks/useNotification';
import Notify from '@/components/Notify';

const filterOptions = [
  {
    id: 0,
    title: 'All',
    value: 'ALL',
  },
  {
    id: 1,
    title: 'None',
    value: 'NONE',
  },
  {
    id: 2,
    title: 'Read',
    value: 'READ',
  },
  {
    id: 3,
    title: 'Unread',
    value: 'UNREAD',
    columnFilter: 'status',
  },
  {
    id: 4,
    title: 'Starred',
    value: 'STARRED',
  },
  {
    id: 5,
    title: 'Unstarred',
    value: 'UNSTARRED',
  },
];

type Props = {
  data: Message[];
};

const columnHelper = createColumnHelper<Message & { checked: boolean }>();

const columns = [
  columnHelper.accessor('sender', {
    header: '',
    enableSorting: false,
    cell: (info) => (
      <p className='mx-4 max-w-[150px] overflow-hidden text-ellipsis whitespace-pre text-sm font-bold'>
        {info.getValue()}
      </p>
    ),
  }),
  columnHelper.accessor('title', {
    header: '',
    enableSorting: false,
    cell: (info) => (
      <p className='max-w-[458px] overflow-hidden text-ellipsis whitespace-pre font-bold'>
        {info.getValue()}
      </p>
    ),
    maxSize: 460,
  }),
  columnHelper.accessor('status', {
    header: '',
    enableSorting: false,
    cell: (info) => (
      <span className='mx-3'>
        {info.getValue() === 'unread' && (
          <CustomBadge
            name='NEW'
            palette={{ unread: '#4285F4' }}
            color={info.getValue()}
          />
        )}
      </span>
    ),
    // Instead of { width: auto }
    size: 100000,
  }),
  columnHelper.accessor('sentAt', {
    header: '',
    enableSorting: false,
    cell: (info) => <span>{formatDateToClockTime(info.getValue())}</span>,
    size: 30,
  }),
];

export const Table = ({ data }: Props) => {
  const [setNotification, { props, clear }] = useNotification({
    failed: {
      text: 'Messages deletion failed!',
      icon: <AlertTriangle size={24} fill='#DC362E' />,
      color: 'transparent',
    },
    success: {
      text: 'Messages successfully deleted!',
      icon: <Check size={24} />,
      color: '#389B48',
    },
  });

  const [search, setSearch] = useDebouncedState('', 200);
  const [checked, setChecked] = useState(false);
  const [filter, setFilter] = useState<string>('ALL');
  const [selected, setSelected] = useState<number[]>([]);
  const [starred, setStarred] = useState<number[]>([]);
  const [statuses, setStatuses] = useState<
    { id: number; value: (typeof data)[number]['status'] }[]
  >([...data.map((item) => ({ id: item.id, value: item.status }))]);
  const [opened, setOpened] = useState(false);

  let tableData = useMemo(() => {
    let copy = data.map((msg) => {
      return {
        ...msg,
        checked: selected.includes(msg.id) ? true : false,
        starred: starred.includes(msg.id) ? true : false,
        status: statuses.find(({ id }) => id === msg.id)?.value || msg.status,
      };
    });

    if (!checked) {
      // After ALL filter option is disabled, uncheck everything
      if (filter === 'ALL') {
        setSelected([]);
      }
      return copy;
    }

    let selectedMsgs: number[] = [];
    switch (filter) {
      case 'ALL':
        copy.forEach((msg) => {
          selectedMsgs.push(msg.id);
          msg.checked = true;
        });

        setSelected(selectedMsgs);
        break;
      case 'NONE':
        // Change the table
        copy.forEach((msg) => {
          msg.checked = false;
        });
        // If the checkbox is unchecked, still preserve all messages unselected
        setSelected([]);
        break;
      case 'STARRED':
        copy.forEach((msg) => {
          if (msg.starred) {
            selectedMsgs.push(msg.id);
            msg.checked = true;
          } else msg.checked = false;
        });

        setSelected(selectedMsgs);
        break;
      case 'UNSTARRED':
        copy.forEach((msg) => {
          if (!msg.starred) {
            msg.checked = true;
            selectedMsgs.push(msg.id);
          } else msg.checked = false;
        });

        setSelected(selectedMsgs);
        break;
      case 'READ':
        copy.forEach((msg) => {
          if (msg.status === 'read') {
            msg.checked = true;
            selectedMsgs.push(msg.id);
          } else msg.checked = false;
        });

        setSelected(selectedMsgs);
        break;
      case 'UNREAD':
        copy.forEach((msg) => {
          if (msg.status === 'unread') {
            msg.checked = true;
          } else msg.checked = false;
        });

        setSelected(selectedMsgs);
        break;
      default:
        break;
    }

    return copy;
  }, [filter, data, selected.length, checked, starred.length, statuses]);

  const table = useReactTable({
    data: tableData,
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

  const handleMarkAsRead = () => {
    setMarkedStatus(selected);
  };

  const handleAddStar = () => {
    const filtered = selected.filter((item) => {
      if (!starred.includes(item)) return true;
      else false;
    });

    setStarred(filtered);
  };

  const setMarkedStatus = (msgs: number[]) => {
    setStatuses((prev) =>
      prev.map((msg) =>
        msgs.includes(msg.id) && msg.value === 'unread'
          ? { id: msg.id, value: 'read' }
          : msg
      )
    );
  };

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

      <MantineTable
        bgcolor='white'
        withTableBorder
        borderColor='#EEE'
        styles={{ td: { padding: '16px 0px' }, tr: { verticalAlign: 'sub' } }}
      >
        {/* Table header */}
        <MantineTable.Thead classNames={{ thead: 'bg-[#EEE]' }}>
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
                    checked={checked}
                    onChange={(e) => {
                      setChecked(e.target.checked);
                    }}
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
                        onClick={handleAddStar}
                      >
                        <StarIcon size={16} />
                        Add star
                      </UnstyledButton>
                      <DeleteMessagesModal
                        setNotification={setNotification}
                        messages={selected}
                      />
                    </div>
                  )}
                </div>
                <Menu.Dropdown
                  classNames={{ dropdown: 'flex flex-col text-sm' }}
                >
                  {filterOptions.map((fil) => (
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

        <MantineTable.Tbody>
          {table.getRowModel().rows.length > 0 &&
            table.getRowModel().rows.map((row) => (
              <MantineTable.Tr key={row.id}>
                <MantineTable.Td>
                  <Checkbox
                    size='xs'
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
                <MantineTable.Td>
                  <Star
                    id={row.original.id}
                    starred={row.original.starred}
                    setStarred={setStarred}
                  />
                </MantineTable.Td>
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
                <MantineTable.Td>
                  <Actions
                    message={row.original}
                    setMarked={setMarkedStatus}
                    setNotification={setNotification}
                  />
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

      <Notify {...props} onClose={clear} />
    </>
  );
};

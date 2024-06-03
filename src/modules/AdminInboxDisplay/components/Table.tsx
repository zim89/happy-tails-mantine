"use client";

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
import { Table as MantineTable, Checkbox, Menu, UnstyledButton } from '@mantine/core';
import { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

import { EntriesCount } from '@/components/EntriesCount';
import { SearchEntry } from '@/components/SearchEntry';
import { TableBody } from '@/components/TableBody';
import { EmptyRow } from '@/components/EmptyRow';
import { TablePagination } from '@/components/TablePagination';
import { Message } from '../lib/mock';
import { Star } from "./Star";
import { formatDateToClockTime } from '@/shared/lib/helpers';
import { Actions } from './Actions';
import { CustomBadge } from '@/components/Badge';
import { cn } from "@/shared/lib/utils";

const filterOptions = [
  {
    id: 0,
    title: "All",
    value: "ALL",
  },
  {
    id: 1,
    title: "None",
    value: "NONE",
  },
  {
    id: 2,
    title: "Read",
    value: "READ"
  },
  {
    id: 3,
    title: "Unread",
    value: "UNREAD",
    columnFilter: "status"
  },
  {
    id: 4,
    title: "Starred",
    value: "STARRED",
  },
  {
    id: 5,
    title: "Unstarred",
    value: "UNSTARRED",
  }
];

type Props = {
  data: Message[];
};

const columnHelper = createColumnHelper<Message & { checked: boolean }>();

const columns = [
  columnHelper.accessor("starred", {
    header: "",
    enableSorting: false,
    cell: info => <Star starred={info.getValue()} />,
    size: 45,
  }),
  columnHelper.accessor('sender', {
    header: "",
    enableSorting: false,
    cell: info => <p className='font-bold text-sm max-w-[150px] whitespace-pre overflow-hidden text-ellipsis mx-4'>{info.getValue()}</p>
  }),
  columnHelper.accessor('title', {
    header: "",
    enableSorting: false,
    cell: info => <p className='font-bold max-w-[458px] overflow-hidden text-ellipsis whitespace-pre'>{info.getValue()}</p>,
    maxSize: 460,
  }),
  columnHelper.accessor('status', {
    header: "",
    enableSorting: false,
    cell: info => <span className="mx-3">
      {info.getValue() === "unread" && <CustomBadge name='NEW' palette={{ unread: "#4285F4" }} color={info.getValue()} />}
    </span>,
    // Instead of { width: auto }
    size: 100000
  }),
  columnHelper.accessor('sentAt', {
    header: "",
    enableSorting: false,
    cell: info => <span>{formatDateToClockTime(info.getValue())}</span>,
    size: 30
  }),
  columnHelper.display({
    id: 'actions',
    cell: (info) => <Actions message={info.row.original} />,
    header: '',
    enableSorting: false,
    size: 10
  }),
];

export const Table = ({ data }: Props) => {
  const [search, setSearch] = useDebouncedState('', 200);
  const [checked, setChecked] = useState(false);
  const [filter, setFilter] = useState<string>("ALL");
  const [selected, setSelected] = useState<number[]>([]);
  const [opened, setOpened] = useState(false);

  let tableData = useMemo(() => {
    let copy = data.map(msg => {
      return {
        ...msg,
        checked: selected.includes(msg.id) ? true : false,
      }
    });

    if (!checked) return copy;

    switch (filter) {
      case "ALL":
        copy.forEach(msg => {
          msg.checked = true;
        });
        break;
      case "NONE":
        copy.forEach(msg => {
          msg.checked = false;
        });
        break;
      case "STARRED":
        copy.forEach(msg => {
          if (msg.starred) msg.checked = true;
          else msg.checked = false;
        });
        break;
      case "UNSTARRED":
        copy.forEach(msg => {
          if (!msg.starred) msg.checked = true;
          else msg.checked = false;
        });
        break;
      case "READ":
        copy.forEach(msg => {
          if (msg.status === "read") msg.checked = true;
          else msg.checked = false;
        });
        break;
      case "UNREAD":
        copy.forEach(msg => {
          if (msg.status === "unread") msg.checked = true;
          else msg.checked = false;
        });
        break;
      default:
        break;
    }

    return copy;
  }, [filter, data, selected, checked]);

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

      <MantineTable bgcolor='white' withTableBorder borderColor='#EEE' styles={{ td: { padding: "16px 0px" }, tr: { verticalAlign: "sub" } }}>
        {/* Table header */}
        <MantineTable.Thead classNames={{ thead: 'bg-[#EEE]' }}>
          <MantineTable.Tr>
            <MantineTable.Th colSpan={7} classNames={{ th: "py-5 px-4" }}>
              <Menu opened={opened} onClose={() => setOpened(false)} position='bottom-start' classNames={{ dropdown: "-ml-[46px] px-0 py-2" }}>
                <div className="flex items-center gap-4">
                  <Checkbox size='xs' checked={checked} onChange={e => {
                    setChecked(e.target.checked);
                  }} color='black' styles={{ icon: { stroke: "black" } }} />
                  <Menu.Target>
                    <ChevronDown onClick={() => setOpened(true)} size={16} className='cursor-pointer' />
                  </Menu.Target>
                </div>
                <Menu.Dropdown classNames={{ dropdown: "flex flex-col text-sm" }}>
                  {filterOptions.map(fil =>
                    <UnstyledButton key={fil.id} onClick={() => {
                      setFilter(fil.value);
                      setOpened(false);
                    }} className={cn("py-2 px-4 hover:bg-brand-grey-200", fil.value === filter && "bg-brand-grey-300")}>{fil.title}</UnstyledButton>)}
                </Menu.Dropdown>
              </Menu>
            </MantineTable.Th>
          </MantineTable.Tr>
        </MantineTable.Thead>

        <MantineTable.Tbody>
          {table.getRowModel().rows.length > 0 &&
            table.getRowModel().rows.map((row) => (
              <MantineTable.Tr key={row.id}>
                <Checkbox size="xs" checked={row.original.checked} onChange={() => {
                  !row.original.checked && setSelected(prev => [...prev, row.original.id]);
                  row.original.checked && setSelected(prev => prev.filter(id => id !== row.original.id));
                }} classNames={{ root: "mx-4" }} color='black' styles={{ icon: { stroke: "black" } }} />
                {row.getVisibleCells().map((cell) => {
                  return <MantineTable.Td key={cell.id} styles={{ td: { width: `${cell.column.getSize()}px` } }} classNames={{ td: "p-4" }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </MantineTable.Td>
                })}
              </MantineTable.Tr>
            ))}
        </MantineTable.Tbody>
      </MantineTable>

      <EmptyRow visible={table.getRowModel().rows.length === 0} message="No new messages. Please check back later." />

      <TablePagination visible={table.getPageCount() > 1} table={table} />
    </>
  );
};
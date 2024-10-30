import { Table } from '@mantine/core';
import { flexRender, RowModel, Table as TTable } from '@tanstack/react-table';
import { memo } from 'react';

import { ResizableCell } from './ResizableCell';

type Props<T> = {
  rowModel: RowModel<T>;
  classNames?: Partial<Record<'tr', string>>;
  table: TTable<T>;
};
export const TableBody = <T,>({ rowModel, classNames }: Props<T>) => {
  return (
    <Table.Tbody classNames={{ tbody: 'tbody' }}>
      {rowModel.rows.length > 0 &&
        rowModel.rows.map((row) => (
          <Table.Tr key={row.id} classNames={classNames}>
            {row.getVisibleCells().map((cell, index) => {
              return (
                <ResizableCell cell={cell} key={index}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </ResizableCell>
              );
            })}
          </Table.Tr>
        ))}
    </Table.Tbody>
  );
};

export const MemoizedTableBody = memo(TableBody, (prev, next) => {
  return prev.table.options.data !== next.table.options.data;
}) as typeof TableBody;

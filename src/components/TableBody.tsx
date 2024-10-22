import { Product } from '@/shared/types/types';
import { Table } from '@mantine/core';
import { flexRender, RowModel, Table as TTable } from '@tanstack/react-table';
import { memo } from 'react';

type Props<T> = {
  rowModel: RowModel<T>;
  classNames?: Partial<Record<'tr', string>>;
  table?: TTable<Product>;
};
export const TableBody = <T,>({ rowModel, classNames }: Props<T>) => {
  return (
    <Table.Tbody classNames={{ tbody: 'tbody' }}>
      {rowModel.rows.length > 0 &&
        rowModel.rows.map((row) => (
          <Table.Tr key={row.id} classNames={classNames}>
            {row.getVisibleCells().map((cell) => {
              return (
                <Table.Td
                  key={cell.id}
                  styles={{
                    td: {
                      width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    },
                  }}
                  classNames={{ td: 'p-4 td' }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Td>
              );
            })}
          </Table.Tr>
        ))}
    </Table.Tbody>
  );
};

export const MemoizedTableBody = memo(
  TableBody,
  (prev, next) => prev.table!.options.data === next.table!.options.data
) as typeof TableBody;

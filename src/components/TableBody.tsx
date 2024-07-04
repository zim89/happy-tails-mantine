import { Table } from '@mantine/core';
import { flexRender, RowModel } from '@tanstack/react-table';

type Props<T> = {
  rowModel: RowModel<T>;
  classNames?: Partial<Record<'tr', string>>;
};
export const TableBody = <T,>({ rowModel, classNames }: Props<T>) => {
  return (
    <Table.Tbody>
      {rowModel.rows.length > 0 &&
        rowModel.rows.map((row) => (
          <Table.Tr key={row.id} classNames={classNames}>
            {row.getVisibleCells().map((cell) => {
              return (
                <Table.Td
                  key={cell.id}
                  styles={{ td: { width: `${cell.column.getSize()}px` } }}
                  classNames={{ td: 'p-4' }}
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

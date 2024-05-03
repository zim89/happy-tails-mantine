import { Table } from "@mantine/core";
import { flexRender, RowModel } from "@tanstack/react-table";

type Props<T> = {
    rowModel: RowModel<T>
}
export const TableBody = <T,>({ rowModel }: Props<T>) => {
    return (
        <Table.Tbody>
          {rowModel.rows.length > 0 &&
            rowModel.rows.map((row) => (
              <Table.Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Td key={cell.id} classNames={{ td: 'p-4' }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
        </Table.Tbody>
    );
}
import { Table } from '@mantine/core';
import { Cell } from '@tanstack/react-table';

type Props<T> = {
  children: React.ReactNode;
  cell: Cell<T, unknown>;
};

export const ResizableCell = <T,>({ children, cell }: Props<T>) => {
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
      {children}
    </Table.Td>
  );
};

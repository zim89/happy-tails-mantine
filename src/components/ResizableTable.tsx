import { Table, TableProps } from '@mantine/core';
import { Table as TTable } from '@tanstack/react-table';
import { useMemo } from 'react';

type Props<T> = {
  table: TTable<T>;
  children: React.ReactNode;
  tableProps?: TableProps;
};

export const ResizableTable = <T,>({
  table,
  children,
  tableProps,
}: Props<T>) => {
  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!;
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    return colSizes;
  }, [table.getState().columnSizingInfo, table.getState().columnSizing]);

  return (
    <Table
      {...tableProps}
      style={{
        ...columnSizeVars, //Define column sizes on the <table> element
        width: table.getTotalSize(),
      }}
    >
      {children}
    </Table>
  );
};

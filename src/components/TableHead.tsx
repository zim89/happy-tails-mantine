import { cn } from "@/shared/lib/utils";
import { Table } from "@mantine/core";
import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props<T> = {
    headerGroup: HeaderGroup<T>[]
}
export const TableHead = <T,>({ headerGroup }: Props<T>) => {
    return (
        <Table.Thead>
          {headerGroup.map((group) => (
            <Table.Tr key={group.id} classNames={{ tr: 'bg-[#EEE]' }}>
              {group.headers.map((header) => (
                <Table.Th
                  key={header.id}
                  classNames={{ th: 'p-4 text-[#787878] whitespace-nowrap uppercase' }}
                >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getCanSort() ? (
                      <button className="relative ml-2 -translate-y-1" onClick={header.column.getToggleSortingHandler()}>
                        <ChevronUp
                          size={12}
                          className={cn(
                            "absolute bottom-0",
                            header.column.getIsSorted() === 'desc' && 'hidden'
                          )}
                        />
                        <ChevronDown
                          size={12}
                          className={cn(
                            "absolute top-0",
                            header.column.getIsSorted() === 'asc' && 'hidden'
                          )}
                        />
                      </button>
                    ) : null}
                </Table.Th>
              ))}
            </Table.Tr>
          ))}
        </Table.Thead>
    );
}
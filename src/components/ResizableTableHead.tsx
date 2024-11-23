import { useEffect, useState } from 'react';
import { Table } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';
import { flexRender, HeaderGroup } from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { useSearchString } from '@/shared/helpers/searchParams.helpers';

type Props<T> = {
  headerGroup: HeaderGroup<T>[];
  tableWidth?: number;
};
export const ResizableTableHead = <T,>({ headerGroup }: Props<T>) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortParam = searchParams.get('sort');

  const [createUrlString] = useSearchString(searchParams);

  const [sort, setSort] = useState<[string, string] | null>(null);

  useEffect(() => {
    if (sortParam) {
      setSort(sortParam.split('_') as [string, string]);
    } else {
      setSort(null);
    }
  }, [sortParam]);

  return (
    <Table.Thead>
      {headerGroup.map((group) => (
        <Table.Tr key={group.id} classNames={{ tr: 'bg-brand-grey-300 tr' }}>
          {group.headers.map((header) => (
            <Table.Th
              key={header.id}
              classNames={{
                th: 'p-4 text-brand-grey-800 whitespace-nowrap uppercase th',
              }}
              styles={{
                th: {
                  width: `calc(var(--header-${header?.id}-size) * 1px)`,
                },
              }}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

              {header.column.getCanResize() && (
                <div
                  {...{
                    onDoubleClick: () => {
                      header.column.resetSize();
                    },
                    onMouseDown: (e) => {
                      header.getResizeHandler()(e);
                    },
                    onTouchStart: header.getResizeHandler(),
                    className: `resizer ${
                      header.column.getIsResizing() ? 'isResizing' : ''
                    }`,
                  }}
                />
              )}

              {header.column.getCanSort() ? (
                <button
                  className='relative ml-2 -translate-y-1'
                  onClick={(e) => {
                    if (e) {
                      const target = e.target as HTMLElement;

                      target.id &&
                        router.replace(
                          '?' +
                            createUrlString({
                              sort: `${header.column.id}_${target.id}`,
                              page: '1',
                            })
                        );

                      header.column.toggleSorting(target.id === 'desc');
                    }
                  }}
                >
                  <span
                    id='desc'
                    className={cn(
                      'absolute bottom-0',
                      sort &&
                        sort[0] === header.column.id &&
                        sort[1] === 'desc' &&
                        'hidden'
                    )}
                  >
                    <ChevronUp className='pointer-events-none' size={12} />
                  </span>
                  <span
                    id='asc'
                    className={cn(
                      'absolute top-0',
                      sort &&
                        sort[0] === header.column.id &&
                        sort[1] === 'asc' &&
                        'hidden'
                    )}
                  >
                    <ChevronDown className='pointer-events-none' size={12} />
                  </span>
                </button>
              ) : null}
            </Table.Th>
          ))}
        </Table.Tr>
      ))}
    </Table.Thead>
  );
};

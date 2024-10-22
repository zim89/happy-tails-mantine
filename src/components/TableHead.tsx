import { useMemo } from 'react';
import { Table } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';
import { flexRender, HeaderGroup } from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { useSearchString } from '@/shared/helpers/searchParams.helpers';

type Props<T> = {
  headerGroup: HeaderGroup<T>[];
};
export const TableHead = <T,>({ headerGroup }: Props<T>) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortParam = searchParams.get('sort');

  const [createUrlString] = useSearchString(searchParams);

  const sort = useMemo(() => {
    if (sortParam) {
      return sortParam.split('_');
    } else return null;
  }, [sortParam]);

  return (
    <Table.Thead>
      {headerGroup.map((group) => (
        <Table.Tr key={group.id} classNames={{ tr: 'bg-brand-grey-300' }}>
          {group.headers.map((header) => (
            <Table.Th
              key={header.id}
              classNames={{
                th: 'p-4 text-brand-grey-800 whitespace-nowrap uppercase',
              }}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              {header.column.getCanSort() ? (
                <button
                  className='relative ml-2 -translate-y-1'
                  onClick={(e) => {
                    const handler = header.column.getToggleSortingHandler();

                    if (handler && e) {
                      const target = e.target as HTMLElement;

                      target.id &&
                        router.replace(
                          '?' +
                            createUrlString({
                              sort: `${header.column.id}_${target.id}`,
                            })
                        );
                      handler(e);
                    }
                  }}
                >
                  <ChevronUp
                    size={12}
                    id='desc'
                    className={cn(
                      'absolute bottom-0',
                      sort &&
                        sort[0] === header.column.id &&
                        sort[1] === 'desc' &&
                        'hidden'
                    )}
                  />
                  <ChevronDown
                    size={12}
                    id='asc'
                    className={cn(
                      'absolute top-0',
                      sort &&
                        sort[0] === header.column.id &&
                        sort[1] === 'asc' &&
                        'hidden'
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
};

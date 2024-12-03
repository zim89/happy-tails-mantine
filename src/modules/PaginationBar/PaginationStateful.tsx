'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Group, Pagination } from '@mantine/core';

import styles from './PaginationBar.module.css';
import PaginationNextBtn from '@/components/PaginationNextBtn/PaginationNextBtn';
import PaginationPrevBtn from '@/components/PaginationPrevBtn/PaginationPrevBtn';
import { useSearchString } from '@/shared/helpers/searchParams.helpers';

type PaginationStatefulProps<T> = {
  initial: T[];
  children: (pages: T[], panel: JSX.Element) => React.ReactNode;
  maxItems: number;
};
export default function PaginationStateful<T>({
  initial,
  children,
  maxItems = 10,
}: PaginationStatefulProps<T>) {
  const [paginated, setPaginated] = useState(initial.slice(0, maxItems));

  const searchParams = useSearchParams();
  const [createQueryString] = useSearchString(searchParams);
  const { replace } = useRouter();
  const page = searchParams.get('page') || '1';

  useEffect(() => {
    setPaginated(initial.slice(0, maxItems));
  }, [initial.length]);

  const paginate = (page: number) => {
    let path =
      '?' +
      createQueryString({
        page: `${page || 1}`,
      });

    replace(path);

    if (page === 1) {
      setPaginated(initial.slice(0, maxItems));
    } else {
      const startingIndex =
        initial.length >= maxItems * page ? maxItems * page : maxItems;

      setPaginated(
        initial.slice(
          startingIndex,
          Math.min(startingIndex + maxItems, initial.length)
        )
      );
    }
  };

  const panel = (
    <Pagination.Root
      onChange={paginate}
      value={Number(page)}
      total={Math.ceil(initial.length / maxItems)}
      classNames={{
        control: 'pagination-control',
        dots: 'pagination-dots',
        root: 'mt-6 md:mt-12 lg:mt-[72px]',
      }}
    >
      {Math.ceil(initial.length / maxItems) > 1 && (
        <Group gap={0} justify='end'>
          <div className={styles.paginationOptions}>
            <Pagination.Previous icon={PaginationPrevBtn} />
            <Pagination.Items />
            <Pagination.Next icon={PaginationNextBtn} />
          </div>
        </Group>
      )}
    </Pagination.Root>
  );

  return <>{children(paginated, panel)}</>;
}

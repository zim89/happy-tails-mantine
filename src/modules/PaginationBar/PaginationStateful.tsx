import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import styles from './PaginationBar.module.css';
import { Group, Pagination } from '@mantine/core';
import PaginationNextBtn from '@/components/PaginationNextBtn';
import PaginationPrevBtn from '@/components/PaginationPrevBtn';

type PaginationStatefulProps<T> = {
  initial: T[];
  children: (pages: T[], panel: JSX.Element) => React.ReactNode;
  maxPages: number;
};
export default function PaginationStateful<T>({
  initial,
  children,
  maxPages = 10,
}: PaginationStatefulProps<T>) {
  const [paginated, setPaginated] = useState(initial.slice(0, maxPages));

  const path = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const paginate = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    replace(`${path}?${params.toString()}`);

    if (page === 1) {
      setPaginated(initial.slice(0, maxPages));
    } else {
      const startingIndex = maxPages * page - 1;
      setPaginated(initial.slice(startingIndex, startingIndex + maxPages));
    }
  };

  const panel = (
    <Pagination.Root
      onChange={paginate}
      total={Math.floor(initial.length / maxPages)}
      classNames={{
        control: 'pagination-control',
        dots: 'pagination-dots',
        root: 'mt-6 md:mt-12 lg:mt-[72px]',
      }}
    >
      <Group gap={0} justify='end'>
        <div className={styles.paginationOptions}>
          <Pagination.Previous icon={PaginationPrevBtn} />
          <Pagination.Items />
          <Pagination.Next icon={PaginationNextBtn} />
        </div>
      </Group>
    </Pagination.Root>
  );

  return (
    <>
      {children(paginated, panel)}

      {/* <Pagination.Root
        onChange={paginate}
        total={Math.floor(initial.length / maxPages)}
        className='mt-12'
        classNames={{
          control: 'pagination-control',
          dots: 'pagination-dots',
          root: 'mt-6 md:mt-12 lg:mt-[72px]',
        }}
      >
        <Group gap={0} justify='end'>
          <div className={styles.paginationOptions}>
            <Pagination.Previous icon={PaginationPrevBtn} />
            <Pagination.Items />
            <Pagination.Next icon={PaginationNextBtn} />
          </div>
        </Group>
      </Pagination.Root> */}
    </>
  );
}

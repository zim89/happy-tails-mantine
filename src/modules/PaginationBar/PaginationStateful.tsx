import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import styles from './PaginationBar.module.css';
import { Group, Pagination } from '@mantine/core';
import PaginationNextBtn from '@/components/PaginationNextBtn/PaginationNextBtn';
import PaginationPrevBtn from '@/components/PaginationPrevBtn/PaginationPrevBtn';

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

  const path = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const paginate = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    replace(`${path}?${params.toString()}`);

    if (page === 1) {
      setPaginated(initial.slice(0, maxItems));
    } else {
      const startingIndex = maxItems * page - 1;
      setPaginated(initial.slice(startingIndex, startingIndex + maxItems));
    }
  };

  const panel = (
    <Pagination.Root
      onChange={paginate}
      total={Math.floor(initial.length / maxItems)}
      classNames={{
        control: 'pagination-control',
        dots: 'pagination-dots',
        root: 'mt-6 md:mt-12 lg:mt-[72px]',
      }}
    >
      {/* If there are more pages than only one, then show pagination controls */}
      {Math.floor(initial.length / maxItems) > 0 && (
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

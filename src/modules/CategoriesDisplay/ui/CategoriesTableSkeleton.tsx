import { Skeleton } from '@mantine/core';

import styles from '../CategoriesDisplay.module.css';

export const CategoriesTableSkeleton = () => {
  return (
    <div className={styles.table}>
      <div className='flex items-center justify-between border border-b-0 bg-white px-4 py-6'>
        <h2 className='mr-6 text-base/[1.5rem] font-bold'>Products Catalog</h2>
      </div>
      <div className='flex h-[404px] w-full flex-col gap-2'>
        <Skeleton height={80} radius={0} />
        <Skeleton classNames={{ root: 'basis-[10%]' }} />
        <Skeleton classNames={{ root: 'basis-[15%]' }} />
        <Skeleton classNames={{ root: 'basis-[10%]' }} />
        <Skeleton classNames={{ root: 'basis-[15%]' }} />
        <Skeleton classNames={{ root: 'basis-[10%]' }} />
        <Skeleton classNames={{ root: 'basis-[15%]' }} />
      </div>
    </div>
  );
};

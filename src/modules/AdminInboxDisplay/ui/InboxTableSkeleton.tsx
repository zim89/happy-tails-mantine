import { Skeleton } from '@mantine/core';
import classes from '../classes.module.css';

export const InboxTableSkeleton = () => {
  return (
    <>
      <div className={classes.header}>
        <hgroup className={classes.pageHeading}>
          <h2>Inbox</h2>
          <p>Manage user messages and requests</p>
        </hgroup>
      </div>
      <div className='mt-10 flex items-center justify-between border border-b-0 bg-white p-4'>
        <h2 className='mr-6 text-xl/[1.5rem] font-bold'>Messages</h2>
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
    </>
  );
};

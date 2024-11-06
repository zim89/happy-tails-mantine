import { Skeleton } from '@mantine/core';

export const ChatRoomSkeleton = () => {
  return (
    <>
      <div className='flex h-screen flex-col gap-10'>
        <Skeleton classNames={{ root: 'basis-[40%]' }} />
        <Skeleton classNames={{ root: 'basis-[60%] lg:max-w-[50%]' }} />
      </div>
    </>
  );
};

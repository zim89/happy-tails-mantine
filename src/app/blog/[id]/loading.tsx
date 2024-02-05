import { Loader } from '@mantine/core';

export default function Loading() {
  return (
    <div className='flex h-full items-center justify-center'>
      <Loader color='orange' size={32} />
    </div>
  );
}

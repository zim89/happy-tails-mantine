import { Loader } from '@mantine/core';

export default function Loading() {
  return (
    <div className='flex justify-center pt-40'>
      <Loader color='orange' size={32} />
    </div>
  );
}

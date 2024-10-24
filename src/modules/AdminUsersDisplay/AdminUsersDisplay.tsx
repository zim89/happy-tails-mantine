'use client';

import { useFindManyQuery } from '@/shared/api/usersApi';
import { Table } from './components/Table';

import Loader from '@/components/Loader/Loader';

export default function AdminUsersDisplay() {
  const { data, error, isLoading } = useFindManyQuery({
    page: 0,
    size: 10000000,
  });

  if (isLoading || !data)
    return (
      <div className='flex justify-center pt-16'>
        <Loader size={100} />
      </div>
    );

  if (error)
    return (
      <p>
        {
          "Whoops, it shouldn't have happened. Our specialists are already handling the issue."
        }
      </p>
    );

  return (
    <>
      <Table data={data.content} />
    </>
  );
}

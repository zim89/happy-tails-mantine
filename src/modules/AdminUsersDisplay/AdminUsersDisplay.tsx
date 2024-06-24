'use client';

import { useContext, useEffect } from 'react';

import { useFindManyQuery } from '@/shared/api/usersApi';
import { Table } from './components/Table';

import Loader from '@/components/Loader';
import { AdminPanelContext } from '@/shared/context/panel.context';

export default function AdminUsersDisplay() {
  const { data, error, isLoading } = useFindManyQuery({});
  const { update } = useContext(AdminPanelContext);

  useEffect(() => {
    update((prev) => ({ ...prev, openedLink: 'Users' }));
  }, []);

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

'use client';

import { useFindManyQuery } from '@/shared/api/usersApi';
import { Table } from './components/Table';

import { AdminUsersSkeleton } from './components/Skeleton';

export default function AdminUsersDisplay() {
  const { data, error, isLoading } = useFindManyQuery({});

  if (isLoading || !data) return <AdminUsersSkeleton />;

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

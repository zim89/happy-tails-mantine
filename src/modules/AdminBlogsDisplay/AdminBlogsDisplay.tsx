'use client';

import { useFindManyQuery } from '@/shared/api/postApi';

import { Table } from './components/Table';
import { Header } from './components/Header';
import { TableSkeleton } from './components/TableSkeleton';

export default function AdminBlogsDisplay() {
  const { data, isLoading, error } = useFindManyQuery({});

  if (isLoading || !data) return <TableSkeleton />;

  if (error)
    return (
      <p>
        {
          "Whoops, it shouldn't have happened, our experts are already fixing this!"
        }
      </p>
    );

  return (
    <>
      <Header />
      <Table data={data.content} />
    </>
  );
}

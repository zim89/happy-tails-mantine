'use client';

import { useContext, useEffect } from 'react';

import { useFindManyQuery } from '@/shared/api/postApi';
import { AdminPanelContext } from '@/shared/lib/context';
import { Table } from './components/Table';
import { Header } from './components/Header';

export default function AdminBlogsDisplay() {
  const { update } = useContext(AdminPanelContext);
  const { data, isLoading, error } = useFindManyQuery({});

  useEffect(() => {
    update((prev) => ({ ...prev, openedLink: 'Blogs' }));
  }, []);

  if (!data || isLoading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        Whoops, it shouldn't have happened, our experts are already fixing this!
      </p>
    );

  return (
    <>
      <Header />
      <Table data={data.content} />
    </>
  );
}
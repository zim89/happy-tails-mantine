'use client';

import { useContext, useEffect } from 'react';

import CategoriesTable from './ui/CategoriesTable';
import { useCategoriesQuery } from '@/shared/api/categoryApi';
import { AdminPanelContext } from '@/shared/context/panel.context';

export default function CategoriesDisplay() {
  const { data, isError } = useCategoriesQuery({});
  const { update } = useContext(AdminPanelContext);

  useEffect(() => {
    update((prev) => ({ ...prev, openedLink: 'Categories' }));
  }, []);

  if (isError) return <p>Oops, something went wrong</p>;

  return (
    <>
      <CategoriesTable categories={data?.content || []} />
    </>
  );
}

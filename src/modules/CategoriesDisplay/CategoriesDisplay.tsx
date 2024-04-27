"use client";

import CategoriesTable from './ui/CategoriesTable';
import { useCategoriesQuery } from '@/shared/api/categoryApi';

export default function CategoriesDisplay() {
  const { data, isError, isLoading, isUninitialized } = useCategoriesQuery({ limit: 100000 });

  if (isLoading || isUninitialized) return <p>Loading, please wait</p>;

  if (isError) return <p>Oops, something went wrong</p>;
  return (
    <>
      <CategoriesTable categories={data.content} />
    </>
  );
};

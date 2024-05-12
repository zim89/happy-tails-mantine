"use client";

import { useContext, useEffect } from "react";

import CategoriesTable from './ui/CategoriesTable';
import { useCategoriesQuery } from '@/shared/api/categoryApi';
import { AdminPanelContext } from "@/shared/lib/context";

export default function CategoriesDisplay() {
  const { data, isError, isLoading, isUninitialized } = useCategoriesQuery({ limit: 100000 });
  const { update } = useContext(AdminPanelContext);

  useEffect(() => {
    update(prev => ({ ...prev, openedLink: "Categories" }));
  }, []);

  if (isLoading || isUninitialized) return <p>Loading, please wait</p>;

  if (isError) return <p>Oops, something went wrong</p>;
  return (
    <>
      <CategoriesTable categories={data.content} />
    </>
  );
};

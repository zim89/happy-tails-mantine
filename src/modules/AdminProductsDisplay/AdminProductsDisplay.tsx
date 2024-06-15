'use client';

import { useContext, useEffect } from 'react';

import { useFindManyQuery } from '@/shared/api/productApi';
import AddProductModal from '@/modules/AddProductModal';
import ProductsTable from '@/modules/ProductsTable';
import { AdminPanelContext } from '@/shared/lib/context';

export default function AdminProductsDisplay() {
  const { data, isError, isLoading } = useFindManyQuery({
    limit: 1000000,
    page: 0,
  });

  const { update } = useContext(AdminPanelContext);

  useEffect(() => {
    update((prev) => ({ ...prev, openedLink: 'Products' }));
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Oops, something went wrong</p>;
  if (!data) return <ProductsTable data={[]} />;

  return (
    <>
      <AddProductModal />
      <ProductsTable data={data.content} />
    </>
  );
}

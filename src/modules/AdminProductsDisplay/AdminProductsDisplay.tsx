'use client';

import { useFindManyQuery } from '@/shared/api/productApi';
import ProductsTable from '@/modules/ProductsTable';

import { ProductsDisplaySkeleton } from './ui/ProductsDisplaySkeleton';

export default function AdminProductsDisplay() {
  const { data, isError, isLoading } = useFindManyQuery({
    limit: 100000000,
    page: 0,
  });

  if (isError) return <p>Oops, something went wrong</p>;
  if (!data) return <ProductsTable data={[]} />;

  if (isLoading) return <ProductsDisplaySkeleton />;

  return (
    <>
      <ProductsTable data={data.content.slice(0)} />
    </>
  );
}

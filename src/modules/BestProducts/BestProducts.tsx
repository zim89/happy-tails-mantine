'use client';

import { useFindBestSellersQuery } from '@/shared/api/productApi';
import ProductsTable from './components/Table';
import { SkeletonLoader } from './components/SkeletonLoader';
import { SkeletonError } from './components/SkeletonError';

export default function BestProducts() {
  const { data: products, error, isLoading } = useFindBestSellersQuery();

  if (error) return <SkeletonError />;
  if (!products || isLoading) return <SkeletonLoader />;

  return (
    <>
      <ProductsTable data={products.content} />
    </>
  );
}

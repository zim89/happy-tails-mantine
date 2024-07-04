'use client';

import { useFindBestSellersQuery } from '@/shared/api/productApi';
import ProductsTable from './components/Table';
import Loader from '@/components/Loader';
import { SkeletonLoader } from './components/SkeletonLoader';

export default function BestProducts() {
  const { data: products, error, isLoading } = useFindBestSellersQuery();

  if (error)
    return (
      <p>
        {
          "Whoops, it shouldn't have happened, our experts are already fixing this"
        }
      </p>
    );
  if (!products || isLoading) return <SkeletonLoader />;

  return (
    <>
      <ProductsTable data={products.content} />
    </>
  );
}

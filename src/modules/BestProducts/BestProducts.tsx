'use client';

import { useFindBestSellersQuery } from '@/shared/api/productApi';
import ProductsTable from './components/Table';
import Loader from '@/components/Loader';

export default function BestProducts() {
  const { data: products, error, isLoading } = useFindBestSellersQuery();

  if (!products || isLoading) return <Loader size={64} />;
  if (error)
    return (
      <p>
        {
          "Whoops, it shouldn't have happened, our experts are already fixing this"
        }
      </p>
    );

  return (
    <>
      <ProductsTable data={products.content} />
    </>
  );
}

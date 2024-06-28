'use client';

import { useFindManyQuery } from '@/shared/api/productApi';
import ProductsTable from './components/Table';
import Loader from '@/components/Loader';

export const BestProducts = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useFindManyQuery({
    limit: 5,
    page: 0,
  });

  if (isLoading) return <Loader size={64} />;
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
      <ProductsTable data={products?.content || []} />
    </>
  );
};

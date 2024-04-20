"use client";
import { useFindManyQuery } from '@/shared/api/productApi';
import AddProductModal from '../AddProductModal/AddProductModal';
import { ProductsTable } from '../ProductsTable/ProductsTable';

export default function AdminProductsDisplay() {
  const { data, isError, isLoading } = useFindManyQuery({
    limit: Infinity,
    page: 0,
  });

  if (!data || isLoading) return <p>Loading...</p>;
  if (isError) return <p>Oops, something went wrong</p>;

  return (
    <>
      <AddProductModal />
      <ProductsTable data={data.content}/>
    </>
  );
}

"use client";
import { useFindManyQuery } from '@/shared/api/productApi';
import AddProductModal from '@/modules/AddProductModal';
import ProductsTable from '@/modules/ProductsTable';

export default function AdminProductsDisplay() {
  const { data, isError, isLoading } = useFindManyQuery({
    limit: Infinity,
    page: 0,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Oops, something went wrong</p>;
  if (!data) return <ProductsTable data={[]}/>

  return (
    <>
      <AddProductModal />
      <ProductsTable data={data.content} />
    </>
  );
}

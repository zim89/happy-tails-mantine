"use client";
import { useFindManyQuery } from '@/shared/api/productApi';
import AddProductModal from '../AddProductModal/AddProductModal';
import { ProductsTable } from '../ProductsTable/ProductsTable';

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
      <ProductsTable data={data.content}/>
    </>
  );
}

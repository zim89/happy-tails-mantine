"use client";
import Breadcrumbs from '@/components/Breadcrumbs';

import { useFindManyQuery } from "@/shared/api/productApi";

import { useSearchParams } from 'next/navigation';
import { ProductsTable } from '@/modules/ProductsTable/ProductsTable';
import AddProductModal from '@/modules/AddProductModal/AddProductModal';

export default function Page() {
  const query = useSearchParams();
  const {data, isError, isLoading, error } = useFindManyQuery({ page: Number(query.get("page")), limit: Infinity });

  if (!data || isLoading) return <p>Loading...</p>

  return (
    <div>
      <Breadcrumbs
        crumbs={[{ href: '/admin/', text: 'Dashboard' }, { text: 'Products' }]}
      />

      <AddProductModal />

      <ProductsTable data={data.content}/>
    </div>
  );
}
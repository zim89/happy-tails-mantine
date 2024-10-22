'use client';

import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useFindManyQuery } from '@/shared/api/productApi';
import ProductsTable from '@/modules/ProductsTable';

import PageHeader from '@/components/PageHeader';
import { ProductsDisplaySkeleton } from './ui/ProductsDisplaySkeleton';

export default function AdminProductsDisplay() {
  const searchParams = useSearchParams();

  const { data, isError, isFetching } = useFindManyQuery({
    limit: 100000000,
    page: 0,
  });

  if (isError) return <p>Oops, something went wrong</p>;
  if (!data) return <ProductsTable data={[]} />;

  if (isFetching) return <ProductsDisplaySkeleton />;

  return (
    <>
      <PageHeader
        rightSection={
          <Link
            className='flex items-center gap-2 rounded bg-secondary px-4 py-[10px] font-black text-primary'
            href='/admin/products/new'
          >
            <PlusCircle width={20} />
            Add product
          </Link>
        }
      >
        {(Group) => (
          <>
            <Group title='Products' additional='Manage your product catalog' />
          </>
        )}
      </PageHeader>
      <ProductsTable data={data.content.slice(0)} />
    </>
  );
}

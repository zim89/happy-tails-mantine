'use client';

import { useContext, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

import { useFindManyQuery } from '@/shared/api/productApi';
import ProductsTable from '@/modules/ProductsTable';
import { AdminPanelContext } from '@/shared/lib/context';
import PageHeader from '@/components/PageHeader';

export default function AdminProductsDisplay() {
  const { data, isError, isLoading } = useFindManyQuery({
    limit: 1000000,
    page: 0,
  });

  const { update } = useContext(AdminPanelContext);

  useEffect(() => {
    update((prev) => ({ ...prev, openedLink: 'Products' }));
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Oops, something went wrong</p>;
  if (!data) return <ProductsTable data={[]} />;

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
      <ProductsTable data={data.content} />
    </>
  );
}

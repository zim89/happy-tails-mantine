'use client';

import { notFound, useParams } from 'next/navigation';

import { Header } from './components/Header';
import { ProductTable } from './components/ProductTable';
import { ShippingDetails } from './components/ShippingDetails';
import { ClientDetails } from './components/ClientDetails';
import { CommentSection } from './components/CommentSection';
import { useFindOneQuery } from '@/shared/api/ordersApi';
import { OrderDetailsSkeleton } from './components/Skeleton';

export default function OrdersDetails() {
  const { id } = useParams();

  const { data, error, isLoading } = useFindOneQuery({
    orderNumber: `${id}`,
  });

  if (error) return <p>Whoops, something went wrong..</p>;
  if (isLoading) return <OrderDetailsSkeleton />;

  if (!data) notFound();

  return (
    <>
      {data && (
        <div className='mb-8'>
          <Header order={data} />
          <ProductTable order={data} />
          <section className='mt-8 grid grid-cols-3 gap-6'>
            <ShippingDetails order={data} />
            <ClientDetails userEmail={data.email} />
            <CommentSection order={data} />
          </section>
        </div>
      )}
    </>
  );
}

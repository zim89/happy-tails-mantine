'use client';

import { notFound, useParams } from 'next/navigation';

import { Header } from './components/Header';
import { ProductTable } from './components/ProductTable';
import { ShippingDetails } from './components/ShippingDetails';
import { ClientDetails } from './components/ClientDetails';
import { CommentSection } from './components/CommentSection';
import {
  useFindOneQuery,
  useFindOneByEmailAndCodeQuery,
} from '@/shared/api/ordersApi';
import Loader from '@/components/Loader';

export default function OrdersDetails() {
  const { id } = useParams();
  console.log('ID: ', decodeURIComponent(`${id}`));

  const [number, email] = decodeURIComponent(`${id}`).split('^');

  console.log('Email-Code', number, email);

  const { data, error, isLoading } = useFindOneByEmailAndCodeQuery({
    orderNumber: number,
    email,
  });

  if (error) return <p>Whoops, something went wrong..</p>;
  if (isLoading) return <Loader />;

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

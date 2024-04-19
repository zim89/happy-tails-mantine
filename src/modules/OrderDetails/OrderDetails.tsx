"use client";
import { useParams } from 'next/navigation';

import mock from '@/modules/OrderTable/mock.json';
import { Header } from './components/Header';
import { ProductTable } from './components/ProductTable';
import { ShippingDetails } from './components/ShippingDetails';
import { ClientDetails } from './components/ClientDetails';
import { CommentSection } from './components/CommentSection';

export default function OrdersDetails() {
  const { id } = useParams();
  const order = mock.content.find((order) => order.number.toLowerCase() === id);

  if (!order) return null;

  return (  
    <div className='mb-8'>
      <Header order={order} />
      <ProductTable order={order} />
      <section className='mt-8 grid grid-cols-3 gap-6'>
        <ShippingDetails order={order} />
        <ClientDetails />
        <CommentSection />
      </section>
    </div>
  );
}

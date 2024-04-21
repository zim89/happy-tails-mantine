"use client";
import { useParams } from 'next/navigation';

import { useSelectOrders } from "@/shared/hooks/useSelectOrders";
import { Header } from './components/Header';
import { ProductTable } from './components/ProductTable';
import { ShippingDetails } from './components/ShippingDetails';
import { ClientDetails } from './components/ClientDetails';
import { CommentSection } from './components/CommentSection';
import { useAuth } from '@/shared/hooks/useAuth';

export default function OrdersDetails() {
  const { id } = useParams();
  const { access_token } = useAuth();
  const order = useSelectOrders((state) => state.find(ord => ord.number.toLowerCase() === id), access_token);

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

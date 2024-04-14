'use client';
import {
  Button,
} from '@mantine/core';

import { useModel } from '@/shared/hooks/useNewOrderFormModel';
import ProductSelection from './components/ProductSelection';
import DeliveryForm from './components/DeliveryForm';
import ShippingAndPayment from './components/ShippingAndPayment';
import OrderTotal from './components/OrderTotal';
import AddComments from './components/AddComments';

export default function NewOrder() {
  const form = useModel();

  const handleSubmit = (values: typeof form.values) => {
    
  }

  return (
    <form className='space-y-12' onSubmit={form.onSubmit(console.log)}>
      <ProductSelection form={form} />
      <DeliveryForm form={form} />
      <ShippingAndPayment form={form} />
      <OrderTotal form={form} />
      <AddComments form={form} />

      <div>
        <Button size='md' variant='default' onClick={form.reset}>
          Cancel
        </Button>
        <Button size='md' className='ml-6 bg-black' type='submit'>
          Save
        </Button>
      </div>
    </form>
  );
}

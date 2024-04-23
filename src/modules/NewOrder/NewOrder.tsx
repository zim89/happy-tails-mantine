'use client';
import { Button } from '@mantine/core';
import { useState } from 'react';
import { AlertTriangle, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useModel } from '@/shared/hooks/useNewOrderFormModel';
import ProductSelection from './components/ProductSelection';
import DeliveryForm from './components/DeliveryForm';
import ShippingAndPayment from './components/ShippingAndPayment';
import OrderTotal from './components/OrderTotal';
import AddComments from './components/AddComments';
import { useCreateOrderMutation } from '@/shared/api/ordersApi';
import { useAuth } from '@/shared/hooks/useAuth';
import Notify, { NotifyProps } from '@/components/Notify';
import { useNotification } from '@/shared/hooks/useNotification';

export default function NewOrder() {
  const [dispatch] = useCreateOrderMutation();
  const form = useModel();
  const { access_token, currentUser } = useAuth();
  const [setNotification, { props, clear }] = useNotification({
    failed: {
      icon: <AlertTriangle size={24} fill='#DC362E' />,
      text: 'Order creation failed!',
    },
    success: {
      color: '#389B48',
      icon: <Check size={20} />,
      text: 'Order Creation Succeeded!',
    },
  });

  const router = useRouter();

  const handleSubmit = async (values: typeof form.values) => {
    try {
      if (!currentUser || !access_token)
        throw new Error('Unauthorized request!');
      const { sameAsDelivery, ...billing } = values.billingAddress;

      await dispatch({
        items: values.items,
        token: access_token,
        count: 1,
        billingAddress: sameAsDelivery
          ? JSON.stringify(values.address)
          : JSON.stringify(billing),
        email: currentUser.email,
        paymentMethod: values.paymentMethod,
        shippingAddress: JSON.stringify(values.address),
        shippingMethod: values.shippingMethod,
      });

      setNotification('Success');
      form.reset();
    } catch (err) {
      setNotification('Failed');
      console.log(err);
    }
  };

  const handleCancel = () => {
    form.reset();
    router.replace('/admin/orders');
  };

  return (
    <>
      <form className='space-y-12' onSubmit={form.onSubmit(handleSubmit)}>
        <ProductSelection form={form} />
        <DeliveryForm form={form} />
        <ShippingAndPayment form={form} />
        <OrderTotal form={form} />
        <AddComments form={form} />

        <div>
          <Button size='md' variant='default' onClick={handleCancel}>
            Cancel
          </Button>
          <Button size='md' className='ml-6 bg-black' type='submit'>
            Save
          </Button>
        </div>
      </form>

      <Notify {...props} onClose={clear} />
    </>
  );
}

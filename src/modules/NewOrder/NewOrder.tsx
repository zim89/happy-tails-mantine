'use client';
import { Button } from '@mantine/core';
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
import Notify from '@/components/Notify';
import { useNotification } from '@/shared/hooks/useNotification';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';
import { ErrorResponse } from '@/shared/lib/constants';

export default function NewOrder() {
  const [dispatch] = useCreateOrderMutation();
  const form = useModel();
  const { currentUser } = useAuth();
  const [setNotification, { props, clear }] = useNotification({
    failed: {
      color: "transparent",
      icon: <AlertTriangle size={24} fill='#DC362E' />,
      text: 'Order creation failed!',
    },
    success: {
      color: '#389B48',
      icon: <Check size={24} />,
      text: 'Order creation succeeded!',
    },
  });

  const router = useRouter();

  const handleSubmit = async (values: typeof form.values) => {
    try {
      if (!currentUser)
        throw new ErrorResponse({ status: 401, message: "You're not allowed to do this.", error: "Unauthorized", timestamp: Date.now(), path: "/admin/orders/new" });
      const { sameAsDelivery, ...billing } = values.billingAddress;

      await dispatch({
        items: values.items,
        count: 1,
        billingAddress: sameAsDelivery
          ? values.address
          : billing,
        email: values.email,
        paymentMethod: values.paymentMethod,
        shippingAddress: values.address,
        shippingMethod: values.shippingMethod,
      }).unwrap();

      setNotification('Success');
    } catch (err) {
      if (isAxiosQueryError(err)) {
        console.error(err);
        setNotification('Failed', isErrorDataString(err.data) ? err.data : err.data.message);
      }
    }
  };

  const handleTurningBack = () => {
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
          <Button size='md' variant='default' onClick={handleTurningBack}>
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

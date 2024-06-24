'use client';

import { UnstyledButton } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

import { useModel } from '@/shared/hooks/useNewOrderFormModel';
import ProductSelection from './components/ProductSelection';
import DeliveryForm from './components/DeliveryForm';
import ShippingAndPayment from './components/ShippingAndPayment';
import OrderTotal from './components/OrderTotal';
import AddComments from './components/AddComments';
import { useCreateOrderMutation } from '@/shared/api/ordersApi';
import { useAuth } from '@/shared/hooks/useAuth';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';
import { ErrorResponse } from '@/shared/lib/constants';
import { CreateOrderBody } from '@/shared/types/types';
import { SelectedItem } from './lib/types';
import BlockButton from '@/components/BlockButton';
import { UnsavedChangesContext } from '@/shared/context/unsaved.context';
import { notifyContext } from '@/shared/context/notification.context';

export default function NewOrder() {
  const [dispatch] = useCreateOrderMutation();
  const { update: setUnsavedState } = useContext(UnsavedChangesContext);
  const form = useModel();
  const { currentUser } = useAuth();
  const { setNotification } = useContext(notifyContext);

  useEffect(() => {
    const res = form.isDirty();
    setUnsavedState((prev) => ({ ...prev, unsavedChanges: res }));
  }, [form.values]);

  const router = useRouter();

  const handleSubmit = async (values: typeof form.values) => {
    try {
      if (!currentUser)
        throw new ErrorResponse({
          status: 401,
          message: "You're not allowed to do this.",
          error: 'Unauthorized',
          timestamp: Date.now(),
          path: '/admin/orders/new',
        });
      const { sameAsDelivery, ...billing } = values.billingAddress;
      const parsed: CreateOrderBody['cartProducts'] = values.items.reduce<
        CreateOrderBody['cartProducts']
      >((acc, curr) => {
        const item: SelectedItem = JSON.parse(curr);

        const cartItem: CreateOrderBody['cartProducts'][number] = {
          count: item.totalQuantity,
          productId: item.pickedAttributes.productId || item.id,
          sizeEnum: item.pickedAttributes.size,
        };

        return acc.concat(cartItem);
      }, []);

      const orderRequest: CreateOrderBody = {
        cartProducts: parsed,
        billingAddress: sameAsDelivery ? values.address : billing,
        shippingAddress: values.address,
        agreementToTerms: true,
        email: values.email,
        emailMeWithOffersAndNews: true,
        commentOfManager: values.comment,
        shippingMethodId: values.shippingMethod === 'standard' ? 1 : 2,
        paymentMethod: values.paymentMethod,
      };

      await dispatch(orderRequest).unwrap();
      form.reset();
      setNotification('Success', 'Order creation succeded!');
    } catch (err) {
      if (isAxiosQueryError(err)) {
        console.error(err);
        setNotification(
          'Failed',
          isErrorDataString(err.data) ? err.data : err.data.message
        );
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
          <BlockButton
            classNames={{
              root: 'font-bold bg-primary text-secondary py-[10px] px-12 border border-solid rounded-sm hover:bg-brand-grey-200',
            }}
            styles={{
              root: { border: '1px solid #C8C8C8' },
            }}
            onClick={handleTurningBack}
          >
            Cancel
          </BlockButton>
          <UnstyledButton
            className='ml-[42px] rounded-sm bg-black px-12 py-[10px] text-primary'
            type='submit'
          >
            Save
          </UnstyledButton>
        </div>
      </form>
    </>
  );
}

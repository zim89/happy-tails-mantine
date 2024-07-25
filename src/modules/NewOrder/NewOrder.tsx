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
import { useGetShippingMethodsQuery } from '@/shared/api/shippingMethodsApi';
import Loader from '@/components/Loader';
import { useGetTaxQuery } from '@/shared/api/taxApi';
import { useSelectDeliveries } from '@/shared/hooks/useSelectDeliveries';

export default function NewOrder() {
  const {
    error: deliveriesError,
    data: deliveries,
    isLoading: isLoadingDeliveries,
  } = useGetShippingMethodsQuery();
  const {
    error: taxError,
    data: tax,
    isLoading: isLoadingTax,
  } = useGetTaxQuery();

  const [dispatch] = useCreateOrderMutation();
  const { update: setUnsavedState } = useContext(UnsavedChangesContext);
  const form = useModel();
  const { currentUser } = useAuth();
  const { setNotification } = useContext(notifyContext);

  const deliveryOpt = useSelectDeliveries((state) =>
    state.find((del) => del.name === form.values.shippingMethod)
  );

  useEffect(() => {
    const res = form.isDirty();
    setUnsavedState((prev) => ({ ...prev, unsavedChanges: res }));
  }, [form.values]);

  const router = useRouter();

  if (deliveriesError || taxError)
    return (
      <p>{`Whoops, it shouldn't have happened, our experts are fixing this.`}</p>
    );

  if (isLoadingDeliveries || isLoadingTax || !deliveries || !tax)
    return <Loader size={128} />;

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const { hasErrors } = form.validate();
      if (hasErrors) return;

      if (!currentUser)
        throw new ErrorResponse({
          status: 401,
          message: "You're not allowed to do this.",
          error: 'Unauthorized',
          timestamp: Date.now(),
          path: '/admin/orders/new',
        });

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

      const {
        sameAsDelivery,
        street: billingAddr1,
        apartment: billingAddr2,
        ...billing
      } = values.billingAddress;
      const {
        street: shippingAddr1,
        apartment: shippingAddr2,
        ...address
      } = values.address;

      const mappedShippingAddress = {
        ...address,
        addressLine1: shippingAddr1,
        addressLine2: shippingAddr2,
      };

      const mappedBillingAddress = {
        ...billing,
        addressLine1: billingAddr1,
        addressLine2: billingAddr2,
      };

      const orderRequest: CreateOrderBody = {
        cartProducts: parsed,
        billingAddress: sameAsDelivery
          ? mappedShippingAddress
          : mappedBillingAddress,
        shippingAddress: mappedShippingAddress,
        agreementToTerms: true,
        email: values.email,
        emailMeWithOffersAndNews: true,
        commentOfManager: values.comment,
        shippingMethodId: deliveryOpt?.id ?? 0,
        paymentMethod: values.paymentMethod,
      };

      await dispatch(orderRequest).unwrap();
      form.reset();
      setNotification('Success', 'Order creation succeeded!');
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
      <form className='space-y-12'>
        <ProductSelection form={form} />
        <DeliveryForm form={form} />
        <ShippingAndPayment form={form} deliveries={deliveries.content} />
        <OrderTotal form={form} taxRate={tax.rate} />
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
            onClick={() => handleSubmit(form.values)}
          >
            Save
          </UnstyledButton>
        </div>
      </form>
    </>
  );
}

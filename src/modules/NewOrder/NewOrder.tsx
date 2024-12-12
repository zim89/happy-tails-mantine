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
import { brandNotification, handleDispatchError } from '@/shared/lib/helpers';
import { ErrorResponse } from '@/shared/lib/constants';
import BlockButton from '@/components/BlockButton';
import { UnsavedChangesContext } from '@/shared/context/unsaved.context';
import { useGetShippingMethodsQuery } from '@/shared/api/shippingMethodsApi';
import Loader from '@/components/Loader/Loader';
import { useGetTaxQuery } from '@/shared/api/taxApi';
import { useSelectDeliveries } from '@/shared/hooks/useSelectDeliveries';
import { UNAUTHORIZED } from '@/shared/constants/httpCodes';
import { createOrderRequest, mapAddresses, parseItems } from './lib/util';
import { CreateOrderBody } from '@/shared/types/types';
import { handleError } from '@/shared/helpers/error.helpers';
import { toast } from 'react-toastify';

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

  const processOrderCreation = async (orderRequest: CreateOrderBody) => {
    const formCopy = {
      ...form.values,
    };

    try {
      form.reset();
      brandNotification('SUCCESS', 'Order creation succeeded!');
      await dispatch(orderRequest).unwrap();
    } catch (err) {
      form.setValues(formCopy);
      throw err;
    }
  };

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const { hasErrors } = form.validate();
      if (hasErrors) return;

      if (!currentUser)
        throw new ErrorResponse({
          status: UNAUTHORIZED,
          message: "You're not allowed to do this.",
          error: 'Unauthorized',
          timestamp: Date.now(),
          path: '/admin/orders/new',
        });

      const parsedItems = parseItems(values.items);

      const { mappedBillingAddress, mappedShippingAddress } =
        mapAddresses(values);

      const orderRequest = createOrderRequest(
        values,
        parsedItems,
        mappedBillingAddress,
        mappedShippingAddress,
        deliveryOpt
      );

      await processOrderCreation(orderRequest);
    } catch (err) {
      handleError(err, toast.error);
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

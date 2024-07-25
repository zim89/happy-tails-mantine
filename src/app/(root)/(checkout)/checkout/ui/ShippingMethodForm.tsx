'use client';

import { NumberFormatter, Radio } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

import {
  selectCheckout,
  setShippingMethod,
} from '@/shared/redux/checkout/checkoutSlice';
import { useAppDispatch, useAppSelector } from '@/shared/redux/store';
import Title from './SubHeading';
import Wrapper from './Wrapper';
import { getDeliveryDate } from '@/shared/helpers/date.helpers';
import { useGetShippingMethodsQuery } from '@/shared/api/shippingMethodsApi';

export default function ShippingMethodForm() {
  const [isCompleted, setIsCompleted] = useState(false);
  const { data, isLoading } = useGetShippingMethodsQuery();
  const dispatch = useAppDispatch();
  const { shippingAddress, shippingMethod } = useAppSelector(selectCheckout);

  const form = useForm({
    initialValues: {
      shippingMethod: 'Standard',
    },
  });

  const onSubmit = () => {
    if (!data) return;

    const shippingMethod = data.content.find(
      (method) => method.name === form.values.shippingMethod
    )!;
    dispatch(setShippingMethod(shippingMethod));
    setIsCompleted(true);
  };

  if (!shippingAddress) {
    return (
      <h2 className='bg-brand-grey-200 px-6 py-4 text-lg/[1.35rem] font-bold text-brand-grey-900'>
        Shipping Method
      </h2>
    );
  }

  return (
    <>
      {data && !isLoading && (
        <Wrapper>
          <Title
            title='Shipping Method'
            isCompleted={isCompleted}
            setIsCompleted={setIsCompleted}
          />

          {isCompleted ? (
            <p className='flex items-baseline justify-between text-base font-bold'>
              <span>{shippingMethod?.description}</span>
              <span className='text-sm/[21px] font-normal'>
                {getDeliveryDate(shippingMethod?.daysOfDelivery!)}
              </span>
              <NumberFormatter
                prefix='$'
                value={shippingMethod?.price}
                decimalScale={2}
                className='text-base font-bold text-brand-grey-900'
              />
            </p>
          ) : (
            <div>
              <Radio.Group
                {...form.getInputProps('shippingMethod')}
                name='shippingMethod'
              >
                {data.content.map((method) => (
                  <div
                    key={method.id}
                    className='mb-4 grid grid-cols-2 items-center border border-brand-grey-400 px-4 py-2 md:grid-cols-3'
                  >
                    <div className='flex items-center gap-2'>
                      <Radio
                        value={method.name}
                        classNames={{
                          root: 'group',
                          inner: 'radio-inner',
                          radio: 'radio-radio',
                        }}
                      />
                      <div className='space-y-0.5'>
                        <label className='block text-base font-bold'>
                          {method.name}
                        </label>
                        <span className='block text-sm/[1.3125rem] md:hidden'>
                          {getDeliveryDate(method.daysOfDelivery)}
                        </span>
                      </div>
                    </div>
                    <span className='hidden text-sm/[1.3125rem] md:inline-block'>
                      {getDeliveryDate(method.daysOfDelivery)}
                    </span>
                    <NumberFormatter
                      prefix='$'
                      value={method.price}
                      decimalScale={2}
                      className='text-end text-base font-bold text-brand-grey-900'
                    />
                  </div>
                ))}
              </Radio.Group>

              <button
                className='btn btn-primary mt-6 w-full'
                onClick={onSubmit}
              >
                Continue to Payment
              </button>
            </div>
          )}
        </Wrapper>
      )}
    </>
  );
}

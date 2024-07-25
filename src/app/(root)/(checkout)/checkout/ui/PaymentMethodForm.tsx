'use client';

import { Radio } from '@mantine/core';
import Image from 'next/image';
import { useState } from 'react';

import {
  selectCheckout,
  setPaymentMethod,
} from '@/shared/redux/checkout/checkoutSlice';
import { useAppDispatch, useAppSelector } from '@/shared/redux/store';
import Wrapper from './Wrapper';
import Title from './SubHeading';

export default function PaymentMethodForm() {
  const { shippingMethod, paymentMethod } = useAppSelector(selectCheckout);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('cash');

  const onChange = (value: string) => {
    setValue(value);
    dispatch(setPaymentMethod(value));
  };

  if (!shippingMethod) {
    return (
      <h2 className='bg-brand-grey-200 px-6 py-4 text-lg/[1.35rem] font-bold text-brand-grey-900'>
        Payment Method
      </h2>
    );
  }

  return (
    <Wrapper>
      <Title title='Payment Method' />

      <div>
        <Radio.Group name='paymentMethod' value={value} onChange={onChange}>
          <div className='mb-4 flex items-center justify-between border border-brand-grey-400 px-4 py-2'>
            <div className='flex items-center gap-2'>
              <Radio
                value='card'
                classNames={{
                  root: 'group',
                  inner: 'radio-inner',
                  radio: 'radio-radio',
                }}
              />
              <label className='text-base font-bold'>
                Credit or Debit Card
              </label>
            </div>

            <div className='flex gap-2'>
              <div className='flex h-7 w-10 items-center justify-center rounded-0.5 border border-brand-grey-400 bg-brand-grey-200'>
                <Image
                  src='/icons/additional/mastercard.svg'
                  alt={'Mastercard'}
                  width={24}
                  height={19}
                />
              </div>
              <div className='flex h-7 w-10 items-center justify-center rounded-0.5 border border-brand-grey-400 bg-brand-grey-200'>
                <Image
                  src='/icons/additional/visa.svg'
                  alt={'Visa card'}
                  width={24}
                  height={19}
                  style={{ width: 'auto' }}
                />
              </div>
            </div>
          </div>

          {paymentMethod === 'card' && (
            <p className='mb-4 bg-brand-green-200 px-4 py-2 text-base text-brand-green-400'>
              Our manager will contact you and provide the details for payment
              for the goods
            </p>
          )}

          <div className='flex items-center gap-2 border border-brand-grey-400 px-4 py-2'>
            <Radio
              value='cash'
              classNames={{
                root: 'group',
                inner: 'radio-inner',
                radio: 'radio-radio',
              }}
            />
            <label className='text-base font-bold'>Cash Payment</label>
          </div>
        </Radio.Group>
      </div>
    </Wrapper>
  );
}

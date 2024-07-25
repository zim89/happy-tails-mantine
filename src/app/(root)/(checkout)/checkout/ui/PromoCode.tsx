import { Accordion, Loader, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import axios from 'axios';
import { useState } from 'react';
import dayjs from 'dayjs';
import { AlertCircle } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/shared/redux/store';
import { cn } from '@/shared/lib/utils';
import { setDiscount } from '@/shared/redux/checkout/checkoutSlice';
import type { Discount } from '@/shared/api/discountApi';
import { selectCartTotalPrice } from '@/shared/redux/cart/cartSlice';

export default function PromoCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const cartTotalPrice = useAppSelector(selectCartTotalPrice);
  const dispatch = useAppDispatch();

  const form = useForm({
    initialValues: {
      code: '',
    },
    validate: {
      code: isNotEmpty('Promo code cannot be empty'),
    },
  });

  const fetchDiscount = async () => {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + `/discount/${form.values.code}`
    );
    return res.data;
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      setMessage('');
      const discount: Discount = await fetchDiscount();

      const isExpired = dayjs().isAfter(dayjs.unix(discount.expirationDate));
      if (isExpired) {
        form.setErrors({ code: 'This coupon has already expired' });
        return;
      }

      if (discount.minPrice > cartTotalPrice) {
        form.setErrors({
          code: `The coupon is valid only with a minimum order of ${discount.minPrice.toFixed(2)}$`,
        });
        return;
      }

      dispatch(setDiscount(discount));
      setMessage('The coupon has been successfully applied');
    } catch (error: any) {
      if (error.response.status === 404) {
        form.setErrors({ code: error.response.data.message });
      } else {
        form.setErrors({ code: 'Something went wrong, please try again!' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Accordion
      chevronPosition='right'
      classNames={{
        control: 'promo-acc-control',
        item: 'promo-acc-item',
        label: 'promo-acc-label',
        chevron: 'promo-acc-chevron',
        content: 'promo-acc-content',
        panel: 'h-[135px]',
      }}
    >
      <Accordion.Item value='promo'>
        <Accordion.Control>
          <p className='absolute -top-0.5 left-0 text-base font-bold text-secondary'>
            Have a promo code?
          </p>
          Enter Code Here
        </Accordion.Control>
        <Accordion.Panel>
          <form onSubmit={form.onSubmit(onSubmit)} className='space-y-8'>
            <div className='relative'>
              <TextInput
                {...form.getInputProps('code')}
                placeholder=''
                label='Promo Code'
                rightSectionPointerEvents='none'
                rightSection={
                  form.errors.code ? (
                    <AlertCircle className='size-5 text-brand-red-400' />
                  ) : null
                }
                classNames={{
                  root: 'form-root',
                  label: 'form-label',
                  input: cn(
                    'form-input',
                    form?.errors?.code && 'border-brand-red-400 text-secondary'
                  ),
                  error: 'text-brand-red-400 absolute -bottom-[22px] left-0',
                }}
              />

              {message && (
                <p className='absolute -bottom-[25px] left-0 text-sm/[1.3125rem] text-brand-green-400'>
                  {message}
                </p>
              )}
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                disabled={isLoading}
                className={cn(
                  'btn btn-primary disabled:btn-disabled relative flex items-center justify-center gap-2 px-[49px]'
                )}
              >
                {isLoading && <Loader />}
                Apply
              </button>
            </div>
          </form>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

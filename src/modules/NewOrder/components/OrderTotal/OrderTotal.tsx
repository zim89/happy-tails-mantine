import { Card, Divider, NumberFormatter, TextInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { UseFormReturnType } from '@mantine/form';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';

import { NewOrderFields } from '@/shared/hooks/useNewOrderFormModel';
import { Product } from '@/shared/types/types';
import { useGetDiscountByCodeQuery } from '@/shared/api/discountApi';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';
import { useSelectDeliveries } from '@/shared/hooks/useSelectDeliveries';
import { NOT_FOUND } from '@/shared/constants/httpCodes';

type Props = {
  taxRate: number;
  form: UseFormReturnType<
    NewOrderFields,
    (values: NewOrderFields) => NewOrderFields
  >;
};

export default function OrderTotal({ form, taxRate }: Props) {
  const delivery = useSelectDeliveries((state) =>
    state.find((del) => del.name === form.values.shippingMethod)
  );

  const [promoCode, setPromoCode] = useDebouncedState('', 300, {
    leading: false,
  });

  const { data, error } = useGetDiscountByCodeQuery(
    { code: promoCode },
    { skip: promoCode.length !== 6 }
  );

  useEffect(() => {
    const discountValue =
      !isAxiosQueryError(error) && data && 'discount' in data
        ? data.discount
        : 0;
    setDiscount(discountValue);
  }, [data, error]);

  const [discount, setDiscount] = useState(0);
  const [hasPromo, setHasPromo] = useState(false);

  const subTotal = form.values.items.reduce((acc, prev) => {
    const parsed: Product = JSON.parse(prev);
    if (parsed.productStatus !== 'IN STOCK') return acc;
    return acc + parsed.price * parsed.totalQuantity;
  }, 0);

  const shipping = subTotal === 0 ? 0 : delivery?.price || 0;

  const tax =
    subTotal === 0 ? 0 : (subTotal + shipping - discount) * (taxRate / 100);

  // If the promo code was cleared or changed and wasn't found, then reset the discount
  useEffect(() => {
    if (
      (isAxiosQueryError(error) && error.status === NOT_FOUND) ||
      promoCode.length !== 6
    ) {
      setDiscount(0);
    }
  }, [error, promoCode]);

  return (
    <Card className='bg-brand-grey-300'>
      <h3 className='mb-2 text-xl/6 font-bold'>Bill</h3>
      <Divider className='mb-6' />
      <div className='flex max-w-[653px] flex-col gap-2'>
        <div className='flex justify-between'>
          <p>Subtotal:</p>
          <span>
            <NumberFormatter
              prefix='$'
              decimalScale={2}
              className='whitespace-nowrap pl-2'
              value={subTotal}
            />
          </span>
        </div>
        <div className='flex justify-between'>
          <p>Discount:</p>
          <span>
            <NumberFormatter
              prefix='$'
              decimalScale={2}
              className='whitespace-nowrap pl-2'
              value={discount}
            />
          </span>
        </div>
        <div className='flex justify-between'>
          <p>Tax:</p>
          <span>
            <NumberFormatter
              prefix='$'
              decimalScale={2}
              className='whitespace-nowrap pl-2'
              value={tax}
            />
          </span>
        </div>
        <div className='flex justify-between'>
          <p>Shipping:</p>
          <span>
            <NumberFormatter
              prefix='$'
              decimalScale={2}
              className='whitespace-nowrap pl-2'
              value={shipping}
            />
          </span>
        </div>
      </div>

      <div className='my-6 max-w-[314px]'>
        <span className='mr-2 font-bold'>Have a promo code?</span>
        <button
          className='text-[#F39324]'
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            setHasPromo(!hasPromo);
          }}
        >
          Enter Code Here{' '}
          {hasPromo ? (
            <ChevronDown className='inline-block' size={16} />
          ) : (
            <ChevronUp className='inline-block' size={16} />
          )}
        </button>
        {hasPromo && (
          <TextInput
            placeholder='Enter a promo code'
            classNames={{
              input: 'form-input',
              root: 'form-root mt-2',
              label: 'form-label',
              error: 'form-error -bottom-4',
            }}
            error={
              isAxiosQueryError(error) &&
              !isErrorDataString(error.data) &&
              error.data.message
            }
            defaultValue={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
        )}
      </div>

      <Divider className='my-6' />
      <div className='flex max-w-[653px] justify-between font-bold uppercase'>
        <p>Total:</p>
        <span>
          {subTotal === 0 ? (
            0
          ) : (
            <NumberFormatter
              prefix='$'
              decimalScale={2}
              className='whitespace-nowrap pl-2'
              value={subTotal + tax + shipping - discount}
            />
          )}
        </span>
      </div>
    </Card>
  );
}

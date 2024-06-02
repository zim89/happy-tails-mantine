import { Card, Divider, TextInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { UseFormReturnType } from '@mantine/form';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';

import { NewOrderFields } from '@/shared/hooks/useNewOrderFormModel';
import { Product } from '@/shared/types/types';
import { getDiscount } from "@/shared/api/ordersApi";
import { AxiosError } from 'axios';

type Props = {
  form: UseFormReturnType<
    NewOrderFields,
    (values: NewOrderFields) => NewOrderFields
  >;
};

const tax = 2.49;

export default function OrderTotal({ form }: Props) {
  // TODO: Handling discount
  const [discount, setDiscount] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [hasPromo, setHasPromo] = useState(false);
  const [promoCode, setPromoCode] = useDebouncedState("", 300, { leading: false });

  const subTotal = form.values.items.reduce((acc, prev) => {
    const parsed: Product = JSON.parse(prev);
    // FIX ME
    // if (parsed.productStatus !== "IN STOCK") return acc;
    return acc + parsed.price * parsed.totalQuantity;
  }, 0);

  const shipping = subTotal === 0 ? 0 : form.values.shippingMethod === "fast" ? 20 : 10;

  useEffect(() => {
    if (!promoCode.trim()) return;

    (async () => {
      try {
        const res = await getDiscount(promoCode);
        console.log("Results: ",res);
        setDiscount(res.data.discount);
      } catch(err) {
        if (err instanceof AxiosError) {
          if (err?.response?.data.error === "Not Found") {
            console.log("Message: ",err?.response?.data.message)
            setErrorMsg(err?.response?.data.message);
          } else {
            console.error("Something went wrong: ",err);
          }
        }
      }
    })();
  }, [promoCode])

  return (
    <Card className='bg-[#EEE]'>
      <h3 className='mb-2 text-xl/6 font-bold'>Bill</h3>
      <Divider className='mb-6' />
      <div className='flex max-w-[653px] flex-col gap-2'>
        <div className='flex justify-between'>
          <p>Subtotal:</p>
          <span>${subTotal.toFixed(2)}</span>
        </div>
        <div className='flex justify-between'>
          <p>Discount:</p>
          <span>${discount}</span>
        </div>
        <div className='flex justify-between'>
          <p>Tax:</p>
          <span>${subTotal === 0 ? 0 : tax}</span>
        </div>
        <div className='flex justify-between'>
          <p>Shipping:</p>
          <span>${shipping.toFixed(2)}</span>
        </div>
      </div>

      <div className='my-6 max-w-[314px]'>
        <span className='mr-2 font-bold'>Have a promo code?</span>
        <button
          className='text-[#F39324]'
          onClick={() => setHasPromo(!hasPromo)}
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
              error: 'form-error',
            }}
            error={errorMsg.trim() && promoCode.trim() && errorMsg}
            defaultValue={promoCode}
            onChange={e => setPromoCode(e.target.value)}
          />
        )}
      </div>

      <Divider className='my-6' />
      <div className='flex max-w-[653px] justify-between font-bold uppercase'>
        <p>Total:</p>
        <span>${subTotal === 0 ? 0 : (subTotal + tax + shipping - discount).toFixed(2)}</span>
      </div>
    </Card>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { LoadingOverlay, NumberFormatter } from '@mantine/core';

import { useAppDispatch, useAppSelector } from '@/shared/redux/store';
import ContactForm from './ContactForm';
import { selectCheckout } from '@/shared/redux/checkout/checkoutSlice';
import DeliveryForm from './DeliveryForm';
import ShippingMethodForm from './ShippingMethodForm';
import PaymentMethodForm from './PaymentMethodForm';
import {
  clearCart,
  selectCart,
  selectCartTotalPrice,
} from '@/shared/redux/cart/cartSlice';
import { cn } from '@/shared/lib/utils';
import Loader from '@/components/Loader/Loader';
import PromoCode from './PromoCode';
import Checkbox from '@/components/Checkbox';
import { APP_PAGES } from '@/shared/config/pages-url.config';
import { useGetTaxQuery } from '@/shared/api/taxApi';
import { useCreateOrderAuthMutation } from '@/shared/api/cartApi';
import { BG_COLORS } from '@/shared/constants/colors.const';
import type { Order } from '@/shared/types/types';
import { CLIENT_ERROR } from '@/shared/constants/httpCodes';
import type { ResponseError } from '@/shared/types/error.types';
import { handleError } from '@/shared/helpers/error.helpers';

export default function CheckoutForm() {
  const {
    contactData,
    shippingAddress,
    billingAddress,
    shippingMethod,
    paymentMethod,
    discount: currentDiscount,
  } = useAppSelector(selectCheckout);
  const cart = useAppSelector(selectCart);
  const cartTotalPrice = useAppSelector(selectCartTotalPrice);
  const { data: currentTax } = useGetTaxQuery();

  const discount = (currentDiscount?.discount! * cartTotalPrice) / 100 || 0;
  const shipping = shippingMethod?.price! || 0;
  const tax = (currentTax?.rate! * cartTotalPrice) / 100 || 0;
  const totalPrice: number = cartTotalPrice - discount + shipping + tax;

  const canPlaceOrder =
    contactData && shippingAddress && billingAddress && shippingMethod;

  const [agreementToTerms, setAgreementToTerms] = useState(false);
  const [createOrder, { isLoading }] = useCreateOrderAuthMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleCreateOrder = async () => {
    if (canPlaceOrder && agreementToTerms) {
      const formData = {
        shippingAddress,
        billingAddress,
        shippingMethodId: shippingMethod.id,
        paymentMethod,
        email: contactData.email,
        commentOfManager: null,
        agreementToTerms,
        taxAmount: tax,
        emailMeWithOffersAndNews: contactData.subscription,
        discountCode: currentDiscount?.code ?? '',
        cartProducts: cart.map((product) => ({
          productId: product.id,
          count: product.count,
          sizeEnum: product.size ? product.size : 'ONE SIZE',
        })),
      };

      try {
        const response = await createOrder(formData).unwrap();
        dispatch(clearCart());
        router.push(
          APP_PAGES.CONFIRMATION +
            `?email=${(response as Order).email}&orderNumber=${(response as Order).number}`
        );
      } catch (err) {
        handleError(err, toast.error);
      }
    }
  };

  return (
    <div className=''>
      <h1 className='pb-3 text-xl/6 font-bold uppercase md:text-[1.75rem]/[2.1rem] lg:pl-[99px]'>
        Checkout
      </h1>

      <div className='relative flex flex-col gap-14 lg:flex-row lg:justify-center lg:gap-6'>
        <LoadingOverlay
          visible={isLoading}
          zIndex={10}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: '#F39324' }}
        />
        <div className='space-y-4 border-t border-t-brand-grey-400 pt-6 lg:w-[572px]'>
          <ContactForm />
          <DeliveryForm />
          <ShippingMethodForm />
          <PaymentMethodForm />
        </div>

        <div className='space-y-6 lg:w-[374px]'>
          <div className='flex flex-col gap-6 bg-brand-grey-200 p-6'>
            <h3 className='border-b border-b-brand-grey-400 pb-3 text-xl/6 font-bold'>
              Items: {cart.length}
            </h3>

            <ul className='flex flex-col gap-5 pb-3'>
              {cart.map((product, index) => (
                <li key={index} className='flex items-center gap-6'>
                  <div className='h-[72px] w-[72px] flex-none self-start rounded-0.5 border border-brand-grey-400 bg-primary p-1'>
                    <Image
                      src={product.imagePath || '/images/no-image.512x512.png'}
                      alt={product.name}
                      height={64}
                      width={64}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>

                  <div className='grow space-y-1'>
                    <p className='text-xs/normal'>{product.article}</p>
                    <div className='flex items-center justify-between'>
                      <p className='line-clamp-1 text-base font-bold'>
                        {product.name}
                      </p>
                      <NumberFormatter
                        prefix='$ '
                        value={product.count * product.price}
                        decimalScale={2}
                        className='whitespace-nowrap pl-2 text-xl/normal'
                      />
                    </div>
                    {(product.color || product.productSizes) && (
                      <div className='flex items-center gap-2'>
                        {product.color && product.color !== 'ONE COLOR' && (
                          <span
                            className={cn(
                              'inline-block size-[14px] rounded-full border border-brand-grey-400',
                              BG_COLORS[product.color]
                            )}
                          />
                        )}

                        <p className='text-xs/[18px] text-black'>
                          {product.color && product.color !== 'ONE COLOR'
                            ? product.color
                            : ''}{' '}
                          {product.color && product.size !== 'ONE SIZE'
                            ? `/ ${product.size}`
                            : ''}
                        </p>
                      </div>
                    )}
                    <p className='text-xs/normal'>Quantity: {product.count}</p>
                  </div>
                </li>
              ))}
            </ul>

            <PromoCode />

            <ul className='flex flex-col gap-2 border-b border-b-brand-grey-400 pb-3 pt-2'>
              <li className='flex items-center justify-between text-base'>
                <p>Subtotal:</p>
                <NumberFormatter
                  prefix='$ '
                  value={cartTotalPrice}
                  decimalScale={2}
                  className='whitespace-nowrap text-xl/normal'
                />
              </li>
              <li className='flex items-center justify-between text-base'>
                <p>Discount:</p>
                <NumberFormatter
                  prefix='$ '
                  value={discount}
                  decimalScale={2}
                  className='whitespace-nowrap text-xl/normal'
                />
              </li>
              <li className='flex items-center justify-between text-base'>
                <p>Tax:</p>
                <NumberFormatter
                  prefix='$ '
                  value={tax}
                  decimalScale={2}
                  className='whitespace-nowrap text-xl/normal'
                />
              </li>
              <li className='flex items-center justify-between text-base'>
                <p>Shipping:</p>
                <NumberFormatter
                  prefix='$ '
                  value={shipping}
                  decimalScale={2}
                  className='whitespace-nowrap text-xl/normal'
                />
              </li>
            </ul>

            <div className='flex items-center justify-between text-xl/normal font-bold'>
              <p className='uppercase'>Total</p>
              <NumberFormatter
                prefix='$ '
                value={Math.max(0, totalPrice)}
                decimalScale={2}
                className='whitespace-nowrap'
              />
            </div>
          </div>

          <Checkbox
            label='By clicking place order i agree to the terms'
            checked={agreementToTerms}
            onChange={(event) =>
              setAgreementToTerms(event.currentTarget.checked)
            }
          />

          <button
            type='button'
            disabled={!canPlaceOrder || !agreementToTerms}
            onClick={handleCreateOrder}
            className={cn(
              'btn btn-primary disabled:btn-disabled relative flex w-full items-center justify-center gap-2'
            )}
          >
            {isLoading && <Loader />}
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

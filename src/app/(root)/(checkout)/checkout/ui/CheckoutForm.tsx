'use client';
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
import Image from 'next/image';
import { NumberFormatter } from '@mantine/core';
import { cn } from '@/shared/lib/utils';
import Loader from '@/components/Loader';
import PromoCode from './PromoCode';
import Checkbox from '@/components/Checkbox';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { APP_PAGES } from '@/shared/config/pages-url.config';
import { useGetTaxQuery } from '@/shared/api/taxApi';
import { useCreateOrderAuthMutation } from '@/shared/api/cartApi';

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
        emailMeWithOffersAndNews: contactData.subscription,
        discountCode: currentDiscount?.code ?? '',
        cartProducts: cart.map((product) => ({
          productId: product.id,
          count: product.count,
          sizeEnum: product!.productSizes![0].size,
        })),
      };

      try {
        const response = await createOrder(formData).unwrap();
        console.log(response);
        dispatch(clearCart());
        router.push(
          APP_PAGES.CONFIRMATION +
            `?email=${response.email}&orderNumber=${response.number}`
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='flex flex-col gap-14 lg:flex-row lg:justify-center lg:gap-6'>
      <div className='space-y-6 lg:w-[572px]'>
        <h1 className='border-b border-b-brand-grey-400 pb-3 text-xl/6 font-bold uppercase md:text-[28px]/[33.6px]'>
          Checkout
        </h1>
        <div className='space-y-4'>
          <ContactForm />
          <DeliveryForm />
          <ShippingMethodForm />
          <PaymentMethodForm />
        </div>
      </div>

      <div className='space-y-6 lg:w-[374px] lg:pt-[46px]'>
        <div className='flex flex-col gap-6 bg-brand-grey-200 p-6'>
          <h3 className='border-b border-b-brand-grey-400 pb-3 text-xl/6 font-bold'>
            Items: {cart.length}
          </h3>

          <ul className='flex flex-col gap-5 pb-3'>
            {cart.map((product) => (
              <li key={product.id} className='flex items-center gap-6'>
                <div className='h-[72px] w-[72px] flex-none self-start rounded-0.5 border border-brand-grey-400 bg-primary p-1'>
                  <Image
                    src={product.imagePath}
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
            <p className={'uppercase'}>Total</p>
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
          onChange={(event) => setAgreementToTerms(event.currentTarget.checked)}
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
  );
}

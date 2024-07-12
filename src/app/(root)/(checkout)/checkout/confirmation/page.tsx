'use client';

import Image from 'next/image';
import { NumberFormatter } from '@mantine/core';
import { useSearchParams } from 'next/navigation';
import { useFindOneByEmailAndCodeQuery } from '@/shared/api/ordersApi';
import { getDeliveryDate } from '@/shared/helpers/date.helpers';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const {
    data: order,
    isLoading,
    error,
  } = useFindOneByEmailAndCodeQuery({
    email: searchParams.get('email')!,
    orderNumber: searchParams.get('orderNumber')!,
  });

  return (
    <div className='space-y-9'>
      {!isLoading && order && (
        <>
          <h1 className='text-center text-[28px]/[33.6px]'>
            You order was placed successfully!
          </h1>
          <div className='flex flex-col gap-9 text-lg/[21.6px]'>
            <div className='space-y-4'>
              <div className='space-y-3'>
                <h3 className='flex flex-col text-xl/6 md:flex-row md:gap-2'>
                  <span className='font-bold'>Order Number:</span>
                  <span className='underline'>{order.number}</span>
                </h3>
                <p className='text-lg/[21.6px]'>
                  Hello, {order.billingAddress.firstName}! We sincerely
                  appreciate your recent purchase from Happy Tails. Rest
                  assured, confirmation email will be on its way to{' '}
                  {order.email} very shortly. Thank you for choosing us!
                </p>
              </div>
              <div className='space-y-2 rounded-sm border border-brand-grey-400 p-4'>
                <div className='flex items-center gap-2'>
                  <Image
                    alt='Truck icon'
                    src='/icons/checkout/truck.svg'
                    width={24}
                    height={24}
                  />
                  <div className='h-px w-6 bg-brand-grey-800' />
                  <Image
                    alt='Package check icon'
                    src='/icons/checkout/package-check.svg'
                    width={24}
                    height={24}
                  />
                </div>
                <p className='text-lg/[1.35rem]'>
                  You order will be delivered on:
                </p>
                <p className='text-xl/6 font-bold'>
                  {getDeliveryDate(
                    order.shippingMethodDTO.daysOfDelivery,
                    order.createdDate,
                    true
                  )}
                </p>
                <p>08:00-12:00, {order.shippingMethodDTO.description}</p>
              </div>
              <div className='space-y-2'>
                <h3 className='pb-1 text-xl/6 font-bold'>Delivery Option</h3>
                <p>
                  {order.shippingAddress.firstName}{' '}
                  {order.shippingAddress.lastName}
                </p>

                {order.shippingAddress.addressLine2 ? (
                  <p>
                    {order.shippingAddress.addressLine1},{' '}
                    {order.shippingAddress.addressLine2}
                  </p>
                ) : (
                  <p>{order.shippingAddress.addressLine1}</p>
                )}
                <p>
                  {order.shippingAddress.country}, {order.shippingAddress.zip},{' '}
                  {order.shippingAddress.state}, {order.shippingAddress.city}
                </p>
              </div>
              <div className='space-y-2'>
                <h3 className='pb-1 text-xl/6 font-bold'>Billing details</h3>
                <p>
                  {order.billingAddress.firstName}{' '}
                  {order.billingAddress.lastName}
                </p>

                {order.billingAddress.addressLine2 ? (
                  <p>
                    {order.billingAddress.addressLine1},{' '}
                    {order.billingAddress.addressLine2}
                  </p>
                ) : (
                  <p>{order.billingAddress.addressLine1}</p>
                )}
                <p>
                  {order.billingAddress.country}, {order.billingAddress.zip},{' '}
                  {order.billingAddress.state}, {order.billingAddress.city}
                </p>
              </div>
              <div className='space-y-2'>
                <h3 className='pb-1 text-xl/6 font-bold'>Payment Method</h3>
                <p>{order.paymentMethod}</p>
              </div>
            </div>
            <div className='space-y-6 bg-brand-grey-200 p-6'>
              <h2 className='text-[1.75rem]/[2.1rem] font-bold'>
                Order details
              </h2>
              <ul className='flex flex-col gap-6'>
                {order.orderProductDTOList.map((product) => (
                  <li
                    key={product.productId}
                    className='flex items-center gap-6 border-b border-brand-grey-400 pb-3'
                  >
                    <div className='relative h-[72px] w-[72px] flex-none self-start rounded-0.5 border border-brand-grey-400 bg-primary p-1'>
                      <Image
                        src={product.productImagePath}
                        alt={product.productName}
                        height={64}
                        width={64}
                        style={{ objectFit: 'contain' }}
                      />
                      <span className='absolute -right-3 -top-3 flex size-6 items-center justify-center rounded-full bg-brand-grey-900 text-sm/[1.05rem] font-bold text-primary'>
                        {product.count}
                      </span>
                    </div>

                    <div className='flex grow items-center justify-between'>
                      <div className='space-y-1'>
                        <p className='text-xs/normal'>
                          {product.productArticle}
                        </p>
                        <p className='line-clamp-1 text-base font-bold'>
                          {product.productName}
                        </p>
                      </div>
                      <NumberFormatter
                        prefix='$'
                        value={product.count * product.productPrice}
                        decimalScale={2}
                        className='whitespace-nowrap pl-2 text-xl/6'
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <div className='space-y-2 border-b border-b-gray-400 pb-3'>
                <p className='flex items-baseline justify-between text-base'>
                  <span>Subtotal:</span>
                  <NumberFormatter
                    prefix='$'
                    value={order.priceOfProducts}
                    decimalScale={2}
                    className='whitespace-nowrap pl-2'
                  />
                </p>
                <p className='flex items-baseline justify-between text-base'>
                  <span>Discount:</span>
                  <NumberFormatter
                    prefix='$'
                    value={order.discountAmount ?? 0}
                    decimalScale={2}
                    className='whitespace-nowrap pl-2'
                  />
                </p>
                <p className='flex items-baseline justify-between text-base'>
                  <span>Tax:</span>
                  <NumberFormatter
                    prefix='$'
                    value={order.taxAmount}
                    decimalScale={2}
                    className='whitespace-nowrap pl-2'
                  />
                </p>
                <p className='flex items-baseline justify-between text-base'>
                  <span>Shipping:</span>
                  <NumberFormatter
                    prefix='$'
                    value={order.shippingMethodDTO.price}
                    decimalScale={2}
                    className='whitespace-nowrap pl-2'
                  />
                </p>
              </div>
              <p className='flex items-baseline justify-between text-xl/6 font-bold uppercase'>
                <span>TOTAL</span>
                <NumberFormatter
                  prefix='$'
                  value={order.totalPrice}
                  decimalScale={2}
                  className='whitespace-nowrap pl-2'
                />
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

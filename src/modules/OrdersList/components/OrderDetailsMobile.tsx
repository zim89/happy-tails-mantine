import { Tooltip, UnstyledButton } from '@mantine/core';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import Image from 'next/image';
import { Fragment } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import LightButton from '@/components/LightButton';
import { BG_COLORS } from '@/shared/constants/colors.const';
import { cn } from '@/shared/lib/utils';
import { Order } from '@/shared/types/types';
import { formatColor, formatSize } from '@/shared/lib/helpers';
import { orderPalette } from '@/shared/lib/constants';
import { formatOrderPriceSchema } from '@/shared/helpers/price.helpers';

import classes from '../classes.module.css';

type Props = {
  order: Order;
  revealedOrders: string[];
  handleReveal(orderID: string): void;
};
export const OrderDetailsMobile = ({
  order,
  handleReveal,
  revealedOrders,
}: Props) => {
  const router = useRouter();

  return (
    <div className='md:hidden'>
      {revealedOrders.includes(order.number) && (
        <div
          className={
            'rounded-t-[40px] py-1 text-center text-xs font-bold text-primary md:hidden'
          }
          style={{
            backgroundColor: orderPalette[order.orderStatus.toLowerCase()],
          }}
        >
          {order.orderStatus}
        </div>
      )}
      <div className='grid grid-cols-[auto_1fr_auto] items-center border border-brand-grey-300 p-4'>
        {order.orderProductDTOList.length > 1 ? (
          <div
            className={
              revealedOrders.includes(order.number)
                ? 'hidden'
                : 'relative mr-4 flex size-[52px] items-center justify-center bg-slate-100'
            }
          >
            <Image
              src={
                order.orderProductDTOList[0].productImagePath ||
                '/images/no-img.png'
              }
              fill
              alt={`${order.orderProductDTOList.length} items`}
              className='blur-[1px] filter'
            />
            <div className='z-10 text-center'>
              <span
                className={cn(
                  '-mb-2 block text-2xl font-bold shadow-sm',
                  classes.highlighted_md
                )}
              >
                {order.orderProductDTOList.length}
              </span>
              <span className={cn('font-light', classes.highlighted)}>
                items
              </span>
            </div>
          </div>
        ) : (
          <Image
            src={
              order.orderProductDTOList[0].productImagePath ||
              '/images/no-img.png'
            }
            width={52}
            height={52}
            alt={order.orderProductDTOList[0].productName ?? 'Product'}
            className={
              revealedOrders.includes(order.number) ? 'hidden' : 'mr-4 block'
            }
          />
        )}
        <p
          className={cn(
            'py-4 text-sm',
            revealedOrders.includes(order.number) && 'col-span-2'
          )}
        >
          №{order.number}
        </p>
        <UnstyledButton
          onClick={() => handleReveal(order.number)}
          className='col-span-1 justify-self-end rounded-sm border border-solid border-brand-grey-400 p-[10px]'
        >
          {revealedOrders.includes(order.number) ? (
            <ChevronUp color='black' size={16} strokeWidth={3} />
          ) : (
            <ChevronDown color='black' size={16} strokeWidth={3} />
          )}
        </UnstyledButton>
        {revealedOrders.includes(order.number) &&
          order.orderProductDTOList.map((product, index) => (
            <Fragment key={index}>
              <Image
                src={product.productImagePath || '/images/no-img.png'}
                alt={product.productName ?? 'Product'}
                width={52}
                height={52}
              />
              <div className='ml-4 py-4 text-xs'>
                <p className='mb-1 inline-flex items-center gap-2 capitalize'>
                  <span
                    className={cn(
                      'inline-block size-[14px] rounded-full border border-brand-grey-400',
                      BG_COLORS[product.productColor]
                    )}
                  ></span>{' '}
                  {formatColor(product.productColor)} /{' '}
                  {formatSize(product.productSize)}
                </p>
                <p>Quantity: {product.count}</p>
              </div>
              <div className='ml-auto text-center text-sm'>
                <p className='mb-1'>Item amount</p>
                <p>
                  {product.count *
                    (product.salePrice != null
                      ? product.salePrice
                      : product.productPrice)}
                  $
                </p>
              </div>
            </Fragment>
          ))}
        {revealedOrders.includes(order.number) && (
          <>
            <div className='col-span-3'>
              <Tooltip label={formatOrderPriceSchema(order)}>
                <p className='inline-flex items-center gap-1 pb-1 pt-2 font-bold'>
                  <span>Total: {order.totalPrice}$</span>
                  <Info size={16} />
                </p>
              </Tooltip>
            </div>

            <div className='col-span-3 mt-3 flex justify-center gap-4'>
              <LightButton
                handler={() => router.push(`/contacts?state=${order.number}`)}
              >
                Leave a review
              </LightButton>
            </div>
          </>
        )}
      </div>
      {revealedOrders.includes(order.number) && (
        <div
          className={
            'rounded-b-[40px] bg-brand-grey-400 py-1 text-center text-xs font-bold text-primary md:hidden'
          }
        >
          from {dayjs.unix(order.createdDate).format('DD.MM.YY')}
        </div>
      )}
    </div>
  );
};

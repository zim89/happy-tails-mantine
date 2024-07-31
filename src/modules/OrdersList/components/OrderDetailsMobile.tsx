import { UnstyledButton } from '@mantine/core';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
import Image from 'next/image';
import { Fragment } from 'react';

import DarkButton from '@/components/DarkButton';
import LightButton from '@/components/LightButton';
import { BG_COLORS } from '@/shared/constants/colors.const';
import { cn } from '@/shared/lib/utils';
import { Order } from '@/shared/types/types';
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
  return (
    <div className='md:hidden'>
      <div
        className={cn(
          'rounded-t-[40px] py-1 text-center text-xs font-bold text-primary md:hidden',
          order.orderStatus === 'SHIPPED' ? 'bg-[#389B48]' : 'bg-[#FBBC04]'
        )}
      >
        {order.orderStatus === 'SHIPPED' ? 'DONE' : 'IN PROGRESS'}
      </div>
      <div className='grid grid-cols-[auto_1fr_1fr] items-center border border-brand-grey-300 p-4'>
        {order.orderProductDTOList.length > 1 ? (
          <div
            className={
              revealedOrders.includes(order.number)
                ? 'hidden'
                : 'relative mr-4 flex size-[52px] items-center justify-center bg-slate-100'
            }
          >
            <Image
              src={order.orderProductDTOList[0].productImagePath}
              fill
              alt={`${order.orderProductDTOList.length} items`}
              className='blur-[2px] filter'
            />
            <div className='z-50 text-center'>
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
            src={order.orderProductDTOList[0].productImagePath}
            width={52}
            height={52}
            alt={order.orderProductDTOList[0].productName}
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
            <ChevronDown color='black' size={16} strokeWidth={3} />
          ) : (
            <ChevronUp color='black' size={16} strokeWidth={3} />
          )}
        </UnstyledButton>
        {revealedOrders.includes(order.number) &&
          order.orderProductDTOList.map((product, index) => (
            <Fragment key={index}>
              <Image
                src={product.productImagePath}
                alt={product.productName}
                width={52}
                height={52}
              />
              <div className='ml-4 py-4 text-xs'>
                <p className='mb-1 inline-flex items-center gap-2'>
                  <span
                    className={cn(
                      'inline-block size-[14px] rounded-full border border-brand-grey-400',
                      BG_COLORS[product.productColor]
                    )}
                  ></span>{' '}
                  {product.productColor} / {product.productSize}
                </p>
                <p>Quantity: {product.count}</p>
              </div>
              <div className='ml-auto text-center text-sm'>
                <p className='mb-1'>Order amount</p>
                <p>{product.productPrice * product.count}$</p>
              </div>
            </Fragment>
          ))}
        {revealedOrders.includes(order.number) && (
          <>
            <p className='col-span-2 inline-flex items-center gap-2 text-sm text-brand-orange-400'>
              <FileText size={16} /> Electronic check
            </p>
            <div className='flex flex-col gap-4'>
              <LightButton handler={() => {}}>Leave a review</LightButton>
              <DarkButton handler={() => {}}>Repeat the order</DarkButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

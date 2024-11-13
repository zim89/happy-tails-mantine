import { Tooltip, UnstyledButton } from '@mantine/core';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import { CustomBadge } from '@/components/Badge';
import DarkButton from '@/components/DarkButton';
import LightButton from '@/components/LightButton';
import { BG_COLORS } from '@/shared/constants/colors.const';
import { cn } from '@/shared/lib/utils';
import { Order } from '@/shared/types/types';
import classes from '../classes.module.css';
import { LoaderBackground } from '@/components/LoaderBackground';
import { formatOrderPriceSchema } from '@/shared/helpers/price.helpers';

type Props = {
  order: Order;
  revealedOrders: string[];
  handleReveal(orderID: string): void;
  handleRepeatOrder: (order: Order) => void;
};

export const OrderDetails = ({
  handleReveal,
  order,
  revealedOrders,
  handleRepeatOrder,
}: Props) => {
  const router = useRouter();
  const [orderIsProceeding, setOrderIsProceeding] = useState(false);

  return (
    <div className='hidden grid-cols-[auto_1fr_1fr] items-center border border-brand-grey-300 p-4 md:grid'>
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
              order.orderProductDTOList[0].productImagePath ??
              '/images/no-img.png'
            }
            fill
            alt={`${order.orderProductDTOList.length} items`}
            className='blur-[2px] filter'
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
            <span className={cn('font-light', classes.highlighted)}>items</span>
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
      <div
        className={cn(
          'inline-flex items-center gap-4',
          revealedOrders.includes(order.number) ? 'col-span-2' : undefined
        )}
      >
        <p className='py-4 text-sm'>
          №{order.number} from{' '}
          {dayjs.unix(order.createdDate).format('DD.MM.YY')}
        </p>
        <CustomBadge
          name={order.orderStatus}
          color={order.orderStatus.toLowerCase()}
        />
      </div>
      <div className='ml-auto flex gap-8'>
        <div className='text-center text-sm'>
          <p className='mb-1'>Order amount</p>
          <Tooltip label={formatOrderPriceSchema(order)}>
            <p className='inline-flex items-center gap-1'>
              <span>$ {order.totalPrice}</span>
              <Info size={16} />
            </p>
          </Tooltip>
        </div>
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
      </div>
      {revealedOrders.includes(order.number) &&
        order.orderProductDTOList.map((product, index) => (
          <Fragment key={index}>
            <Image
              src={product.productImagePath || '/images/no-img.png'}
              width={52}
              height={52}
              alt={product.productName ?? 'Product'}
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
            <div className='ml-auto mr-20 text-center text-xs'>
              <p className='mb-1'>Item amount</p>
              <p>
                ${' '}
                {product.count *
                  (product.salePrice != null
                    ? product.salePrice
                    : product.productPrice)}
              </p>
            </div>
          </Fragment>
        ))}
      {revealedOrders.includes(order.number) && (
        <div className='col-span-3 mt-8 flex justify-end gap-4'>
          <LightButton
            handler={() => router.push(`/contacts?state=${order.number}`)}
          >
            Leave a review
          </LightButton>
          <LoaderBackground loading={orderIsProceeding}>
            <DarkButton
              handler={async () => {
                try {
                  setOrderIsProceeding(true);
                  await handleRepeatOrder(order);
                  setOrderIsProceeding(false);
                } catch {
                  setOrderIsProceeding(false);
                }
              }}
            >
              Repeat the order
            </DarkButton>
          </LoaderBackground>
        </div>
      )}
    </div>
  );
};

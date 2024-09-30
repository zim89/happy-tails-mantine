'use client';

import { Fragment, useState } from 'react';
import { Order } from '@/shared/types/types';
import { OrderDetailsMobile } from './components/OrderDetailsMobile';
import { OrderDetails } from './components/OrderDetails';
import {
  ResponseError,
  useCreateOrderAuthMutation,
} from '@/shared/api/cartApi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { APP_PAGES } from '@/shared/config/pages-url.config';

type Props = {
  orders: Order[];
};

export default function OrdersList({ orders }: Props) {
  const [createOrder, { isLoading }] = useCreateOrderAuthMutation();
  const router = useRouter();

  const [activeOrders, setActiveOrders] = useState<string[]>([]);

  const handleOpen = (index: string) => {
    const candidate = activeOrders.includes(index);
    if (candidate) {
      setActiveOrders((prev) => prev.filter((idx) => idx !== index));
    } else {
      setActiveOrders((prev) => [...prev, index]);
    }
  };

  const handleRepeatOrder = async (order: Order) => {
    try {
      console.log('Order details: ', order);

      const formData = {
        shippingAddress: order.shippingAddress,
        billingAddress: order.billingAddress,
        shippingMethodId: order.shippingMethodDTO.id,
        paymentMethod: order.paymentMethod,
        email: order.email,
        commentOfManager: null,
        agreementToTerms: true,
        emailMeWithOffersAndNews: order.emailMeWithOffersAndNews,
        discountCode: order.discountDTO?.code ?? '',
        cartProducts: order.orderProductDTOList.map((product) => ({
          productId: product.productId,
          count: product.count,
          sizeEnum: product.productSize.replaceAll('_', ' '),
        })),
      };

      // TODO: fix the type
      // @ts-ignore
      const response = await createOrder(formData).unwrap();
      if ((response as ResponseError).status === 400) {
        toast.error('Something went wrong. Please try again later.');
        return;
      }

      router.push(
        APP_PAGES.CONFIRMATION +
          `?email=${(response as Order).email}&orderNumber=${(response as Order).number}`
      );
    } catch (err) {
      console.error('Failed to repeat order:', err);
      toast.error('Failed to repeat the order!');
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      {orders.map((order, index) => (
        <Fragment key={index}>
          {/** Mobile only */}
          <OrderDetailsMobile
            handleReveal={handleOpen}
            order={order}
            revealedOrders={activeOrders}
          />
          {/** Mobile only */}

          {/** Big screens only */}
          <OrderDetails
            handleReveal={handleOpen}
            handleRepeatOrder={handleRepeatOrder}
            order={order}
            revealedOrders={activeOrders}
          />
          {/** Big screens only */}
        </Fragment>
      ))}
    </div>
  );
}

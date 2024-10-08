import { Order } from '../types/types';

export const formatOrderPriceSchema = (order: Order) => {
  return `Price of products (${order.priceOfProducts}$) + Shipping method (${order.shippingMethodDTO.price}$) + Tax (${order.taxAmount}$) ${order.discountAmount ? `- Discount (${order.discountAmount}$)` : ''}`;
};

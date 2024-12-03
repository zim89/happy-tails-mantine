import { filterByDate } from '@/shared/helpers/date.helpers';
import { Order } from '@/shared/types/types';

export const filterOrders = (orders: Order[], filter: string) => {
  return orders.filter((item) => {
    return filter ? filterByDate(filter, item.createdDate) : true;
  });
};

export const searchOrders = (orders: Order[], search: string) => {
  return orders.filter((order) =>
    order.number.toLowerCase().includes(search.toLowerCase())
  );
};

import { Order } from '@/shared/types/types';

const allowedFields = [
  'company',
  'country',
  'zip',
  'state',
  'city',
  'addressLine1',
  'addressLine2',
];

export const cutOffArbitraryDeliveryFields = (
  info: Order['shippingAddress']
) => {
  return Object.entries(info)
    .filter(([key]) => allowedFields.includes(key))
    .reduce(
      (acc, field) => ({
        [field[0]]: field[1],
        ...acc,
      }),
      {} as Partial<Order['shippingAddress']>
    );
};

export const formatAddress = (info: Partial<Order['shippingAddress']>) => {
  return Object.values(info)
    .filter((val) => !!val)
    .reduce((address, segment) => {
      if (!address.trim()) return segment;
      return segment + ', ' + address;
    }, '');
};

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

type OrderForm = {
  billingAddress: Omit<Order['billingAddress'], 'firstName' | 'lastName'> & {
    sameAsDelivery: boolean;
  };
  shippingAddress: Omit<Order['shippingAddress'], 'firstName' | 'lastName'>;
  shippingMethod: string;
};

export const mapAddresses = (values: OrderForm, order: Order) => {
  const { sameAsDelivery, ...billingAddressRest } = values.billingAddress;

  const shippingAddress: Order['shippingAddress'] = {
    ...values.shippingAddress,
    firstName: order.shippingAddress.firstName,
    lastName: order.shippingAddress.lastName,
  };

  const billingAddress: Order['billingAddress'] = sameAsDelivery
    ? shippingAddress
    : {
        ...billingAddressRest,
        firstName: order.billingAddress.firstName,
        lastName: order.billingAddress.lastName,
      };

  return { shippingAddress, billingAddress };
};

export const createRequest = (
  values: OrderForm,
  order: Order,
  shippingAddress: Order['shippingAddress'],
  billingAddress: Order['billingAddress']
) => {
  return {
    orderNumber: order.number,
    paymentMethod: order.paymentMethod,
    commentOfManager: order.commentOfManager || '',
    shippingAddress,
    billingAddress,
    shippingMethodId: values.shippingMethod,
  };
};

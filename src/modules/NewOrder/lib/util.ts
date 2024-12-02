import { CreateOrderBody, ProductColor } from '@/shared/types/types';
import { SelectedItem } from './types';
import { NewOrderFields } from '@/shared/hooks/useNewOrderFormModel';

export const colorMap: { [P in ProductColor]: string } = {
  'ONE COLOR': 'transparent',
  Black: '#161616',
  Blue: '#4285F4',
  Brown: '#A16A44',
  Gray: '#ADADAD',
  Green: '#389B48',
  Orange: '#F39324',
  Purple: '#9747FF',
  Red: '#FF516B',
  Pink: '#FF93FD',
  White: '#FFFFFF',
  Yellow: '#FFE605',
};

export const createOrderRequest = (
  values: any,
  parsedItems: CreateOrderBody['cartProducts'],
  mappedBillingAddress: any,
  mappedShippingAddress: any,
  deliveryOpt: any
) => {
  const orderRequest: CreateOrderBody = {
    cartProducts: parsedItems,
    billingAddress: values.billingAddress.sameAsDelivery
      ? mappedShippingAddress
      : mappedBillingAddress,
    shippingAddress: mappedShippingAddress,
    agreementToTerms: true,
    email: values.email,
    emailMeWithOffersAndNews: true,
    commentOfManager: values.comment,
    shippingMethodId: deliveryOpt?.id ?? 0,
    paymentMethod: values.paymentMethod,
  };

  return orderRequest;
};

export const parseItems = (items: string[]) => {
  return items.reduce<CreateOrderBody['cartProducts']>((acc, curr) => {
    const item: SelectedItem = JSON.parse(curr);
    const cartItem: CreateOrderBody['cartProducts'][number] = {
      count: item.totalQuantity,
      productId: item.pickedAttributes.productId || item.id,
      sizeEnum: item.pickedAttributes.size,
    };
    return acc.concat(cartItem);
  }, []);
};

export const mapAddresses = (values: NewOrderFields) => {
  const {
    sameAsDelivery,
    street: billingAddr1,
    apartment: billingAddr2,
    ...billing
  } = values.billingAddress;
  const {
    street: shippingAddr1,
    apartment: shippingAddr2,
    ...address
  } = values.address;

  const mappedShippingAddress = {
    ...address,
    addressLine1: shippingAddr1,
    addressLine2: shippingAddr2,
  };

  const mappedBillingAddress = {
    ...billing,
    addressLine1: billingAddr1,
    addressLine2: billingAddr2,
  };

  return { mappedBillingAddress, mappedShippingAddress };
};

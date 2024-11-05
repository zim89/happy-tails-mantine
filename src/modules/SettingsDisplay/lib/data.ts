import { ShippingMethod } from '@/shared/types/shippingMethod.types';

export const tabs = [
  { label: 'Main page', value: 'homePage' },
  { label: 'Delivery details', value: 'delivery' },
  { label: 'Promo code', value: 'promo' },
  { label: 'Tax', value: 'tax' },
  { label: 'Profile', value: 'profile' },
];

export const pathMap: { [P in string]: string } = {
  homePage: 'Main Page',
  delivery: 'Delivery',
  promo: 'Promo Code',
  tax: 'Tax',
  profile: 'Profile',
};

export const bannerNames = ['banner_1', 'banner_2', 'banner_3', 'banner_4'];

export const deliveries: ShippingMethod[] = [
  {
    id: 0,
    daysOfDelivery: 2,
    description: '',
    name: 'Standard',
    price: 10.99,
  },
  {
    id: 0,
    daysOfDelivery: 1,
    description: '',
    name: 'Express',
    price: 20.99,
  },
];

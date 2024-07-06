export const tabs = [
  { label: 'Main page', value: 'homePage' },
  { label: 'Delivery details', value: 'delivery' },
  { label: 'Promo code', value: 'promo' },
  { label: 'Tax', value: 'tax' },
];

export const pathMap: { [P in string]: string } = {
  homePage: 'Main Page',
  delivery: 'Delivery',
  promo: 'Promo Code',
  tax: 'Tax',
};

export const bannerNames = ['banner_1', 'banner_2', 'banner_3', 'banner_4'];

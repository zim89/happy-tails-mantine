export const tabs = [
  { label: 'Main page', value: 'homePage' },
  { label: 'Delivery Details', value: 'delivery' },
  { label: 'Promo code', value: 'promo' },
  { label: 'Tax', value: 'tax' },
];

export const pathMap: { [P in string]: string } = {
  homePage: 'Main Page',
  delivery: 'Delivery',
  promo: 'Promo Code',
  tax: 'Tax',
};

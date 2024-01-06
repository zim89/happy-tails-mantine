import deliveryIcon from '@/assets/icons/additional/delivery.svg';
import basketIcon from '@/assets/icons/additional/basket.svg';
import priceIcon from '@/assets/icons/additional/price.svg';

import img1 from '@/assets/images/temp/product-slider/img-01.png';
import img2 from '@/assets/images/temp/product-slider/img-02.png';
import img3 from '@/assets/images/temp/product-slider/img-03.png';

export const additionalList = [
  {
    title: 'Free Standard Delivery',
    desc: 'Orders over £75 qualify for free UK delivery. Orders under £75 will be calculated at the checkout.',
    icon: deliveryIcon,
  },
  {
    title: 'Wide Range of Products',
    desc: "Find exactly what you're looking for with ease from a wide range of products spanning various categories.",
    icon: basketIcon,
  },
  {
    title: 'Special Offers',
    desc: 'Uncover the magic of unbeatable discounts and special promotions awaiting you at our online store.',
    icon: priceIcon,
  },
] as const;

// Temp data
export const sliderData = [
  {
    id: 10,
    article: 'AAABBB010',
    name: 'Name 10',
    price: 13.5,
    categoryId: 5,
    categoryName: 'Furniture',
    description: 'Name 10 description',
    quantity: 240,
    productStatus: 'ACTIVE',
    imagePath: img1,
  },
  {
    id: 11,
    article: 'AAABBB011',
    name: 'Name 11',
    price: 35,
    categoryId: 5,
    categoryName: 'Furniture',
    description: 'Name 10 description',
    quantity: 240,
    productStatus: 'ACTIVE',
    imagePath: img2,
  },
  {
    id: 12,
    article: 'AAABBB012',
    name: 'Name 12',
    price: 84,
    categoryId: 5,
    categoryName: 'Furniture',
    description: 'Name 10 description',
    quantity: 240,
    productStatus: 'ACTIVE',
    imagePath: img3,
  },
] as const;

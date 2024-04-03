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

// Temp lib
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

type Sizing = {
  size: string;
  bodyLength: string;
  chestVolume: string;
  weight: string;
  breeds: string;
};

export const sizingInfo: Sizing[] = [
  {
    size: 'XXS',
    bodyLength: '20-22',
    chestVolume: '25-29',
    weight: 'up to 1.5',
    breeds: 'Small breeds of puppies',
  },
  {
    size: 'XS',
    bodyLength: '23-25',
    chestVolume: '28-32',
    weight: '1.5-2.5',
    breeds:
      'Miniature Yorkshire Terrier, Chihuahua, Miniature pincher, Toy Terrier',
  },
  {
    size: 'S',
    bodyLength: '26-29',
    chestVolume: '32-44',
    weight: '2.5-3.5',
    breeds:
      'Yorkshire Terrier, Chihuahua, Miniature Pincher, Toy Terrier, Pomeranian, Maltese, Maltipoo',
  },
  {
    size: 'SM',
    bodyLength: '30-32',
    chestVolume: '44-52',
    weight: '44-52',
    breeds: 'Pincher, Bichon Frize, Jack Russell Terrier',
  },
  {
    size: 'M',
    bodyLength: '33-36',
    chestVolume: '40-48',
    weight: '3.0-6.0',
    breeds:
      'Maltese, Shih Tzu, Toy Poodle, Toy Poodle (medium breeds of dogs), Bichon Frize, Cavalier King Charles Spaniel',
  },
  {
    size: 'L',
    bodyLength: '37-40',
    chestVolume: '47-56',
    weight: '6.0-13.0',
    breeds:
      'Chinese Crested, Shih Tzu, Toy Poodle, Poodle, Schnauzer, Japanese Chin, Cocker Spaniel',
  },
  {
    size: 'XL',
    bodyLength: '41-43',
    chestVolume: '55-65',
    weight: '10.0-15.0',
    breeds:
      'Schnauzer, Cocker Spaniel, Fox Terrier, Scotish Terrier, Miniature Schnauzer, English Spaniel, Mini Bull Terrier',
  },
  {
    size: '2XL',
    bodyLength: '44-46',
    chestVolume: '60-72',
    weight: '20.0-25.0',
    breeds: 'Samoyed, Bull Terrier',
  },
  {
    size: '3XL',
    bodyLength: '47-49',
    chestVolume: '68-80',
    weight: '25.0-30.0',
    breeds: 'Large Samoyed, Stafford, Bull Terrier',
  },
  {
    size: '4XL',
    bodyLength: '49-51',
    chestVolume: '72-85',
    weight: '30.0-35.0',
    breeds: 'Stafford, Husky',
  },
  {
    size: '5XL',
    bodyLength: '52-56',
    chestVolume: '78-91',
    weight: '35.0-45.0',
    breeds: 'Retriever, Labrador, Boxer',
  },
  {
    size: '6XL',
    bodyLength: '57-59',
    chestVolume: '82-95',
    weight: '45.0-50.0',
    breeds: 'Shepherd, Rottweiler, Doberman',
  },
  {
    size: '7XL',
    bodyLength: '70-72',
    chestVolume: '86-99',
    weight: '60.0-56.0',
    breeds: 'Cane Corso',
  },
];
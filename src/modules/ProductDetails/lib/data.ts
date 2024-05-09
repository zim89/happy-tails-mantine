import { Product } from "@/shared/types/types";

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
export const sliderData: Product[] = [
  {
    "id": 51,
    "article": "ABK4568",
    "name": "K&H Thermo Basket Pet Bed",
    "price": 94.67,
    "onSale": false,
    "salePrice": null,
    "categoryId": 5,
    "categoryName": "Furniture",
    "description": "The K&H Thermo-Basket Pet Bed has firm sidewalls accompanied by a soft cushion filled with polyfil",
    "productType": "INDOORS",
    "quantity": 23,
    "unitsSold": 0,
    "productStatus": "IN STOCK",
    "createdAt": 1714489640.614212,
    "updatedAt": null,
    "imagePath": "https://www.petland.ca/cdn/shop/files/k-h-k-h-thermo-basket-pet-bed-29586999738470_376x489.png?v=1691410500"
  },
  {
    "id": 11,
    "article": "AAABBB05",
    "name": "FurHaven Quilted Orthopedic Sofa",
    "price": 59.99,
    "onSale": false,
    "salePrice": null,
    "categoryId": 5,
    "categoryName": "Furniture",
    "description": "Curling up for a quick nap or a long night’s rest has never felt better when your sleepy pet has the FurHaven Quilted Orthopedic Sofa Cat & Dog Bed w/ Removable Cover. This high-quality bed is designed for maximum comfort with a soft.",
    "productType": "INDOORS",
    "quantity": 32,
    "unitsSold": 0,
    "productStatus": "IN STOCK",
    "createdAt": 1714489640.614212,
    "updatedAt": null,
    "imagePath": "https://image.chewy.com/is/image/catalog/266014_MAIN._AC_SS1800_V1615845695_.jpg"
  },
  {
    "id": 49,
    "article": "ABK4565",
    "name": "Outward Hound Pawsh Donut Cuddler Bed",
    "price": 84.97,
    "onSale": false,
    "salePrice": null,
    "categoryId": 5,
    "categoryName": "Furniture",
    "description": "Your beloved pet deserves high-end luxury, glamour, and style. Get them only the best — beds with exquisite fabrics that provide the utmost comfort and sophisticated flair. Make sure you don't compromise when it comes to style , with Donut Cuddler Bed, you won't have to",
    "productType": "INDOORS",
    "quantity": 23,
    "unitsSold": 0,
    "productStatus": "IN STOCK",
    "createdAt": 1714489640.614212,
    "updatedAt": null,
    "imagePath": "https://www.petland.ca/cdn/shop/files/outward-hound-outward-hound-pawsh-donut-cuddler-bed-mink-29613679509606_376x489.jpg?v=1691283790"
  }
];

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
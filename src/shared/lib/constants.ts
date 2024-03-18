import type { Category } from '@/shared/api/categoryApi';
import { Order } from '../types/types';

export const DEFAULT_CATEGORY_IMAGE = "https://i.imgur.com/dhBg9XH.png";

export const CATEGORY: Category = {
  id: 0,
  name: 'All Products',
  title: 'Premium Dog Products',
  description:
    'We understand that your furry friend deserves nothing but the best. Discover a delightful array of high-quality products designed to enhance your dog&apos;s comfort, happiness, and well-being',
  overview: `From cozy beds to stylish apparel, interactive toys to nutritious treats, our curated collection offers a wide range of items to cater to your dog's every need. Each product is thoughtfully selected to ensure your canine companion experiences ultimate joy and care. Experience the joy of pampering your beloved companion with the finest dog products available. Our commitment to quality ensures that your dog receives the care they truly deserve. Explore our catalog now and elevate your dog's lifestyle to new heights of comfort and happiness!
### Comfortable Rest
Explore our luxurious dog beds and cozy sleeping options that provide your pup with the perfect place to unwind after a day of play. <ins>Plush Bolster Bed for Small Breeds, Cozy Donut Cuddler Bed</ins> - our beds provide optimal support and comfort, ensuring your canine companion enjoys restful sleep
### Tail-Wagging Fashion
Dress your furry friend in style with our trendy dog apparel, from adorable sweaters to practical raincoats, making walks and outings a fashion statement. Waterproof raincoats, doggie bandanas in various prints, adorable dog bowties or reflective safety vests for night walks our clother collection combines fashion and function!
### Engaging Playtime
Choose from an assortment of interactive toys that keep them entertained for hours on end.
### Grooming and Wellness
Discover grooming products that promote your dog's hygiene and well-being, from gentle shampoos to effective tick and flea solutions.
### Travel Essentials
Make adventures with your dog stress-free with our travel-friendly accessories, including collapsible bowls, comfortable carriers, and more.
### Stylish Collars and Durable Leads
Ensure your dog's safety and style during walks with our exquisite collection of collars and leads. Choose from a range of designs and materials that blend fashion and functionality seamlessly.`,
  path: 'products',
  productCount: 0,
  imgSrc: DEFAULT_CATEGORY_IMAGE,
  createdAt: 0,
  updatedAt: null
};

export const populateOrders = (): Order[] => {
  return Array(15).fill(0).map(() => ({
    count: Math.floor(Math.random() * 45),
    createdDate: Date.now().toLocaleString(),
    discountCode: "10%",
    price:  Math.floor(Math.random() * 75) + 25,
    purchasedDate: Date.now().toLocaleString(),
    shippingAddress: '',
    number: "13",
    orderProductDTOList: [{
      id: 1,
      orderNumber: "1",
      productId: 1,
      productName: "Test Product",
      productPrice: 100,
      onSale: false,
      salePrice: 100,
      count: 1
    }],
    orderStatus: "Shipped",
    paymentMethod: "Debit Card",
    shippingMethod: "Courier",
    userId: "1"
  }))
}
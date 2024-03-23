import dayjs from 'dayjs';
import { Product } from '../types/types';

export const formatDate = (date: number) => {
  return dayjs.unix(date).format('MMMM D, YYYY');
};

export const formatRawOrderDate = (raw: string) => {
  return dayjs(raw).format("DD.MM.YY");
}

export const formatRawPostDate = (raw: string) => {
  return dayjs(raw).format();
}

export const availabilityMap: {
  [P in NonNullable<Product["productType"]>]: string;
} = {
  "IN_STOCK": "https://schema.org/InStock",
  "OUT OF STOCK": "https://schema.org/OutOfStock",
  // https://schema.org/BackOrder: The item is on back order.
  // https://schema.org/Discontinued: The item has been discontinued.
  // https://schema.org/InStock: The item is in stock.
  // https://schema.org/InStoreOnly: The item is only available for purchase in store.
  // https://schema.org/LimitedAvailability: The item has limited availability.
  // https://schema.org/OnlineOnly: The item is available online only.
  // https://schema.org/OutOfStock: The item is currently out of stock.
  // https://schema.org/PreOrder: The item is available for pre-order.
  // https://schema.org/PreSale: The item is available for ordering and delivery before general availability.
  // https://schema.org/SoldOut: The item has been sold out.
}
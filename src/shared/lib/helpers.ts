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
  "OUT OF STOCK": "https://schema.org/OutOfStock"
}
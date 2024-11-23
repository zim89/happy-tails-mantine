import { Product } from './types';

export interface Favourite {
  productId: number;
  productArticle: string;
  productName: string;
  productPrice: number;
  productImagePath: string;
  productStatus: Product['productStatus'];
  productSize: NonNullable<Product['productSizes']>[number]['size'];
}

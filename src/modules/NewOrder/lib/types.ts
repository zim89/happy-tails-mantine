import { Product, ProductColor, ProductSizeValues } from '@/shared/types/types';

export type Item = Product & {
  colors: {
    value: ProductColor;
    sizes: ProductSizeValues[];
    productId: number;
  }[];
};

export type SelectedItem = Item & {
  pickedAttributes: {
    productId: number | undefined;
    size: ProductSizeValues;
  };
};

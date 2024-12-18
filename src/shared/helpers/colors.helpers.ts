import { COLORS } from '../constants/colors.const';
import type { Product } from '../types/types';

export const generateColorList = (product: Product) => {
  const colors: {
    productId: number;
    productImage: string;
    colorName: string;
    colorHex: string;
    href: string;
  }[] = [];

  COLORS.forEach((color) => {
    if (color.name === product.color) {
      colors.unshift({
        productId: product.id,
        productImage: product.imagePath ?? '/images/no-img.png',
        colorName: color.name,
        colorHex: color.hex,
        href: `/products/${product.id}`,
      });
    }

    const relatedColorItem = product.relatedProducts?.find(
      (item) => item.relatedProductColorEnum === color.name
    );

    if (relatedColorItem) {
      colors.push({
        productId: relatedColorItem.relatedProductId,
        productImage:
          relatedColorItem.relatedProductImagePath ?? '/images/no-img.png',
        colorName: color.name,
        colorHex: color.hex,
        href: `/products/${relatedColorItem.relatedProductId}`,
      });
    }
  });

  return colors;
};

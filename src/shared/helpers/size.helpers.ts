import { ProductSize } from '@/shared/types/types';
import { SIZES } from '@/shared/constants/sizes.const';

export const generateSizes = (productSizes: ProductSize[] | null) => {
  const sizes: {
    isAvailable: boolean;
    size: string;
    productSize: ProductSize | null;
  }[] = [];

  if (
    productSizes === null ||
    (productSizes && productSizes[0].size === 'ONE SIZE')
  ) {
    return [];
  }

  Object.values(SIZES).forEach((size) => {
    const item = productSizes.find((productSize) => productSize.size === size);
    if (item) {
      sizes.push({ isAvailable: true, size, productSize: item });
    } else {
      sizes.push({ isAvailable: false, size, productSize: null });
    }
  });

  return sizes;
};

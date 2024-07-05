import { COLORS } from '../constants/colors.const';

export const getRelatedColors = (
  relatedProducts: {
    relatedProductId: number;
    relatedProductColorEnum: string;
    relatedProductImagePath: string | null;
  }[]
) => {
  const colors: { relatedProductId: number; name: string; hex: string }[] = [];
  relatedProducts.forEach((item) => {
    const color = COLORS.find(
      (color) => color.name === item.relatedProductColorEnum
    );

    if (color) {
      colors.push({ relatedProductId: item.relatedProductId, ...color });
    }
  });

  return colors;
};

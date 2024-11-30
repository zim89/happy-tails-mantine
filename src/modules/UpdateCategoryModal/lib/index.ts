import { Category } from '@/shared/types/types';

export const updateCategory = (
  category: Category,
  description: string,
  categoryName: string,
  image: string
) => {
  return {
    ...category,
    name: categoryName,
    description,
    title: categoryName,
    imgSrc: image,
  };
};

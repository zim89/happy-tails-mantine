import categories from '@/mock/categories.json';

// TODO: Remove test_ prefix
export type Category = {
  id: number;
  name: string;
  title: string;
  test_description: string;
  test_overview: string;
  path: string;
  productCount: number;
};

// TODO: Implement fetch from the server
export const getAllCategories = (): Category[] => {
  return categories;
};

export const getCategoryByPath = (path: string): Category | undefined => {
  return categories.find((category) => category.path === path);
};

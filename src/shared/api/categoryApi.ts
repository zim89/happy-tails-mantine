import { BackendResponse } from '../types/types';

export type Category = {
  id: number;
  name: string;
  title: string;
  description: string;
  overview: string;
  path: string;
  productCount: number;
};

// TODO: Implement fetch from the server
export const getAllCategories = async (): Promise<
  BackendResponse<Category[]>
> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category`);

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  return res.json();
};

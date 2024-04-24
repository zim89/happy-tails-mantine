import axios from 'axios';

import authorizedAxios from "@/shared/lib/interceptor";
import { BackendResponse, Category, Product } from '../types/types';
import { User } from '../types/auth.types';

export const getProductById = async (id: string) => {
  try {
    const request = await axios.get<Product>(
      process.env.NEXT_PUBLIC_BASE_URL + '/products/' + id,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const result = request.data;
    return result;
  } catch (err) {
    throw err;
  }
};

export const getProductList = async () => {
  try {
    const request = await axios.get<BackendResponse<Product[]>>(
      process.env.NEXT_PUBLIC_BASE_URL + '/products',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const result = request.data;
    return result.content;
  } catch (err) {
    throw err;
  }
};

export const getUserByUUID = async (uuid: string) => {
  try {
    const res = await authorizedAxios<User>(`/users/${uuid}`);

    return res.data;
  } catch (err) {
    throw err;
  }
}

export const getAllCategories = async () => {
  try {
    const res = await axios.get<BackendResponse<Category[]>>(`${process.env.NEXT_PUBLIC_BASE_URL}/category`);
    const categories: Category[] = res.data.content;
    return categories;
  } catch (err) {
     throw err;
  }
};
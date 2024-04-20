import axios from 'axios';
import { BackendResponse, Product } from '../types/types';

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
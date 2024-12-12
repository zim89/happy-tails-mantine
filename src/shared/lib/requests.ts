import axios, { isAxiosError } from 'axios';

import authorizedAxios from '@/shared/lib/interceptor';
import { BackendResponse, Category, Product } from '../types/types';
import { User } from '../types/auth.types';
import { Post } from '../api/postApi';
import { unstable_noStore } from 'next/cache';
import { API_URL, IMGUR_CLIENT_ID } from '../constants/env.const';
import { NOT_FOUND } from '../constants/httpCodes';
import { DEFAULT_CATEGORY_IMAGE } from './constants';
import { validateFile } from './helpers';

export const getProductById = async (id: string) => {
  const request = await axios.get<Product>(API_URL + '/products/' + id, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = request.data;
  return result;
};

export const getProductList = async () => {
  const request = await axios.get<BackendResponse<Product[]>>(
    API_URL + '/products',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const result = request.data;
  return result.content;
};

export const getUserByEmail = async (email: string) => {
  const res = await authorizedAxios<User>(`/users/${email}`);
  return res.data;
};

export const getAllCategories = async () => {
  const res = await axios.get<BackendResponse<Category[]>>(
    `${API_URL}/category`
  );
  const categories: Category[] = res.data.content;
  return categories;
};

export const fetchAllPosts = async (
  page = 0,
  size = 6
): Promise<BackendResponse<Post[]>> => {
  unstable_noStore();

  const res = await fetch(
    `${API_URL}/posts/published?page=${page}&size=${size}`,
    { cache: 'no-store' }
  );
  return await res.json();
};

export const fetchPostList = async (): Promise<BackendResponse<Post[]>> => {
  const res = await axios(`${API_URL}/posts/published`);
  return res.data;
};

export const fetchOnePost = async (id: string): Promise<Post | null> => {
  unstable_noStore();

  const res = await axios(`${API_URL}/posts/${id}`);
  if (res.status === NOT_FOUND) return null;
  return res.data;
};

export const fetchHeroPost = async (): Promise<Post> => {
  const res = await axios(`${API_URL}/posts/hero`);
  return res.data;
};

export const fetchLastFivePosts = async (): Promise<Post[]> => {
  const res = await axios(`${API_URL}/posts/last-five`);
  return res.data;
};

export const publishImage = async (
  image: Blob | string,
  title: string
): Promise<string> => {
  if (process.env.NODE_ENV === 'production') {
    const params = new FormData();
    params.append('image', image);
    params.append('title', title);
    const validationError = validateFile(image);
    if (validationError) throw validationError;

    const res = await axios.post('https://api.imgur.com/3/image/', params, {
      headers: {
        Authorization: `Bearer ${IMGUR_CLIENT_ID}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data.data.link;
  } else {
    return DEFAULT_CATEGORY_IMAGE;
  }
};

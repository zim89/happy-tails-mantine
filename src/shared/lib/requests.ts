import axios from 'axios';

import authorizedAxios from '@/shared/lib/interceptor';
import { BackendResponse, Category, Product } from '../types/types';
import { User } from '../types/auth.types';
import { Post } from '../api/postApi';
import { unstable_noStore } from 'next/cache';

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

export const getUserByEmail = async (email: string) => {
  try {
    const res = await authorizedAxios<User>(`/users/${email}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getAllCategories = async () => {
  try {
    const res = await axios.get<BackendResponse<Category[]>>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category`
    );
    const categories: Category[] = res.data.content;
    return categories;
  } catch (err) {
    throw err;
  }
};

export const fetchAllPosts = async (
  page = 0,
  size = 6
): Promise<BackendResponse<Post[]>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/posts/published?page=${page}&size=${size}`
    );
    return res.json();
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
};

export const fetchPostList = async (): Promise<BackendResponse<Post[]>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/posts/published`
    );
    return res.json();
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
};

export const fetchOnePost = async (id: string): Promise<Post | null> => {
  unstable_noStore();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`);
    if (res.status === 404) return null;
    return res.json();
  } catch (error) {
    throw new Error('Failed to fetch post');
  }
};

export const fetchHeroPost = async (): Promise<Post> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/hero`);
    return res.json();
  } catch (error) {
    throw new Error('Failed to fetch hero post');
  }
};

export const fetchLastFivePosts = async (): Promise<Post[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/posts/last-five`
    );
    return res.json();
  } catch (error) {
    throw new Error('Failed to fetch last posts');
  }
};

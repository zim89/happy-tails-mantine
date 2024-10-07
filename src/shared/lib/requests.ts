import axios, { isAxiosError } from 'axios';

import authorizedAxios from '@/shared/lib/interceptor';
import {
  AxiosQueryError,
  BackendResponse,
  Category,
  Product,
} from '../types/types';
import { User } from '../types/auth.types';
import { Post } from '../api/postApi';
import { unstable_noStore } from 'next/cache';
import { DEFAULT_CATEGORY_IMAGE } from './constants';
import { API_URL, IMGUR_CLIENT_ID } from '../constants/env.const';
import { MAX_FILE_SIZE } from '../constants/sizes.const';
import {
  NOT_FOUND,
  TOO_LARGE_PAYLOAD,
  UNSUPPORTED_TYPE,
} from '../constants/httpCodes';

export const getProductById = async (id: string) => {
  try {
    const request = await axios.get<Product>(API_URL + '/products/' + id, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = request.data;
    return result;
  } catch (err) {
    throw err;
  }
};

export const getProductList = async () => {
  try {
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
      `${API_URL}/category`
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
  unstable_noStore();

  try {
    const res = await fetch(
      `${API_URL}/posts/published?page=${page}&size=${size}`,
      { cache: 'no-store' }
    );
    return await res.json();
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
};

export const fetchPostList = async (): Promise<BackendResponse<Post[]>> => {
  try {
    const res = await axios(`${API_URL}/posts/published`);
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
};

export const fetchOnePost = async (id: string): Promise<Post | null> => {
  unstable_noStore();
  try {
    const res = await axios(`${API_URL}/posts/${id}`);
    if (res.status === NOT_FOUND) return null;
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch post');
  }
};

export const fetchHeroPost = async (): Promise<Post> => {
  try {
    const res = await axios(`${API_URL}/posts/hero`);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }
    throw new Error('Failed to fetch hero post');
  }
};

export const fetchLastFivePosts = async (): Promise<Post[]> => {
  try {
    const res = await axios(`${API_URL}/posts/last-five`);
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch last posts');
  }
};

export const publishImage = async (
  image: Blob | string,
  title: string
): Promise<string> => {
  if (process.env.NODE_ENV === 'production') {
    const params = new FormData();
    params.append('image', image);
    params.append('title', title);

    const regex = /^image\/(gif|webp|png|jpeg)$/;
    const match =
      image instanceof Blob ? image.type.match(regex) : image.match(regex);

    if (!match) {
      throw {
        data: 'Forbidden image type. Available image types are: gif, webp, png and jpeg',
        status: UNSUPPORTED_TYPE,
      } as AxiosQueryError;
    }

    if (image instanceof Blob && image.size > MAX_FILE_SIZE) {
      throw {
        data: 'The file you uploaded exceeds the size limit, please compress or choose a smaller file',
        status: TOO_LARGE_PAYLOAD,
      } as AxiosQueryError;
    }

    try {
      const res = await axios.post('https://api.imgur.com/3/image/', params, {
        headers: {
          Authorization: `Bearer ${IMGUR_CLIENT_ID}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data.data.link;
    } catch (err) {
      if (isAxiosError(err)) console.log(err);
      throw err;
    }
  } else {
    return DEFAULT_CATEGORY_IMAGE;
  }
};

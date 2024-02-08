import { BackendResponse } from '@/shared/types/types';
import { unstable_noStore as noStore } from 'next/cache';

export interface Post {
  id: number;
  title: string;
  slug: string;
  authorName: string;
  posterImgSrc: string;
  blogStatus: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  publishedAt: number;
}

export const fetchAllPosts = async (
  page = 0,
  size = 6
): Promise<BackendResponse<Post[]>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/posts?page=${page}&size=${size}`
    );
    return res.json();
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
};

export const fetchOnePost = async (id: string): Promise<Post | null> => {
  noStore();
  try {
    await new Promise((resolve) => setTimeout(resolve, 6000));
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`);
    console.log(res);
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

import { MetadataRoute } from 'next'

import { getProducts } from '@/shared/api/productApi';
import { getAllCategories } from "@/shared/api/categoryApi";
import { fetchPostList } from '@/shared/api/postApi';

const URL = "https://happy-tails-mantine.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productsRequest = await getProducts();
  const products = productsRequest || [];
  
  const categoriesRequest = await getAllCategories();
  const categories = categoriesRequest.content || [];

  const postsRequest = await fetchPostList();
  const posts = postsRequest.content || [];

  const parsedCategories = categories.map(({ path, createdAt, updatedAt }) => ({
    url: `${URL}/${encodeURIComponent(path)}`,
    lastModified: new Date(updatedAt || createdAt!).toISOString()
  }));

  const parsedProducts = products.map(({ id, updatedAt, createdAt }) => ({
    url: `${URL}/products/${id}`,
    lastModified: new Date(updatedAt || createdAt!).toISOString(),
  }));

  const parsedPosts = posts.map(({ id, createdAt,  updatedAt }) => ({
    url: `${URL}/blog/${id}`,
    lastModified: new Date(updatedAt || createdAt).toISOString(),
  }));  

  const routes = [
    '',
    '/products',
    '/contacts',
    '/blog',
    '/wishlist',
    '/blog',
  ].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...parsedProducts, ...parsedCategories, ...parsedPosts];
}

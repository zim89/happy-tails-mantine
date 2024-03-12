import { getProducts } from '@/shared/api/productApi';
import { getAllCategories } from "@/shared/api/categoryApi";
import { fetchPostList } from '@/shared/api/postApi';

const URL = "https://happy-tails-mantine.vercel.app";

export default async function sitemap() {
  const productsRequest = await getProducts();
  const products = productsRequest || [];
  
  const categoriesRequest = await getAllCategories();
  const categories = categoriesRequest.content || [];

  const postsRequest = await fetchPostList();
  const posts = postsRequest.content || [];

  const parsedCategories = categories.map(({ path }) => ({
    url: `${URL}/${encodeURIComponent(path)}`,
  }));

  const parsedProducts = products.map(({ id }) => ({
    url: `${URL}/products/${id}`,
  }));

  const parsedPosts = posts.map(({ id, createdAt }) => ({
    url: `${URL}/blog/${id}`,
    lastModified: new Date(createdAt).toISOString()
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

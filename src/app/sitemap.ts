import { MetadataRoute } from 'next';

import { fetchPostList } from '@/shared/lib/requests';
import { getProductList, getAllCategories } from '@/shared/lib/requests';
import { SITE_DOMAIN } from '@/shared/constants/env.const';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productsRequest = await getProductList();
  const products = productsRequest || [];

  const categoriesRequest = await getAllCategories();
  const categories = categoriesRequest || [];

  const postsRequest = await fetchPostList();
  const posts = postsRequest.content || [];

  const parsedCategories = categories.map(({ path, createdAt, updatedAt }) => ({
    url: `${SITE_DOMAIN}/${encodeURIComponent(path)}`,
    lastModified: new Date(updatedAt || createdAt!).toISOString(),
  }));

  const parsedProducts = products.map(({ id, updatedAt, createdAt }) => ({
    url: `${SITE_DOMAIN}/products/${id}`,
    lastModified: new Date(updatedAt || createdAt!).toISOString(),
  }));

  const parsedPosts = posts.map(({ id, createdAt, updatedAt }) => ({
    url: `${SITE_DOMAIN}/blog/${id}`,
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
    url: `${SITE_DOMAIN}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...parsedProducts, ...parsedCategories, ...parsedPosts];
}

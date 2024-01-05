import { getAllCategories, getCategoryByPath } from '@/shared/api/categoryApi';
import React from 'react';

export function generateStaticParams() {
  const categories = getAllCategories();

  return categories
    .map((category) => ({
      category: category.path,
    }))
    .concat({ category: 'products' });
}

export const dynamicParams = false;

export default function CatalogPage({
  params,
}: {
  params: { category: string };
}) {
  const category = getCategoryByPath(params.category);

  console.log(params);

  return (
    <div className='text-2xl font-bold text-red-900'>{category?.name} page</div>
  );
}

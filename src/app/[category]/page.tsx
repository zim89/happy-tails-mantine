import { getAllCategories, getCategoryByPath } from '@/shared/api/categoryApi';
import React from 'react';

import Overview from './components/Overview';
import { MDXRemote } from 'next-mdx-remote/rsc';

export function generateStaticParams() {
  const categories = getAllCategories();

  return categories.map((category) => ({
    category: category.path,
  }));
}

export const dynamicParams = false;

export default function CatalogPage({
  params,
}: {
  params: { category: string };
}) {
  const category = getCategoryByPath(params.category);

  return (
    <div className='container text-center'>
      <h2 className='mb-2 text-[1.75rem]/[normal]'>{category?.title}</h2>
      <p className='mx-auto mb-8 font-light md:max-w-[28.625rem] lg:max-w-[35.75rem]'>
        {category?.test_description}
      </p>
      <p className='mb-[6.1875rem] text-center font-light text-brand-grey-700 md:mb-36 md:text-2xl/normal'>
        There are no products in this category yet
      </p>

      <Overview>
        <MDXRemote source={category?.test_overview ?? ''} />
      </Overview>
    </div>
  );
}

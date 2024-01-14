import { getAllCategories, getCategoryByPath } from '@/shared/api/categoryApi';

import { Breadcrumbs } from '@mantine/core';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Overview from './components/Overview';
import Toolbar from './components/Toolbar';

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

  if (!category) return;

  return (
    <div className='pb-6 pt-2 md:pb-9 md:pt-4 lg:pb-12'>
      <div className='container text-center'>
        {/* TODO: Move this to separate component */}
        <Breadcrumbs
          classNames={{
            root: '[--bc-separator-margin:2px] text-xs/normal mb-4 md:max-lg:mb-3 lg:text-sm/normal',
            separator: 'text-secondary text-xs/normal',
          }}
        >
          <Link href='/'>Home</Link>
          <span className='text-brand-grey-600'>{category?.name}</span>
        </Breadcrumbs>
        <h2 className='mb-2 text-[1.75rem]/[normal] lg:text-4xl/[normal]'>
          {category?.title}
        </h2>
        <p className='\ mx-auto mb-8 font-light md:max-w-[28.625rem] lg:max-w-[35.75rem]'>
          {category?.test_description}
        </p>

        <Toolbar category={category} />

        <p className='mb-[6.1875rem] mt-8 text-center font-light text-brand-grey-700 md:mb-36 md:text-2xl/normal'>
          There are no products in this category yet
        </p>
        <Overview>
          <MDXRemote source={category?.test_overview ?? ''} />
        </Overview>
      </div>
    </div>
  );
}

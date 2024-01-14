import { getAllCategories, getCategoryByPath } from '@/shared/api/categoryApi';

import { Breadcrumbs } from '@mantine/core';
import { Plus } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Overview from './components/Overview';
import SortBy, { type Option } from './components/SortBy/SortBy';

export function generateStaticParams() {
  const categories = getAllCategories();

  return categories.map((category) => ({
    category: category.path,
  }));
}

export const dynamicParams = false;

const sortOptions: Option[] = [
  { title: 'Featured', value: 'featured' },
  { title: 'Price, Low to High', value: 'price-asc' },
  { title: 'Price, High to Low', value: 'price-des' },
  { title: 'Alphabetically, A - Z', value: 'name-asc' },
  { title: 'Alphabetically, Z - A', value: 'name-des' },
];

export default function CatalogPage({
  params,
}: {
  params: { category: string };
}) {
  const category = getCategoryByPath(params.category);

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

        {/* TODO: Move toolbar to separate component */}
        <div className='mb-4 flex items-center text-sm/4 md:py-2 md:text-base'>
          {/* TODO: Move button to separate component */}
          <button className='flex h-[2.375rem] w-full items-center justify-center gap-2 rounded-sm border border-brand-grey-300 bg-brand-grey-300 px-[1.125rem] font-bold md:mr-6 md:max-w-[10rem] lg:mr-12'>
            Filter
            <Plus width={16} height={16} />
          </button>

          <p className='hidden md:block'>{category?.productCount} Results</p>
          <SortBy options={sortOptions} />
        </div>

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

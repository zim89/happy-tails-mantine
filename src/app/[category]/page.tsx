import { getAllCategories, getCategoryByPath } from '@/shared/api/categoryApi';
import React from 'react';

import Overview from './components/Overview';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Breadcrumbs } from '@mantine/core';
import Link from 'next/link';
import { ChevronDown, Plus } from 'lucide-react';

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
    <div className='pb-6 pt-2 md:pb-9 md:pt-4 lg:pb-12'>
      <div className='container text-center'>
        {/* TODO: Move this to separate component */}
        <Breadcrumbs
          classNames={{
            root: '[--bc-separator-margin:2px] text-xs/normal mb-4 lg:text-sm/normal',
            separator: 'text-secondary text-xs/normal',
          }}
        >
          <Link href='/'>Home</Link>
          <span className='text-brand-grey-600'>{category?.name}</span>
        </Breadcrumbs>
        <h2 className='mb-2 text-[1.75rem]/[normal]'>{category?.title}</h2>
        <p className='mx-auto mb-8 font-light md:max-w-[28.625rem] lg:max-w-[35.75rem]'>
          {category?.test_description}
        </p>

        {/* TODO: Move toolbar to separate component */}
        <div className='mb-4 flex items-center text-sm/4 md:py-2 lg:text-base'>
          {/* TODO: Move button to separate component */}
          <button className='flex h-[2.375rem] w-full items-center justify-center gap-2 rounded-sm border border-brand-grey-300 bg-brand-grey-300 px-[1.125rem] font-bold md:mr-6 md:max-w-[10rem] lg:mr-12'>
            Filter
            <Plus width={16} height={16} />
          </button>

          <p className='hidden md:block'>{category?.productCount} Results</p>

          {/* TODO: Move button to separate component */}
          <button className='ml-4 flex h-[2.375rem] w-full flex-col flex-nowrap items-center justify-center rounded-sm border border-brand-grey-300 bg-transparent px-[1.125rem] md:ml-auto md:w-fit md:flex-row md:border-none md:p-0'>
            <span className='text-left'>
              Sort by
              <br className='md:hidden' />
              <span className='text-[0.625rem] md:ml-2 md:text-[length:inherit] md:font-bold'>
                Featured
              </span>
            </span>
            <ChevronDown width={16} height={16} className='ml-2' />
          </button>
        </div>

        <p className='mb-[6.1875rem] text-center font-light text-brand-grey-700 md:mb-36 md:text-2xl/normal'>
          There are no products in this category yet
        </p>
        <Overview>
          <MDXRemote source={category?.test_overview ?? ''} />
        </Overview>
      </div>
    </div>
  );
}

import { MDXRemote } from 'next-mdx-remote/rsc';

import Toolbar from '@/modules/Toolbar';
import { getAllCategories } from '@/shared/api/categoryApi';

import Overview from './components/Overview';
import ProductList from './components/ProductList';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateStaticParams() {
  const { content: categories } = await getAllCategories();

  return categories.map((category) => ({
    category: category.path,
  }));
}

export const dynamicParams = false;

export default async function CatalogPage({
  params,
}: {
  params: { category: string };
}) {
  const { content: categories } = await getAllCategories();

  const category = categories.find(
    (cat) => cat.path === decodeURIComponent(params.category)
  );

  if (!category) notFound();

  return (
    <div className='pb-6 pt-2 md:pb-9 md:pt-4 lg:pb-12'>
      <div className='container text-center'>
        <Breadcrumbs
          crumbs={[{ href: '/', text: 'Home' }, { text: category.name }]}
        />
        <h2 className='mb-2 text-[1.75rem]/[normal] lg:text-4xl/[normal]'>
          {category.title}
        </h2>
        <p className='mx-auto mb-8 font-light md:max-w-[28.625rem] lg:max-w-[35.75rem]'>
          {category.description}
        </p>
        <Toolbar category={category} categories={categories} />
        <ProductList category={category} />
        <Overview>
          <MDXRemote source={category.overview.replace(/\\n/g, '\n')} />
        </Overview>
      </div>
    </div>
  );
}

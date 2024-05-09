import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import ProductCountContextProvider from '@/modules/CatalogProductList/ProductCountContext';
import ProductList from '@/modules/CatalogProductList';
import Breadcrumbs from '@/components/Breadcrumbs';
import Toolbar from '@/modules/Toolbar';
import Overview from '@/components/Overview';

import { categoriesDesc } from './lib/seo';
import { getAllCategories } from '@/shared/lib/requests';
import { Category } from '@/shared/types/types';

type Props = {
  params: { category: string };
};

// It's cached to avoid repetitions of requests
let cachedCategories: Category[] = [];

async function memoizedGetAllCategories() {
  if (!cachedCategories.length) {
    cachedCategories = await getAllCategories();
  }
  return cachedCategories;
}

export async function generateStaticParams() {
  const categories = await memoizedGetAllCategories();

  return categories.map((category) => ({
    category: category.name.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: Props) {
  try {
    const categories = await memoizedGetAllCategories();

    const found = categories.find(
      (cat) => cat.name.toLowerCase() === decodeURIComponent(params.category)
    );

    const category = found && categoriesDesc[found.name];

    if (!category) {
      return notFound();
    }

    return {
      title: category.title,
      description: category.description,
    };
  } catch (err) {
    console.error(err);
  }
}

export const dynamicParams = false;

export default async function CatalogPage({ params }: Props) {
  const categories = await getAllCategories();

  // Used category.name because in product there is only a name of a category, not its path
  // It's used for breadcrumbs' links in product details page
  const category = categories.find(
    (cat) => cat.name.toLowerCase() === decodeURIComponent(params.category)
  );

  if (!category) notFound();

  return (
    <>
      <div className='pb-6 pt-2 md:pb-9 md:pt-4 lg:pb-12'>
        <div className='container text-center'>
          <Breadcrumbs
            crumbs={[{ href: '/', text: 'Home' }, { text: category.name }]}
            classNames={{
              root: "p-0 pt-2"
            }}
          />
          <h2 className='mb-2 text-[1.75rem]/[normal] lg:text-4xl/[normal]'>
            {category.title}
          </h2>
          <p className='mx-auto mb-8 font-light md:max-w-[28.625rem] lg:max-w-[35.75rem]'>
            {category.description}
          </p>
          <ProductCountContextProvider>
            <Toolbar category={category} categories={categories} />
            <ProductList category={category} />
          </ProductCountContextProvider>
          <Overview>
            <MDXRemote source={category.overview.replace(/\\n/g, '\n')} />
          </Overview>
        </div>
      </div>
    </>
  );
}

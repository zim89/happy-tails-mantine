import { MDXRemote } from 'next-mdx-remote/rsc';

import ProductCountContextProvider from '@/modules/CatalogProductList/ProductCountContext';
import ProductList from '@/modules/CatalogProductList';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Overview from '@/components/Overview';
import Toolbar from '@/modules/Toolbar';
import { BackendResponse, Product } from '@/shared/types/types';
import { getAllCategories } from '@/shared/lib/requests';
import { API_URL } from '@/shared/constants/env.const';
import { category } from './lib/data';

export default async function AllProducts() {
  const categories = await getAllCategories();
  const { totalElements } = (await fetch(API_URL + '/products?size=1').then(
    (res) => res.json()
  )) as BackendResponse<Product>;

  category.productCount = totalElements;

  return (
    <>
      <div className='pb-6 pt-2 md:pb-9 md:pt-4 lg:pb-12'>
        <div className='container text-center'>
          <Breadcrumbs
            crumbs={[{ href: '/', text: 'Home' }, { text: 'All Products' }]}
            classNames={{ root: 'p-0 pt-2' }}
          />
          <h2 className='mb-2 text-[1.75rem]/[normal] lg:text-4xl/[normal]'>
            Premium Dog Products
          </h2>
          <p className='mx-auto mb-8 font-light md:max-w-[28.625rem] lg:max-w-[35.75rem]'>
            We understand that your furry friend deserves nothing but the best.
            Discover a delightful array of high-quality products designed to
            enhance your dog&apos;s comfort, happiness, and well-being
          </p>
          <ProductCountContextProvider>
            <Toolbar category={category} categories={categories} />
            <ProductList />
          </ProductCountContextProvider>
          <Overview>
            <MDXRemote source={category.overview.replace(/\\n/g, '\n')} />
          </Overview>
        </div>
      </div>
    </>
  );
}

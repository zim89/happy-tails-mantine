'use client';

import { Category } from '@/shared/api/categoryApi';
import RawProductList from '@/modules/ProductList';
import { useFindAllQuery } from '@/shared/api/productApi';

export default function ProductList({ category }: { category: Category }) {
  const { data, error, isLoading } = useFindAllQuery({ page: 0, limit: 10 });

  if (isLoading)
    return (
      <div>
        <p className='mb-[6.1875rem] mt-8 text-center font-light text-brand-grey-700 md:mb-36 md:text-2xl/normal'>
          Loading...
        </p>
      </div>
    );

  if (error)
    return (
      <div>
        <p className='mb-[6.1875rem] mt-8 text-center font-light text-brand-grey-700 md:mb-36 md:text-2xl/normal'>
          Something went wrong...
        </p>
      </div>
    );

  return (
    <div>
      {category.productCount ? (
        <div className='mb-12 mt-4 md:mb-16 md:max-lg:mt-6 lg:mb-[4.5rem]'>
          <RawProductList data={data.content} />
        </div>
      ) : (
        <p className='mb-[6.1875rem] mt-8 text-center font-light text-brand-grey-700 md:mb-36 md:text-2xl/normal'>
          There are no products in this category yet
        </p>
      )}
    </div>
  );
}
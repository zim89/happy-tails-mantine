'use client';

import { useFindBestSellersQuery } from '@/shared/api/productApi';
import ProductSlider from '../ProductDetails/ui/ProductSlider';

export default function BestSellers() {
  const { data } = useFindBestSellersQuery();

  if (!data) return null;

  return (
    <section className='pt-12 md:pt-16 lg:pt-[5.5rem]'>
      <h2 className='mb-6 text-center text-[1.75rem] uppercase md:mb-9 lg:text-4xl'>
        Our Bestseller
      </h2>

      <ProductSlider
        alt
        data={data.content}
        className='relative max-md:left-1/2 max-md:right-1/2 max-md:-ml-[50vw] max-md:-mr-[50vw] max-md:!w-screen max-md:!max-w-full max-md:!p-0'
      />
    </section>
  );
}

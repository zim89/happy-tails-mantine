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

      <ProductSlider alt data={data.content} />
    </section>
  );
}

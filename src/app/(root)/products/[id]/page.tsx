'use client';
import { Container, Loader } from '@mantine/core';
import { productApi } from '@/shared/api/productApi';
import ProductDetails from '@/modules/ProductDetails';
import Script from 'next/script';
import { availabilityMap } from '@/shared/lib/helpers';

type Props = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: Props) {
  const { data, isError, isLoading, error } = productApi.useFindOneQuery(
    params.id
  );

  if (isLoading || !data)
    return (
      <div className='flex h-[calc(100vh-73px)] items-center justify-center lg:h-[calc(100vh-83px)] '>
        <Loader color='orange' />
      </div>
    );

  if (isError)
    return (
      <section className='section'>
        <Container>
          <h2 className='text-center text-2xl font-bold text-brand-red-700'>
            Something went wrong!
          </h2>
          <p>Need to type error.data</p>
        </Container>
      </section>
    );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.name,
    image: data.imagePath,
    description: data.description,
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: data.price,
        priceCurrency: 'USD',
      },
    },
    availability: availabilityMap[data.productType || 'OUT OF STOCK'],
  };

  return (
    <>
      <Script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {data && <ProductDetails product={data} />}
    </>
  );
}

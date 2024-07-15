'use client';

import dynamic from 'next/dynamic';
import { Container, Loader } from '@mantine/core';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import { useFindOneQuery } from '@/shared/api/productApi';
import { availabilityMap } from '@/shared/lib/helpers';

const ProductDetails = dynamic(() => import('@/modules/ProductDetails'));

type Props = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: Props) {
  const { data, isError, isLoading } = useFindOneQuery(params.id);

  if (isLoading)
    return (
      <div className='flex h-[calc(100vh-73px)] items-center justify-center lg:h-[calc(100vh-83px)] '>
        <Loader color='orange' />
      </div>
    );

  if (!data) notFound();

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
    image: data.imagePath || '',
    description: data.description,
    offers: {
      '@type': 'Offer',
      availability: availabilityMap[data.productStatus || 'OUT OF STOCK'],
      url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/products/${data.id}`,
      category: data.categoryName,
      itemCondition: 'https://schema.org/NewCondition',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: data.price,
        priceCurrency: 'USD',
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'US',
        returnPolicyCategory:
          'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        businessDays: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'https://schema.org/Monday',
            'https://schema.org/Tuesday',
            'https://schema.org/Wednesday',
            'https://schema.org/Thursday',
            'https://schema.org/Friday',
          ],
        },
        shippingRate: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          minValue: 0,
          maxValue: 30,
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'd',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 3,
            maxValue: 10,
            unitCode: 'd',
          },
        },
      },
    },
  };

  return (
    <>
      <Script
        id='product-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {data && <ProductDetails product={data} />}
    </>
  );
}

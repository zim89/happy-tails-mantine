'use client';
import { Container, Loader } from '@mantine/core';
import { productApi } from '@/shared/api/productApi';
import ProductDetails from '@/modules/ProductDetails';

export default function ProductPage({ params }: { params: { id: string } }) {
  const { data, isError, isLoading, error } = productApi.useFindOneQuery(
    params.id
  );

  return (
    <>
      {isLoading && (
        <section className='section'>
          <Container>
            <Loader color='orange' />
          </Container>
        </section>
      )}

      {isError && (
        <section className='section'>
          <Container>
            <h2 className='text-center text-2xl font-bold text-brand-red-700'>
              Something went wrong!
            </h2>
            <p>Need to type error.data</p>
          </Container>
        </section>
      )}

      {!isLoading && !isError && data && <ProductDetails product={data} />}
    </>
  );
}

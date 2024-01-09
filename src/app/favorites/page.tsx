import React from 'react';
import { Container } from '@mantine/core';
import ProductList from '@/modules/ProductList';

export default function FavoritesPage() {
  return (
    <section className='section'>
      <Container>
        <h2 className='mb-6 text-center text-2xl font-bold text-red-900'>
          FavoritesPage
        </h2>
        <ProductList />
      </Container>
    </section>
  );
}

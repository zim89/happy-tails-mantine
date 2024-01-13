'use client';
import React from 'react';
import { Container } from '@mantine/core';

import ProductList from '@/modules/ProductList';
import { useAppSelector } from '@/shared/redux/store';
import { selectFavorites } from '@/shared/redux/favorites/favoritesSlice';

export default function FavoritesPage() {
  const favorites = useAppSelector(selectFavorites);

  return (
    <section className='section'>
      <Container>
        <h2 className='mb-6 text-center text-2xl font-bold text-red-900'>
          FavoritesPage
        </h2>

        {favorites.length === 0 && (
          <p className='text-xl leading-normal'>Your favorites list is empty</p>
        )}

        {favorites.length > 0 && <ProductList data={favorites} />}
      </Container>
    </section>
  );
}

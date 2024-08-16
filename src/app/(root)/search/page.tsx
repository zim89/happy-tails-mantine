'use client';

import React, { useEffect, useState } from 'react';
import { Container } from '@mantine/core';

import ProductCountContextProvider from '@/modules/CatalogProductList/ProductCountContext';
import CatalogProductList from '@/modules/CatalogProductList';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Toolbar from '@/modules/Toolbar';
import { CATEGORY } from '@/shared/lib/constants';
import SearchForm from '@/modules/SearchForm';
import { Category } from '@/shared/types/types';
import { getAllCategories } from '@/shared/lib/requests';

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      const categories = await getAllCategories();
      setCategories(categories);
    })();
  }, []);

  return (
    <Container>
      <div className='pb-12 pt-2 md:pb-16 md:pt-4 lg:pb-[72px]'>
        <Breadcrumbs
          crumbs={[{ href: '/', text: 'Home' }, { text: 'Search' }]}
        />

        <SearchForm />

        <ProductCountContextProvider>
          <Toolbar category={CATEGORY} categories={categories} />
          <CatalogProductList />
        </ProductCountContextProvider>
      </div>
    </Container>
  );
}

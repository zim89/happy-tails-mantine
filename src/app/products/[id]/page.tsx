'use client';
import React from 'react';
import ProductDetails from '@/modules/Product';
import { productApi } from '@/shared/api/productApi';

export default function ProductPage({ params }: { params: { id: string } }) {
  const { data, error, isLoading } = productApi.useFindOneQuery(params.id);

  return <>{!isLoading && <ProductDetails product={data} />}</>;
}

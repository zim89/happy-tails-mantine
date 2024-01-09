import React from 'react';
import ProductCard from '@/modules/ProductList/ui/ProductCard';
import { products } from './lib/data';

export default function ProductList() {
  return (
    <ul className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6'>
      {products.map((item, index) => (
        <li key={index}>
          <ProductCard product={item} />
        </li>
      ))}
    </ul>
  );
}

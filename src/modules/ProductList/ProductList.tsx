import React from 'react';

import ProductCard from './ui/ProductCard';

interface Props {
  data: any[];
}

export default function ProductList({ data }: Props) {
  return (
    <ul className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6'>
      {data.map((product, index) => (
        <li key={index}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

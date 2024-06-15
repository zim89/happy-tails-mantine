'use client';

import { cn } from '@/shared/lib/utils';
import { UnstyledButton } from '@mantine/core';
import { useState } from 'react';
import BestProductsTable from '../BestProductsTable';
import { useFindManyQuery } from '@/shared/api/productApi';
import Loader from '@/components/Loader';

const factor = () => Math.floor(Math.random() * 10000) + 1000;

const data = () => [
  { title: 'Clothing', value: factor(), color: '#328C41' },
  { title: 'Toys', value: factor(), color: '#161616' },
  { title: 'Care', value: factor(), color: '#4285F4' },
];

export default function TopCategories() {
  const [rating, setRating] = useState(data());
  const {
    data: products,
    error,
    isLoading,
  } = useFindManyQuery({
    limit: 5,
    page: 0,
  });

  if (isLoading) return <Loader size={64} />;
  if (error)
    return (
      <p>
        {
          "Whoops, it shouldn't have happened, our experts are already fixing this"
        }
      </p>
    );

  return (
    <div className='flex gap-6'>
      <BestProductsTable data={products?.content || []} />
      <div className='max-w-min rounded border border-[#EEE] bg-[#FDFDFD]'>
        <div className='flex items-center justify-between rounded bg-white p-4'>
          <h2 className='text-xl font-bold'>Top Selling Categories</h2>
          <UnstyledButton
            title='For testing purposes'
            onClick={() => setRating(data())}
          >
            Shuffle
          </UnstyledButton>
        </div>
        <div className='px-16 py-5'>
          <div
            className={cn(
              'grid w-[292px] grid-flow-row',
              rating.length > 1 ? 'w-[292px]' : 'max-w-min'
            )}
          >
            {rating
              .sort((a, b) => (a.value > b.value ? -1 : 1))
              .map((cat, index, cats) => (
                <div
                  key={index}
                  className='flex items-center justify-center rounded-full text-center text-white'
                  style={{
                    backgroundColor: cat.color,
                    justifySelf: index % 2 === 0 ? 'start' : 'end',
                    marginTop: index > 0 ? '-35%' : 0,
                    width: (160 + (cat.value * 100) / cats[0].value) * 0.8,
                    height: (160 + (cat.value * 100) / cats[0].value) * 0.8,
                  }}
                >
                  <p>
                    <span className='block text-sm opacity-80'>
                      {cat.title}
                    </span>
                    <span className='block text-2xl'>
                      {cat.value.toLocaleString('de-DE')}
                    </span>
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

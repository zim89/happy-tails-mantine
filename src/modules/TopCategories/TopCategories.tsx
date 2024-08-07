'use client';

import { MessageCircleWarning } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { useTopCategoriesQuery } from '@/shared/api/dashboardApi';
import BestProducts from '../BestProducts/BestProducts';
import { COLOR_MAP } from './lib/data';
import { CircleChartSkeleton } from './components/Skeleton';
import { SkeletonError } from './components/SkeletonError';

export default function TopCategories() {
  const { data, isLoading, error } = useTopCategoriesQuery();

  if (error)
    return (
      <div className='flex gap-6'>
        <BestProducts />
        <SkeletonError />
      </div>
    );

  if (isLoading || !data)
    return (
      <div className='flex gap-6'>
        <BestProducts />
        <CircleChartSkeleton />
      </div>
    );

  return (
    <div className='flex gap-6'>
      <BestProducts />
      <div className='max-w-min rounded border border-brand-grey-300 bg-primary'>
        <div className='rounded bg-white p-4'>
          <h2 className='text-xl font-bold'>Top Selling Categories</h2>
        </div>
        <div className='px-16 py-5'>
          <div className={cn('grid w-[292px] grid-flow-row')}>
            {!!data.length ? (
              data.map((cat, index, cats) => (
                <div
                  key={index}
                  className='flex items-center justify-center rounded-full text-center text-white'
                  style={{
                    backgroundColor: COLOR_MAP[cat.categoryName],
                    justifySelf: index % 2 === 0 ? 'start' : 'end',
                    marginTop: index > 0 ? '-35%' : 0,
                    width:
                      (160 + (cat.salesCount * 100) / cats[0].salesCount) * 0.8,
                    height:
                      (160 + (cat.salesCount * 100) / cats[0].salesCount) * 0.8,
                  }}
                >
                  <p>
                    <span className='block text-sm opacity-80'>
                      {cat.categoryName}
                    </span>
                    <span className='block text-2xl'>
                      {cat.salesCount.toLocaleString('de-DE')}
                    </span>
                  </p>
                </div>
              ))
            ) : (
              <div className='mt-10'>
                <MessageCircleWarning
                  className='text-brand-grey-500'
                  size={84}
                />
                <p className='mt-4 text-lg/[1.4] font-semibold tracking-wide text-brand-grey-900'>
                  {"Users haven't made any orders to calculate top selling"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

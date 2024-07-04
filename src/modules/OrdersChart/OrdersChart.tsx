'use client';

import { useState } from 'react';
import { MultiSelect } from '@mantine/core';
import { ChevronDown } from 'lucide-react';

import { COLORS, summarizeOrderStatuses } from './lib/data';
import DonutChart from '@/components/DonutChart';
import Table from './components/Table';
import { useFindManyQuery } from '@/shared/api/ordersApi';
import { SkeletonLoader } from './components/Skeleton';

export default function OrdersChart() {
  const {
    data: orders,
    error,
    isLoading,
  } = useFindManyQuery({
    page: 0,
    limit: 10000000,
  });

  const [selected, setSelected] = useState<string[]>(['NEW']);

  if (isLoading) return <SkeletonLoader />;

  if (error)
    return (
      <p>
        {
          "Whoops, it shouldn't have happened, our experts are already fixing this"
        }
      </p>
    );

  const summarizedOrders = summarizeOrderStatuses(orders?.content || []);

  return (
    <div className='flex gap-6'>
      <div className='max-w-min overflow-hidden rounded border border-brand-grey-300 bg-primary'>
        <div className='flex items-center justify-between border-b border-b-brand-grey-300 bg-white p-4'>
          <h2 className='text-xl font-bold'>Orders Reports</h2>
          <MultiSelect
            value={selected}
            placeholder={
              selected.length === summarizedOrders.length
                ? 'View All'
                : selected.join(',')
            }
            data={summarizedOrders.map((item) => item.name)}
            classNames={{
              root: 'max-w-[105px] w-full',
              input: 'font-lato text-xs bg-primary text-[#B4B4B4]',
              pillsList: 'whitespace-nowrap overflow-hidden text-ellipsis',
              pill: 'hidden',
            }}
            rightSection={<ChevronDown size={20} />}
            onChange={(values) =>
              // Prevent to uncheck all options (at least one should be active)
              setSelected((prev) => (values.length === 0 ? prev : values))
            }
          />
        </div>
        <DonutChart
          data={summarizedOrders.filter((item) => selected.includes(item.name))}
          colors={COLORS}
          width={314}
          height={325}
        />
      </div>
      <Table data={orders?.content || []} />
    </div>
  );
}

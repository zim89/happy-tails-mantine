'use client';

import { useState } from 'react';
import { MultiSelect } from '@mantine/core';
import { ChevronDown } from 'lucide-react';

import { COLORS, data } from './lib/data';
import DonutChart from '@/components/DonutChart';
import Table from './components/Table';
import { useFindManyQuery } from '@/shared/api/ordersApi';
import Loader from '@/components/Loader';

export default function OrdersChart() {
  const {
    data: orders,
    error,
    isLoading,
  } = useFindManyQuery({
    page: 0,
    limit: 6,
  });

  const [selected, setSelected] = useState<string[]>([
    'New',
    'Completed',
    'In progress',
  ]);

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
      <div className='max-w-min overflow-hidden rounded border border-brand-grey-300 bg-primary'>
        <div className='flex items-center justify-between border-b border-b-brand-grey-300 bg-white p-4'>
          <h2 className='text-xl font-bold'>Orders Reports</h2>
          <MultiSelect
            value={selected}
            placeholder={
              selected.length === 3 ? 'View All' : selected.join(',')
            }
            data={data.map((item) => item.name)}
            classNames={{
              root: 'max-w-[105px] w-full',
              input: 'font-lato text-xs bg-[#FDFDFD] text-[#B4B4B4]',
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
          data={data.filter((item) => selected.includes(item.name))}
          colors={{
            New: COLORS.New,
            Completed: COLORS.Completed,
            'In progress': COLORS['In progress'],
          }}
          width={314}
          height={325}
        />
      </div>
      <Table data={orders?.content || []} />
    </div>
  );
}

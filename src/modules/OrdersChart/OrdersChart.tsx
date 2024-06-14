'use client';

import { useState } from 'react';
import { MultiSelect } from '@mantine/core';

import { COLORS, data } from './lib/data';
import DonutChart from '@/components/DonutChart';
import { ChevronDown } from 'lucide-react';

export default function OrdersChart() {
  const [selected, setSelected] = useState<string[]>([
    'New',
    'Completed',
    'In progress',
  ]);

  return (
    <div className='max-w-min rounded rounded-b border border-[#EEE] bg-[#FDFDFD]'>
      <div className='flex items-center justify-between border-b border-b-[#EEE] bg-white p-4'>
        <h2 className='  text-xl font-bold'>Orders Reports</h2>
        <MultiSelect
          value={selected}
          placeholder={selected.length === 3 ? 'View All' : selected.join(',')}
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
  );
}

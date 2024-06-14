import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart as NativeBarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
} from 'recharts';
import { Select } from '@mantine/core';

import { monthlyData, reversedMonthMap } from './lib/mock';
import { convertMeasurement, getCurrentMonth } from '@/shared/lib/helpers';
import { useMediaQuery } from '@mantine/hooks';

export default function BarChart() {
  const [barChartType, setBarChartType] = useState('Year');
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const matches = useMediaQuery('(min-width: 768px)');

  return (
    <div className='overflow-hidden rounded border border-[#EEE] bg-[#FDFDFD]'>
      <div className='mb-[18px] flex justify-between bg-white p-4'>
        <h2 className=' text-xl font-bold'>Sales Details</h2>
        <div className='flex gap-3'>
          <Select
            defaultValue='Year'
            value={barChartType}
            onChange={(value) => value && setBarChartType(value)}
            data={['Year', 'Month']}
            classNames={{
              root: 'max-w-[100px] w-full',
              input: 'font-lato text-xs bg-[#FDFDFD] text-[#B4B4B4]',
            }}
            rightSection={<ChevronDown size={20} />}
          />
          {barChartType === 'Month' && (
            <Select
              defaultValue='January'
              value={selectedMonth}
              onChange={(value) => value && setSelectedMonth(value)}
              data={[
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ]}
              classNames={{
                root: 'max-w-[100px] w-full',
                input: 'font-lato text-xs bg-[#FDFDFD] text-[#B4B4B4]',
              }}
              rightSection={<ChevronDown size={20} />}
            />
          )}
        </div>
      </div>
      <ResponsiveContainer width='100%' height={367} className='py-2'>
        <NativeBarChart
          width={500}
          height={367}
          data={
            barChartType === 'Year'
              ? monthlyData
              : monthlyData[reversedMonthMap[selectedMonth]].days
          }
          barSize={62}
          barGap={20}
        >
          <XAxis
            dataKey={barChartType === 'Year' ? 'name' : 'label'}
            scale='point'
            tickMargin={8}
            padding={
              matches ? { left: 40, right: 40 } : { left: 20, right: 20 }
            }
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            dataKey={barChartType === 'Year' ? 'total' : 'revenue'}
            axisLine={false}
            tickLine={false}
            tickMargin={matches ? 15 : 10}
            tickFormatter={(value: number) => {
              return convertMeasurement(value);
            }}
          />
          <Tooltip
            formatter={(value) => {
              return `${value}$`;
            }}
            labelFormatter={(label) => {
              return `Day ${label}`;
            }}
          />
          <CartesianGrid vertical stroke='#EEE' />
          <Bar
            dataKey={barChartType === 'Year' ? 'total' : 'revenue'}
            fill='#4285F4'
          />
        </NativeBarChart>
      </ResponsiveContainer>
    </div>
  );
}

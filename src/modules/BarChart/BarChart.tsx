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

import { monthlyData, reversedMonthMap } from './lib/mock';
import { convertMeasurement } from '@/shared/lib/helpers';
import { Select } from '@mantine/core';

export default function BarChart() {
  const [barChartType, setBarChartType] = useState('Year');
  const [selectedMonth, setSelectedMonth] = useState('January');

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
        >
          <XAxis
            dataKey={barChartType === 'Year' ? 'name' : 'label'}
            scale='point'
            padding={{ left: 40, right: 40 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            dataKey={barChartType === 'Year' ? 'total' : 'revenue'}
            axisLine={false}
            tickLine={false}
            tickMargin={20}
            tickFormatter={(value: number) => {
              return convertMeasurement(value);
            }}
          />
          <Tooltip />
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

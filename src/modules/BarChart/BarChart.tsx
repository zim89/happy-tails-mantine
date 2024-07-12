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
import { useMediaQuery } from '@mantine/hooks';

import { monthMap, reversedMonthMap } from './lib/mock';
import {
  convertMeasurement,
  formatYearFromDate,
  getCurrentMonth,
} from '@/shared/lib/helpers';
import { useFetchSalesQuery } from '@/shared/api/dashboardApi';
import { CustomTooltip } from './components/CustomTooltip';
import { SkeletonLoader } from './components/SkeletonLoader';

export default function BarChart() {
  const [barChartType, setBarChartType] = useState('Year');
  const [selectedMonth, setSelectedMonth] = useState<number>(
    reversedMonthMap[getCurrentMonth().slice(0, 3)]
  );
  const [selectedYear, setSelectedYear] = useState(
    formatYearFromDate(Date.now())
  );
  const matches = useMediaQuery('(min-width: 768px)');

  const { data, isLoading, error } = useFetchSalesQuery({
    year: selectedYear,
    month: barChartType === 'Month' ? selectedMonth : undefined,
  });

  if (error)
    return (
      <p>
        {
          "Whoops, it shouldn't have happened, our experts are already fixing this"
        }
      </p>
    );
  if (isLoading) return <SkeletonLoader />;

  return (
    <div className='overflow-hidden rounded border border-brand-grey-300 bg-primary'>
      <div className='mb-[18px] flex justify-between bg-white p-4'>
        <h2 className=' text-xl font-bold'>Sales Details</h2>
        <div className='flex gap-3'>
          {barChartType === 'Month' && (
            <Select
              value={monthMap[selectedMonth]}
              onChange={(value) => {
                return value && setSelectedMonth(reversedMonthMap[value]);
              }}
              data={[
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ]}
              classNames={{
                root: 'max-w-[100px] w-full',
                input: 'font-lato text-xs bg-primary text-brand-grey-500',
              }}
              rightSection={<ChevronDown size={20} />}
            />
          )}

          <Select
            value={selectedYear}
            onChange={(value) => value && setSelectedYear(value)}
            data={[0, 1, 2, 3].map((num) => {
              return String(Number(formatYearFromDate(Date.now())) - num);
            })}
            classNames={{
              root: 'max-w-[100px] w-full',
              input: 'font-lato text-xs bg-primary text-brand-grey-500',
            }}
            rightSection={<ChevronDown size={20} />}
          />

          <Select
            defaultValue='Year'
            value={barChartType}
            onChange={(value) => value && setBarChartType(value)}
            data={['Year', 'Month']}
            classNames={{
              root: 'max-w-[100px] w-full',
              input: 'font-lato text-xs bg-primary text-brand-grey-500',
            }}
            rightSection={<ChevronDown size={20} />}
          />
        </div>
      </div>
      <ResponsiveContainer width='100%' height={367} className='py-2'>
        <NativeBarChart
          width={500}
          height={367}
          data={data}
          barSize={62}
          barGap={20}
        >
          <XAxis
            dataKey={barChartType === 'Year' ? 'month' : 'date'}
            scale='point'
            tickMargin={8}
            tickFormatter={(value: number) => {
              return barChartType === 'Year' ? monthMap[value] : `${value}`;
            }}
            padding={{ left: 40, right: 40 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            dataKey='totalSales'
            axisLine={false}
            tickLine={false}
            tickMargin={matches ? 15 : 10}
            tickFormatter={(value: number) => {
              return convertMeasurement(value);
            }}
          />
          <Tooltip
            labelStyle={{ fontWeight: 'bold' }}
            formatter={(value) => {
              return `${value}$`;
            }}
            labelFormatter={(label) => {
              return barChartType === 'Year' ? monthMap[label] : label;
            }}
            content={<CustomTooltip kind={barChartType} />}
          />
          {!!data?.length && <CartesianGrid vertical stroke='#EEE' />}
          <Bar dataKey='totalSales' fill='#4285F4' />
        </NativeBarChart>
      </ResponsiveContainer>
    </div>
  );
}

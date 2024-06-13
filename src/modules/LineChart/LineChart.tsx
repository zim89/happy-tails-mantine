'use client';

import Loader from '@/components/Loader';
import { useEffect, useState } from 'react';

import { AggregatedAnalyticsResponse, getAnalytics } from '@/shared/api/seoApi';
import {
  formatDateToDashedOne,
  formatDateWithoutTime,
} from '@/shared/lib/helpers';
import { Filter } from './components/Filter';
import { COLORS, FilterTypes, filtersData } from './lib/data';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function Analitycs() {
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FilterTypes[]>([
    'clicks',
    'impressions',
  ]);
  const [rows, setRows] = useState<
    AggregatedAnalyticsResponse['message']['rows']
  >([]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const res = await getAnalytics({
        startDate: '2024-03-01',
        endDate: formatDateToDashedOne(Date.now()),
        dimensions: ['DATE'],
      });

      setRows(res!.message.rows);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading)
    return (
      <div className='flex justify-center py-10'>
        <Loader size={100} />
      </div>
    );

  const handleFilters = (filter: FilterTypes) => {
    setFilters((prev) =>
      prev.includes(filter)
        ? prev.length <= 1
          ? prev
          : prev.filter((val) => val !== filter)
        : prev.concat(filter)
    );
  };

  let stats = rows.reduce(
    (acc, curr) => {
      return {
        clicks: acc.clicks + curr.clicks,
        impressions: acc.impressions + curr.impressions,
        ctr: acc.ctr,
        position: acc.position + curr.position,
      };
    },
    { clicks: 0, impressions: 0, ctr: 0, position: 0 }
  );

  stats.ctr = (stats.clicks / stats.impressions) * 100;
  stats.position = stats.position / rows.length;

  return (
    <>
      <div className='rounded-sm border border-[#EEE] bg-white'>
        <h2 className='p-4 text-xl font-bold uppercase'>Seo</h2>
        <div className='flex justify-start border-t-2 border-[#EEE] bg-[#FDFDFD]'>
          {filtersData.map((entry) => (
            <Filter
              key={entry.id}
              name={entry.name}
              checked={filters.includes(entry.name)}
              color={entry.color}
              content={stats[entry.name]
                .toFixed(entry.precision)
                .concat(entry.type === 'Percent' ? '%' : '')}
              label={entry.label}
              additionalColor={entry.additionalColor}
              setChecked={handleFilters}
            />
          ))}
        </div>
      </div>
      <div className='flex justify-between border border-b-0 border-[#EEE] bg-[#FDFDFD] px-4 pb-2 pt-4 text-sm capitalize text-[#B4B4B4]'>
        {filters.length <= 2 &&
          filters.map((entry, index) => <div key={index}>{entry}</div>)}
      </div>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart
          width={500}
          height={300}
          data={rows}
          className='rounded-bl rounded-br border border-t-0 border-[#EEE] bg-[#FDFDFD]'
        >
          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey='keys'
            style={{
              fill: '#B4B4B4',
              fontSize: '12px',
            }}
            fontFamily='__Lato_814572'
            tickMargin={8}
            tickFormatter={(value: string) => {
              return formatDateWithoutTime(value);
            }}
            minTickGap={70}
          />
          {filters.length <= 2 &&
            filters.map((filter, index) => {
              return (
                <YAxis
                  key={index}
                  axisLine={false}
                  width={40}
                  tickLine={false}
                  orientation={index === 0 ? 'left' : 'right'}
                  yAxisId={filter}
                  dataKey={filter}
                  style={{
                    fill: '#B4B4B4',
                    fontSize: '12px',
                    paddingRight: '1em',
                  }}
                  fontFamily='__Lato_814572'
                  tickMargin={8}
                  tickCount={4}
                />
              );
            })}
          <CartesianGrid
            vertical={false}
            stroke='#eee'
            strokeDasharray='1000 0'
          />
          <Tooltip contentStyle={{ fontWeight: 'bold' }} />
          {filters.map((filter, index) => (
            <Line
              key={index}
              type='linear'
              dot={false}
              yAxisId={filter}
              dataKey={filter}
              strokeWidth={2}
              stroke={COLORS[filter]}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

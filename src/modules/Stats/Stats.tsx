import { TrendingUp } from 'lucide-react';

import { data } from './lib/data';
import { useStatsQuery } from '@/shared/api/dashboardApi';
import { SkeletonLoader } from './components/SkeletonLoader';

export default function Stats() {
  const { data: values, isLoading, error } = useStatsQuery();

  if (error)
    return (
      <p>
        {
          "Whoops, it shouldn't have happened, our experts are already fixing this"
        }
      </p>
    );
  if (!values || isLoading) return <SkeletonLoader />;

  return (
    <div className='flex gap-2'>
      {data.map((stat, index) => (
        <div
          key={index}
          className='w-full rounded-l bg-white p-4 shadow-[0px_4px_8px_0px_#0000000F,0px_4px_4px_0px_#0000000A]'
        >
          <div className='flex items-center justify-between gap-6'>
            <div>
              <p className='whitespace-nowrap text-lg text-brand-grey-400'>
                {stat.name}
              </p>
              <p className='mt-1 text-[1.75rem] font-bold'>
                {stat.type === 'currency' && '$'}
                {/* Comma separated numbers */}
                {values[stat.property].toLocaleString('en-IN')}
              </p>
            </div>
            <span className='flex h-12 w-12 items-center justify-center rounded-full bg-primary'>
              <stat.icon color='#F39324' size={24} />
            </span>
          </div>
          {values[stat.propertyInWeek] > 0 && (
            <p className='mt-4 flex max-w-max items-center gap-2 rounded-lg bg-brand-green-100 px-2 py-[5px] text-brand-green-400'>
              <TrendingUp strokeWidth='3px' size={16} />
              <span>+{values[stat.propertyInWeek]} this week</span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

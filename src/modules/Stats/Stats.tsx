import { TrendingUp } from 'lucide-react';

import { data } from './lib/mock';

export default function Stats() {
  return (
    <div className='flex gap-2'>
      {data.map((stat, index) => (
        <div
          key={index}
          className='w-full rounded-l bg-white p-4 shadow-[0px_4px_8px_0px_#0000000F,0px_4px_4px_0px_#0000000A]'
        >
          <div className='flex items-center justify-between gap-6'>
            <div>
              <p className='whitespace-nowrap text-lg text-[#787878]'>
                {stat.name}
              </p>
              <p className='mt-1 text-[28px] font-bold'>
                {stat.type === 'currency' && '$'}
                {stat.value.toLocaleString('en-IN')}
              </p>
            </div>
            <span className='flex h-12 w-12 items-center justify-center rounded-full bg-[#FDEFDE]'>
              <stat.icon color='#F39324' size={24} />
            </span>
          </div>
          {stat.todayIncome > 0 && (
            <p className='mt-4 flex max-w-max items-center gap-2 rounded-lg bg-[#EBF5ED] px-2 py-[5px] text-[#389B48]'>
              <TrendingUp strokeWidth='3px' size={16} />
              <span>+{stat.todayIncome} today</span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

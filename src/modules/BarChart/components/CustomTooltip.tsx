import { monthMap } from '../lib/mock';

export const CustomTooltip = ({
  active,
  payload,
  kind,
}: {
  active?: boolean;
  payload?: any;
  kind: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className='border border-brand-grey-400 bg-primary px-4 py-2'>
        <p className='font-black'>{`${kind === 'Month' ? payload[0].payload?.date : monthMap[payload[0].payload?.month]}`}</p>
        <p className='text-brand-orange-500'>{`Total: $${payload[0]?.payload?.totalSales}`}</p>
      </div>
    );
  }

  return null;
};

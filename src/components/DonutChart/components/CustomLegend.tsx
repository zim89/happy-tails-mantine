import { CSSProperties } from 'react';

export type Props = {
  data: {
    name: string;
    color: CSSProperties['color'];
  }[];
};

export const CustomLegend = ({ data }: Props) => {
  return (
    <div
      data-testid='legend-container'
      className='-mt-10 flex flex-wrap justify-center gap-x-4 px-[25px]'
    >
      {data.map(({ name, color }, index) => (
        <CustomLegend.LegendItem key={index} color={color} label={name} />
      ))}
    </div>
  );
};

export type LegendItemProps = {
  label: string;
  color: CSSProperties['color'];
};

export const LegendItem = ({ color, label }: LegendItemProps) => {
  return (
    <p className='flex items-center gap-2 text-xs text-brand-grey-800'>
      <span
        data-testid='legend-item'
        className='inline-block h-4 w-4 rounded'
        style={{ backgroundColor: color }}
      />
      <span data-testid='label'>{label}</span>
    </p>
  );
};

CustomLegend.LegendItem = LegendItem;

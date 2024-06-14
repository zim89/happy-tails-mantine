import { CSSProperties } from 'react';

type Props = {
  data: {
    name: string;
    color: CSSProperties['color'];
  }[];
};
export const CustomLegend = ({ data }: Props) => {
  return (
    <div className='-mt-10 flex flex-wrap justify-center gap-x-4 px-[25px]'>
      {data.map(({ name, color }, index) => (
        <CustomLegend.LegendItem key={index} color={color} label={name} />
      ))}
    </div>
  );
};

type LegendItemProps = {
  label: string;
  color: CSSProperties['color'];
};

const LegendItem = ({ color, label }: LegendItemProps) => {
  return (
    <p className='flex items-center gap-2 text-xs text-[#787878]'>
      <span
        className='inline-block h-4 w-4 rounded'
        style={{ backgroundColor: color }}
      />
      {label}
    </p>
  );
};

CustomLegend.LegendItem = LegendItem;

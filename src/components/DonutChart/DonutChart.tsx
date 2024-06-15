import { Cell, Legend, Pie, PieChart } from 'recharts';
import { CustomLegend } from './components/CustomLegend';
import { CSSProperties } from 'react';
import { convertMeasurement } from '@/shared/lib/helpers';

type Props = {
  width: number;
  height: number;
  data: {
    name: string;
    value: number;
  }[];
  colors: { [P in string]: CSSProperties['color'] };
};
export default function DonutChart({ width, height, data, colors }: Props) {
  return (
    <PieChart width={width} height={height}>
      <Pie
        data={data}
        innerRadius={76}
        outerRadius={96}
        fill='#8884d8'
        dataKey='value'
        cornerRadius={100}
        paddingAngle={-15}
        strokeWidth={0}
      >
        {data.map(({ name }, index) => (
          <Cell key={`cell-${name}-${index}`} fill={colors[name] || 'black'} />
        ))}
      </Pie>
      <text
        x={width / 2}
        y={height / 2 - 17}
        dy={8}
        textAnchor='middle'
        fill='black'
        fontWeight='bold'
        fontSize={28}
      >
        {convertMeasurement(data.reduce((acc, curr) => acc + curr.value, 0))}
      </text>
      <text
        x={width / 2}
        y={height / 2 + 12}
        dy={8}
        textAnchor='middle'
        fill='#787878'
        fontSize={20}
      >
        Total Orders
      </text>
      <Legend
        content={
          <CustomLegend
            data={data.map((item, index) => ({
              name: item.name,
              color: colors[item.name] || 'black',
            }))}
          />
        }
      />
    </PieChart>
  );
}

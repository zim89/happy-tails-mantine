import { describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import DonutChart, { Props } from './DonutChart';
import { TestWrapper } from '../TestWrapper';

const TestDonutChart = (props: Props) => {
  return (
    <TestWrapper>
      <DonutChart {...props} />
    </TestWrapper>
  );
};

describe('DonutChart', () => {
  test('should render', () => {
    const { getByTestId } = render(
      <TestDonutChart data={[]} colors={{ x: 'red' }} height={50} width={50} />
    );
    expect(getByTestId('chart-value')).toBeInTheDocument();
  });

  test('should calculate total orders correctly', () => {
    const data = [
      { name: 'x', value: 10 },
      { name: 'y', value: 20 },
      { name: 'z', value: 30 },
    ];
    const { getByTestId } = render(
      <TestDonutChart
        data={data}
        colors={{ x: 'red' }}
        height={50}
        width={50}
      />
    );
    expect(getByTestId('chart-value')).toHaveTextContent('60');
  });

  test('should render legend colors correctly', () => {
    const data = [
      { name: 'x', value: 10 },
      { name: 'y', value: 20 },
      { name: 'z', value: 30 },
    ];

    const colors: { [P in string]: string } = {
      x: 'rgb(255, 0, 0)',
      y: 'rgb(0, 255, 0)',
      z: 'rgb(0, 0, 255)',
    };

    const { getAllByTestId } = render(
      <TestDonutChart data={data} colors={colors} height={50} width={50} />
    );

    const labels = getAllByTestId('label');

    for (let i = 0; i < labels.length; i++) {
      expect(labels[i]).toHaveTextContent(data[i].name);
      // Select a sibling element which posseses a color
      expect(labels[i].parentElement?.children[0]).toHaveStyle(
        `background-color: ${colors[data[i].name]}`
      );
    }
  });

  test('should render sizing correctly', () => {
    const { getByRole } = render(
      <TestDonutChart
        data={[{ name: 'x', value: 10 }]}
        colors={{ x: 'red' }}
        height={120}
        width={150}
      />
    );

    expect(getByRole('chart-wrapper')).toHaveAttribute('width', '150');
    expect(getByRole('chart-wrapper')).toHaveAttribute('height', '120');
  });
});

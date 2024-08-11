import { test, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import {
  CustomLegend,
  Props as CustomLegendProps,
  LegendItem,
  LegendItemProps,
} from './CustomLegend';
import { TestWrapper } from '@/components/TestWrapper';

const TestCustomLegend = (props: CustomLegendProps) => {
  return (
    <TestWrapper>
      <CustomLegend {...props} />
    </TestWrapper>
  );
};

describe('CustomLegend component ', () => {
  test('renders correctly', () => {
    render(<TestCustomLegend data={[{ color: 'orangered', name: 'Test' }]} />);

    expect(screen.getByTestId('legend-container')).toBeInTheDocument();
  });

  test('renders colors of legend items correctly', () => {
    render(
      <TestCustomLegend
        data={[
          { color: 'rgb(255, 69, 0)', name: 'Test 1' },
          { color: '#00FF00', name: 'Test 2' },
        ]}
      />
    );

    const labels = screen.getAllByTestId('legend-item');
    expect(labels).toHaveLength(2);
    expect(labels[0]).toHaveStyle('background-color: rgb(255, 69, 0)');
    expect(labels[1]).toHaveStyle('background-color: #00FF00');
  });

  test('renders labels of legend items correctly', () => {
    render(
      <TestCustomLegend
        data={[
          { color: 'rgb(255, 69, 0)', name: 'Test 1' },
          { color: '#00FF00', name: 'Test 2' },
        ]}
      />
    );

    const labels = screen.getAllByText(/Test [1-2]/i);
    expect(labels).toHaveLength(2);
    expect(labels[0].textContent).not.toEqual(labels[1].textContent);
  });
});

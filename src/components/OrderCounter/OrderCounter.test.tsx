import { describe, test } from 'vitest';
import { render } from '@testing-library/react';

import { TestWrapper } from '../TestWrapper';
import OrderCounter, { OrderCounterProps } from './';

const TestOrderCounter = (props: OrderCounterProps) => {
  return (
    <TestWrapper>
      <OrderCounter {...props} />
    </TestWrapper>
  );
};

describe('OrderCounter', () => {
  test('should render correctly', () => {
    const { getByTestId } = render(
      <TestOrderCounter
        canceled={1}
        completed={1}
        inProgress={1}
        newOrders={1}
      />
    );
    expect(getByTestId('counter-wrapper')).toBeInTheDocument();
  });

  test('should render numbers correctly', () => {
    const numbers = [
      ['in-progress-count', 2],
      ['completed-count', 7],
      ['canceled-count', 4],
      ['new-orders-count', 10],
    ] as const;

    const { getByTestId } = render(
      <TestOrderCounter
        canceled={numbers[2][1]}
        completed={numbers[1][1]}
        inProgress={numbers[0][1]}
        newOrders={numbers[3][1]}
      />
    );

    for (let [selector, value] of numbers) {
      expect(getByTestId(selector)).toHaveTextContent(`${value}`);
    }
  });

  test('should add a custom CSS class', () => {
    const testClassName = 'bg-orange-400';

    const { getByTestId } = render(
      <TestOrderCounter
        canceled={1}
        completed={1}
        inProgress={1}
        newOrders={1}
        className={testClassName}
      />
    );

    expect(getByTestId('counter-wrapper')).toHaveClass(testClassName);
  });
});

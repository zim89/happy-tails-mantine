import { describe, test } from 'vitest';
import { render } from '@testing-library/react';

import { TestWrapper } from '../TestWrapper';
import NextBtn from './';

const TestNextBtn = () => {
  return (
    <TestWrapper>
      <NextBtn />
    </TestWrapper>
  );
};

describe('PaginationNextBtn', () => {
  test('should render correctly', () => {
    const { getByTestId } = render(<TestNextBtn />);
    expect(getByTestId('next-btn')).toHaveTextContent('Next');
  });
});

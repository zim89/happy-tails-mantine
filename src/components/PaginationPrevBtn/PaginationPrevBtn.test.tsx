import { describe, test } from 'vitest';
import { render } from '@testing-library/react';

import { TestWrapper } from '../TestWrapper';
import PrevBtn from './';

const TestPrevBtn = () => {
  return (
    <TestWrapper>
      <PrevBtn />
    </TestWrapper>
  );
};

describe('PaginationPrevBtn', () => {
  test('should render correctly', () => {
    const { getByTestId } = render(<TestPrevBtn />);
    expect(getByTestId('prev-btn')).toHaveTextContent('Previous');
  });
});

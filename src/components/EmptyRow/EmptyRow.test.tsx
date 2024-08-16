import { describe, test } from 'vitest';
import { render } from '@testing-library/react';

import { TestWrapper } from '../TestWrapper';
import { EmptyRow, Props } from './';

const TestEmptyRow = (props: Props) => {
  return (
    <TestWrapper>
      <EmptyRow {...props} />
    </TestWrapper>
  );
};

describe('EmptyRow', () => {
  test('should render', () => {
    const { getByText } = render(
      <TestEmptyRow visible message='!!Test $$Test## ##Test$$ Test!!' />
    );
    expect(getByText('!!Test $$Test## ##Test$$ Test!!')).toBeInTheDocument();
  });

  test('should not render when visible is false', () => {
    const { queryByText } = render(
      <TestEmptyRow visible={false} message='!!Test $$Test## ##Test$$ Test!!' />
    );
    expect(queryByText('!!Test $$Test## ##Test$$ Test!!')).toBeNull();
  });

  test('should add custom classname', () => {
    const { getByText } = render(
      <TestEmptyRow
        visible
        className='text-3xl'
        message='!!Test $$Test## ##Test$$ Test!!'
      />
    );

    expect(getByText('!!Test $$Test## ##Test$$ Test!!')).toHaveClass(
      'text-3xl'
    );
  });
});

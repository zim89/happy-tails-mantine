import { describe, test } from 'vitest';
import { render } from '@testing-library/react';

import { TestWrapper } from '../TestWrapper';
import Loader, { Props } from './';

const TestLoader = (props: Props) => {
  return (
    <TestWrapper>
      <Loader {...props} />
    </TestWrapper>
  );
};

describe('Loader', () => {
  test('should render', () => {
    const { getByTestId } = render(<TestLoader />);
    expect(getByTestId('loader')).toBeInTheDocument();
  });
});

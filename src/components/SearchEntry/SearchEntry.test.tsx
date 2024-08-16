import { describe, test } from 'vitest';
import { render } from '@testing-library/react';

import { TestWrapper } from '../TestWrapper';
import { Props, SearchEntry } from './';

const TestSearchEntry = (props: Props) => {
  return (
    <TestWrapper>
      <SearchEntry {...props} />
    </TestWrapper>
  );
};

describe('SearchEntry', () => {
  test('should render', () => {
    const { getByTestId } = render(
      <TestSearchEntry handleChange={vi.fn()} value='' />
    );
    expect(getByTestId('search')).toBeInTheDocument();
  });

  test('should render passed in value', () => {
    const { getByTestId } = render(
      <TestSearchEntry handleChange={vi.fn()} value='Test Value' />
    );
    expect(getByTestId('search')).toHaveAttribute('value', 'Test Value');
  });

  test('should a change event handler to be executed correctly', () => {
    const handleChange = vi.fn();
    const { getByTestId } = render(
      <TestSearchEntry handleChange={handleChange} value='' />
    );

    const input = getByTestId('search');
    input.setAttribute('value', 'Test Value');

    input.dispatchEvent(new Event('change', { bubbles: true }));
    expect(handleChange).toBeCalledWith('Test Value');
  });
});

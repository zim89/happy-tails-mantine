import { describe, test } from 'vitest';
import { render } from '@testing-library/react';

import { TestWrapper } from '../TestWrapper';
import { EntriesCount, Props } from './';

const TestEntriesCount = (props: Props) => {
  return (
    <TestWrapper>
      <EntriesCount {...props} />
    </TestWrapper>
  );
};

describe('EntriesCount', () => {
  test('should render the count correctly', () => {
    const currentProp = 5;
    const pageSizeProp = 10;
    const sizeProp = 30;

    const { getByTestId } = render(
      <TestEntriesCount
        current={currentProp}
        pageSize={pageSizeProp}
        size={sizeProp}
      />
    );

    const selection = getByTestId('entries-count');

    expect(selection).toBeInTheDocument();
    expect(selection).toHaveTextContent(
      `Displaying ${currentProp} to ${pageSizeProp} of ${sizeProp} entries`
    );
  });
});

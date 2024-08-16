import { describe, test } from 'vitest';
import { render } from '@testing-library/react';

import { TestWrapper } from '../TestWrapper';
import LayoutTemplate from './';

const TestLayoutTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <TestWrapper>
      <LayoutTemplate>{children}</LayoutTemplate>
    </TestWrapper>
  );
};

describe('LayoutTemplate', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(
      <TestLayoutTemplate>
        <span data-testid='test'>Test</span>
      </TestLayoutTemplate>
    );

    const selection = getByTestId('test');

    expect(selection).toBeInTheDocument();
    expect(selection).toHaveTextContent('Test');
  });
});

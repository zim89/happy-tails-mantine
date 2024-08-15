import { describe, test } from 'vitest';
import { render } from '@testing-library/react';
import * as hooks from '@mantine/hooks';

import { TestWrapper } from '../TestWrapper';
import Overview, { Props } from './Overview';

const TestOverview = (props: Props) => {
  return (
    <TestWrapper>
      <Overview {...props} />
    </TestWrapper>
  );
};

vi.mock('@mantine/hooks', () => ({
  useDisclosure: () => [
    false,
    { close: vi.fn(), open: vi.fn(), toggle: vi.fn() },
  ],
}));

describe('Overview', () => {
  test('should render', () => {
    const { getByTestId } = render(
      <TestOverview>
        <h2>Test</h2>
      </TestOverview>
    );

    expect(getByTestId('overview-container')).toBeInTheDocument();
  });

  test('should render a child component', () => {
    const { getByText } = render(
      <TestOverview>
        <h2>Test</h2>
      </TestOverview>
    );

    expect(getByText('Test')).toBeInTheDocument();
  });

  test("gradient bg should be hidden when it's opened", () => {
    const useDisclosure = vi.spyOn(hooks, 'useDisclosure');
    useDisclosure.mockReturnValue([
      true,
      { close: vi.fn(), open: vi.fn(), toggle: vi.fn() },
    ]);

    const { getByTestId } = render(
      <TestOverview>
        <h2>Test</h2>
      </TestOverview>
    );

    expect(getByTestId('collapsable')).toHaveClass('opacity-0');
  });

  test("when it's opened the button's text content should be 'See less'", () => {
    const useDisclosure = vi.spyOn(hooks, 'useDisclosure');
    useDisclosure.mockReturnValue([
      true,
      { close: vi.fn(), open: vi.fn(), toggle: vi.fn() },
    ]);

    const { getByRole } = render(
      <TestOverview>
        <h2>Test</h2>
      </TestOverview>
    );

    expect(getByRole('button')).toHaveTextContent('See less');
  });

  test("when it's closed the button's text content should be 'Show more'", () => {
    const useDisclosure = vi.spyOn(hooks, 'useDisclosure');
    useDisclosure.mockReturnValue([
      false,
      { close: vi.fn(), open: vi.fn(), toggle: vi.fn() },
    ]);

    const { getByRole } = render(
      <TestOverview>
        <h2>Test</h2>
      </TestOverview>
    );

    expect(getByRole('button')).toHaveTextContent('Show more');
  });
});

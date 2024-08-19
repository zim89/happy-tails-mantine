import { describe, test } from 'vitest';
import { render } from '@testing-library/react';

import { TestWrapper } from '../TestWrapper';
import ModalWindow, { Props } from './';

const TestModalWindow = (props: Props) => {
  return (
    <TestWrapper>
      <ModalWindow {...props} />
    </TestWrapper>
  );
};

describe('ModalWindow', () => {
  test('should render', () => {
    const { getByTestId } = render(
      <TestModalWindow onClose={vi.fn()} opened>
        <></>
      </TestModalWindow>
    );

    const modalWindow = getByTestId('modal-window');
    expect(modalWindow).toBeInTheDocument();
  });

  test("should render it's content when opened", () => {
    const { getByTestId } = render(
      <TestModalWindow onClose={vi.fn()} opened>
        <span data-testid='test'>Test</span>
      </TestModalWindow>
    );

    const selection = getByTestId('test');
    expect(selection).toBeInTheDocument();
    expect(selection).toHaveTextContent('Test');
  });

  test("shouldn't render it's content when closed", () => {
    const { queryByTestId } = render(
      <TestModalWindow onClose={vi.fn()} opened={false}>
        <span data-testid='test'>Test</span>
      </TestModalWindow>
    );

    expect(queryByTestId('test')).toBeNull();
  });
});

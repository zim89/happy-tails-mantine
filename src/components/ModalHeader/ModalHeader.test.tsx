import { describe, test } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import ModalHeader, { Props } from './ModalHeader';
import { TestWrapper } from '../TestWrapper';

const TestModalHeader = (props: Props) => {
  return (
    <TestWrapper>
      <ModalHeader {...props} />
    </TestWrapper>
  );
};

describe('ModalHeader', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(
      <TestModalHeader heading='' handleClose={vi.fn()} />
    );

    expect(getByTestId('close-button')).toBeInTheDocument();
    expect(getByTestId('modal-heading')).toBeInTheDocument();
  });

  test('renders the title correctly', () => {
    const { getByText } = render(
      <TestModalHeader heading='Test Title' handleClose={vi.fn()} />
    );
    expect(getByText('Test Title')).toBeInTheDocument();
  });

  test('handles onClose correctly', () => {
    const handler = vi.fn();

    const { getByTestId } = render(
      <TestModalHeader heading='Test Title' handleClose={handler} />
    );

    fireEvent.click(getByTestId('close-button'));

    expect(handler).toHaveBeenCalled();
  });
});

import { fireEvent, render, waitFor } from '@testing-library/react';
import AddCodeModal from './';
import { TestWrapper } from '@/components/TestWrapper';

describe('AddCodeModal', () => {
  test('should render', () => {
    const { getByTestId } = render(<AddCodeModal />, { wrapper: TestWrapper });

    expect(getByTestId('modal-handler')).toBeInTheDocument();
    expect(getByTestId('modal')).toBeInTheDocument();
  });

  //   test('should reveal a content when the handler is hit', async () => {
  //     const { getByTestId, queryByTestId } = render(<AddCodeModal />, {
  //       wrapper: TestWrapper,
  //     });

  //     const handler = getByTestId('modal-handler');

  //     expect(queryByTestId('modal-form')).toBeNull();

  //     await waitFor(() => {
  //       fireEvent.click(handler);
  //     });

  //     expect(getByTestId('modal-form')).toBeInTheDocument();
  //   });
});

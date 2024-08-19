import { describe, test } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import * as hooks from '@mantine/hooks';

import { TestWrapper } from '@/components/TestWrapper';
import AddCategoryModal from './';

const TestAddCategoryModal = () => {
  return (
    <TestWrapper>
      <AddCategoryModal />
    </TestWrapper>
  );
};

vi.mock('@mantine/hooks', () => ({
  useDisclosure: () => [
    false,
    { close: vi.fn(), open: vi.fn(), toggle: vi.fn() },
  ],
}));

describe('AddCategoryModal', () => {
  test('should render', () => {
    const { getByTestId, queryByTestId } = render(<TestAddCategoryModal />);

    expect(getByTestId('modal-handler')).toBeInTheDocument();
    expect(queryByTestId('modal-form')).toBeNull();
  });

  test('should render its content when its visible', async () => {
    vi.spyOn(hooks, 'useDisclosure').mockReturnValue([
      true,
      { close: vi.fn(), open: vi.fn(), toggle: vi.fn() },
    ]);

    const { getByTestId } = render(<TestAddCategoryModal />);

    expect(getByTestId('modal-form')).toBeInTheDocument();
  });

  test('should trigger close function when the handler is clicked', () => {
    const handler = vi.fn();
    vi.spyOn(hooks, 'useDisclosure').mockReturnValue([
      false,
      { close: vi.fn(), open: handler, toggle: vi.fn() },
    ]);

    const { getByTestId } = render(<TestAddCategoryModal />);

    fireEvent.click(getByTestId('modal-handler'));
    expect(handler).toHaveBeenCalled();
  });

  test('should handle file input change', async () => {
    // Just to open the modal
    vi.spyOn(hooks, 'useDisclosure').mockReturnValue([
      true,
      { close: vi.fn(), open: vi.fn(), toggle: vi.fn() },
    ]);

    const { getByTestId, queryByTestId } = render(<TestAddCategoryModal />);

    // Create a mock file
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    // Get file input element and simulate user selecting a file
    const fileInput = getByTestId('upload-field');
    await waitFor(() =>
      fireEvent.change(fileInput, { target: { files: [file] } })
    );

    // Check if the file input's value or preview has been updated
    // Assuming you have a preview element that shows the file name
    await waitFor(() => {
      const preview = queryByTestId('preview-image');
      expect(preview).not.toBeNull();
    });
  });
});

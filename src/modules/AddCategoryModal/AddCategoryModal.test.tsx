import { Mock, MockInstance, describe, test, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import * as hooks from '@mantine/hooks';

import { TestWrapper } from '@/components/TestWrapper';
import * as api from '@/shared/api/categoryApi';
import AddCategoryModal from './';
import { DEFAULT_CATEGORY_IMAGE } from '@/shared/lib/constants';

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

let testDispatch: Mock;
let testUseDisclosure: MockInstance;

describe('AddCategoryModal', () => {
  beforeEach(() => {
    testDispatch = vi.fn();

    vi.spyOn(api, 'useAddNewCategoryMutation').mockReturnValue([
      testDispatch,
      {
        reset: vi.fn(),
      },
    ]);

    testUseDisclosure = vi
      .spyOn(hooks, 'useDisclosure')
      .mockReturnValue([
        true,
        { close: vi.fn(), open: vi.fn(), toggle: vi.fn() },
      ]);
  });

  afterEach(() => {
    testUseDisclosure.mockReset();
  });

  test('should render', () => {
    testUseDisclosure.mockReturnValue([
      false,
      { close: vi.fn(), open: vi.fn(), toggle: vi.fn() },
    ]);

    const { getByTestId, queryByTestId } = render(<TestAddCategoryModal />);

    expect(getByTestId('modal-handler')).toBeInTheDocument();
    expect(queryByTestId('modal-form')).toBeNull();
  });

  test('should render its content when its visible', async () => {
    const { getByTestId } = render(<TestAddCategoryModal />);

    expect(getByTestId('modal-form')).toBeInTheDocument();
  });

  test('should trigger close function when the handler is clicked', () => {
    const handler = vi.fn();
    testUseDisclosure.mockReturnValue([
      false,
      { close: vi.fn(), open: handler, toggle: vi.fn() },
    ]);

    const { getByTestId } = render(<TestAddCategoryModal />);

    fireEvent.click(getByTestId('modal-handler'));
    expect(handler).toHaveBeenCalled();
  });

  test('should handle file input change', async () => {
    const { getByTestId, getByRole } = render(<TestAddCategoryModal />);

    // Create a mock file
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    // Get file input element and simulate user selecting a file
    let fileInput = getByRole('upload-field', {
      hidden: true,
    }) as HTMLInputElement;
    await user.upload(fileInput, file);

    expect(fileInput.files![0]).toBe(file);
    expect(fileInput.files!.item(0)).toBe(file);
    expect(fileInput.files).toHaveLength(1);

    expect(getByTestId('preview')).toBeInTheDocument();
    expect(getByTestId('preview-name')).toHaveTextContent(file.name);
    expect(getByTestId('preview-image')).toHaveAttribute('src', '/next.svg');
    expect(getByTestId('preview-image')).toHaveAttribute('alt', file.name);
  });

  test('should clear a preview image when user clicks clear button', async () => {
    const { getByTestId, getByRole, queryByTestId } = render(
      <TestAddCategoryModal />
    );

    // Create a mock file
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    // Get file input element and simulate user selecting a file
    let fileInput = getByRole('upload-field', {
      hidden: true,
    }) as HTMLInputElement;
    await user.upload(fileInput, file);

    expect(getByTestId('preview')).toBeInTheDocument();

    const clearButton = getByTestId('clear-image');
    await user.click(clearButton);

    expect(queryByTestId('preview')).toBeNull();
  });

  test('should close the modal when the user clicks on close button', async () => {
    const handler = vi.fn();

    testUseDisclosure.mockImplementationOnce(() => [
      true,
      {
        open: vi.fn(),
        close: handler,
        toggle: vi.fn(),
      },
    ]);

    const { getByTestId, queryByTestId } = render(<TestAddCategoryModal />);

    expect(queryByTestId('modal-form')).not.toBeNull();

    const closeButton = getByTestId('secondary-button');
    await user.click(closeButton);

    expect(handler).toHaveBeenCalled();
  });
});

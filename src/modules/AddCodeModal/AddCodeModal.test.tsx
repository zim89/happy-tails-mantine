import { fireEvent, render, waitFor } from '@testing-library/react';
import { Mock } from 'vitest';
import user from '@testing-library/user-event';

import AddCodeModal from './';
import { TestWrapper } from '@/components/TestWrapper';
import * as api from '@/shared/api/discountApi';

let testDispatch: Mock;

describe('AddCodeModal', () => {
  beforeAll(() => {
    testDispatch = vi.fn();

    vi.spyOn(api, 'useCreateDiscountCodeMutation').mockImplementation(() => [
      testDispatch,
      {
        reset: vi.fn(),
      },
    ]);
  });

  beforeEach(() => {
    testDispatch.mockReset();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  test('should render', () => {
    const { getByTestId } = render(<AddCodeModal />, { wrapper: TestWrapper });

    expect(getByTestId('modal-handler')).toBeInTheDocument();
    expect(getByTestId('modal')).toBeInTheDocument();
  });

  test('should submit the form correctly', async () => {
    const { getByTestId } = render(<AddCodeModal />, { wrapper: TestWrapper });

    await waitFor(() => {
      fireEvent.click(getByTestId('modal-handler'));
    });

    await waitFor(() => {
      fireEvent.click(getByTestId('single-button'));
    });

    expect(testDispatch).not.toHaveBeenCalled();

    await user.type(getByTestId('discount-field'), '5015');
    await user.type(getByTestId('min-price-field'), '150');
    await user.type(getByTestId('beginning-date-input'), '01.01.2016');
    await user.type(getByTestId('expiration-date-input'), '12.01.2016');

    await waitFor(() => {
      fireEvent.click(getByTestId('single-button'));
    });

    expect(testDispatch).toHaveBeenCalledWith({
      discount: '5015',
      minPrice: '150',
      beginningDate: new Date('01.01.2016').getTime(),
      expirationDate: new Date('12.01.2016').getTime(),
    });
  });
});

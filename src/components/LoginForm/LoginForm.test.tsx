import { describe, test } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import { TestWrapper } from '../TestWrapper';
import LoginForm from './';
import * as authApi from '@/shared/api/authApi';

vi.mock('next/navigation');

const TestLoginForm = () => {
  return (
    <TestWrapper>
      <LoginForm />
    </TestWrapper>
  );
};

describe('LoginForm', () => {
  test('should render', () => {
    const { getByRole } = render(<TestLoginForm />);

    expect(getByRole('form')).toBeInTheDocument();
  });

  test('should have a modifiable email field', () => {
    const { getByTestId } = render(<TestLoginForm />);

    expect(getByTestId('email-field')).toBeInTheDocument();

    fireEvent.change(getByTestId('email-field'), {
      target: { value: 'Test email' },
    });
    expect(getByTestId('email-field')).toHaveValue('Test email');
  });

  test('should have a modifiable password field', () => {
    const { getByTestId } = render(<TestLoginForm />);

    expect(getByTestId('email-field')).toBeInTheDocument();

    fireEvent.change(getByTestId('password-field'), {
      target: { value: 'Test password' },
    });
    expect(getByTestId('password-field')).toHaveValue('Test password');
  });

  test('should block the submit button in loading state', () => {
    vi.spyOn(authApi, 'useLoginMutation').mockReturnValue([
      vi.fn(),
      {
        isLoading: true,
        reset: vi.fn(),
      },
    ]);

    const { getByTestId } = render(<TestLoginForm />);

    expect(getByTestId('submit-btn')).toBeDisabled();
  });
});

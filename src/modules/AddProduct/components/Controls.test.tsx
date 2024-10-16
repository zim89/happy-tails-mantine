import { describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import { Controls } from './Controls';
import { TestWrapper } from '@/components/TestWrapper';
import { UnsavedChangesProvider } from '@/shared/context/unsaved.context';
import { AddProductProvider } from '../lib/utils';
import * as mod from '@/shared/api/productApi';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const TestControls = () => {
  return (
    <TestWrapper>
      <UnsavedChangesProvider>
        <AddProductProvider>
          <Controls />
        </AddProductProvider>
      </UnsavedChangesProvider>
    </TestWrapper>
  );
};

describe('Controls', () => {
  beforeEach(() => {
    render(<TestControls />);
  });

  test('should render', () => {
    expect(screen.getByTestId('controls')).toBeInTheDocument();
  });

  test("should call submit handler when 'Save' button is clicked", async () => {
    const dispatch = vi.spyOn(mod, 'useCreateMutation');

    const saveBtn = screen.getByTestId('save-button');
    await user.click(saveBtn);

    expect(dispatch).toHaveBeenCalled();
  });
});

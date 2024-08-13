import { describe, test } from 'vitest';
import { render } from '@testing-library/react';

import { TestWrapper } from '../TestWrapper';
import NotFound from './NotFound';
import * as hooks from '@/shared/lib/hooks';

const TestNotFound = () => {
  return (
    <TestWrapper>
      <NotFound />
    </TestWrapper>
  );
};

vi.mock('@/shared/lib/hooks', () => ({
  useDeviceSize: () => ({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  }),
}));

describe('NotFound', () => {
  test('renders the not found page correctly', () => {
    const { getByText } = render(TestNotFound());
    expect(getByText('Page not found')).toBeInTheDocument();
  });

  test('renders the return link correctly', () => {
    const { getByRole } = render(TestNotFound());
    expect(getByRole('link')).toHaveTextContent('Back to homepage');
  });

  test('renders bigger image on big screens', () => {
    const { getByTestId } = render(TestNotFound());
    expect(getByTestId('image')).toHaveAttribute('width', '700');
    expect(getByTestId('image')).toHaveAttribute('height', '575');
  });

  test('renders smaller image on smaller screens', async () => {
    // Create a mock that is scoped to this test
    const useDeviceSizeMock = vi.spyOn(hooks, 'useDeviceSize');
    useDeviceSizeMock.mockReturnValue({
      isDesktop: false,
      isMobile: true,
      isTablet: false,
    });

    const { getByTestId } = render(TestNotFound());
    expect(getByTestId('image')).toHaveAttribute('width', '460');
    expect(getByTestId('image')).toHaveAttribute('height', '375');
  });
});

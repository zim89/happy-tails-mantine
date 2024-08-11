import { expect, test } from 'vitest';
import { TestWrapper } from '../TestWrapper';
import Logo from './Logo';
import { render } from '@testing-library/react';

const TestLogo = () => {
  return (
    <TestWrapper>
      <Logo />
    </TestWrapper>
  );
};

describe('Logo', () => {
  test('renders the logo correctly', () => {
    const { getAllByRole } = render(TestLogo());
    expect(getAllByRole('img')).toHaveLength(3);
  });
});

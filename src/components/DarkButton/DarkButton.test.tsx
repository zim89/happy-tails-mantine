import { fireEvent, render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';

import DarkButton, { Props } from './DarkButton';
import { TestWrapper } from '../TestWrapper';

const TestDarkButton = (props: Props) => {
  return (
    <TestWrapper>
      <DarkButton {...props} />
    </TestWrapper>
  );
};

test('It renders its children', () => {
  render(
    <TestDarkButton handler={() => {}}>
      <span data-testid='text'>Ciào, il mondo!</span>
    </TestDarkButton>
  );

  expect(screen.getByTestId('text')).toBeInTheDocument();
});

test('It triggers a provided handler', () => {
  const handler = vi.fn();

  render(
    <TestDarkButton handler={handler}>
      <span data-testid='text'>Ciào, il mondo!</span>
    </TestDarkButton>
  );

  fireEvent.click(screen.getByTestId('text').parentNode!);

  expect(handler).toHaveBeenCalled();
});

test('It renders a disabled button', () => {
  render(
    <TestDarkButton handler={() => {}} disabled>
      <span data-testid='text'>Ciào, il mondo!</span>
    </TestDarkButton>
  );

  expect(screen.getByTestId('text').parentNode!).not.toBeEnabled();
});

test("It doesn't render a disabled button when it's enabled", () => {
  render(
    <TestDarkButton handler={() => {}}>
      <span data-testid='text'>Ciào, il mondo!</span>
    </TestDarkButton>
  );

  expect(screen.getByTestId('text').parentNode!).toBeEnabled();
});

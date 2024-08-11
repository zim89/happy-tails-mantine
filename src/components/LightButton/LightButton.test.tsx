import { fireEvent, render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';

import LightButton, { Props } from './LightButton';
import { TestWrapper } from '../TestWrapper';

const TestLightButton = (props: Props) => {
  return (
    <TestWrapper>
      <LightButton {...props} />
    </TestWrapper>
  );
};

test('It renders its children', () => {
  render(
    <TestLightButton handler={() => {}}>
      <span data-testid='text'>Ciào, il mondo!</span>
    </TestLightButton>
  );

  expect(screen.getByTestId('text')).toBeInTheDocument();
});

test('It triggers a provided handler', () => {
  const handler = vi.fn();

  render(
    <TestLightButton handler={handler}>
      <span data-testid='text'>Ciào, il mondo!</span>
    </TestLightButton>
  );

  fireEvent.click(screen.getByTestId('text').parentNode!);

  expect(handler).toHaveBeenCalled();
});

test('It renders a disabled button', () => {
  render(
    <TestLightButton handler={() => {}} disabled>
      <span data-testid='text'>Ciào, il mondo!</span>
    </TestLightButton>
  );

  expect(screen.getByTestId('text').parentNode!).not.toBeEnabled();
});

test("It doesn't render a disabled button when it's enabled", () => {
  render(
    <TestLightButton handler={() => {}}>
      <span data-testid='text'>Ciào, il mondo!</span>
    </TestLightButton>
  );

  expect(screen.getByTestId('text').parentNode!).toBeEnabled();
});

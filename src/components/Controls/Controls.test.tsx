import { expect, test } from 'vitest';
import { screen, render } from '@testing-library/react';

import Controls from './Controls';
import { TestWrapper } from '../TestWrapper';

test('It renders a child', () => {
  render(
    <TestWrapper>
      <Controls>
        {() => {
          return <button>Test</button>;
        }}
      </Controls>
    </TestWrapper>
  );

  const button = screen.getByText('Test');
  expect(button).toBeInTheDocument();
});

test('It renders all its internal buttons', () => {
  render(
    <TestWrapper>
      <Controls>
        {({ DarkButton, LightButton, PreviewButton }) => {
          return (
            <>
              <DarkButton handler={() => {}}>
                <span data-testid='dark-button'>Dark</span>
              </DarkButton>
              <LightButton data-testid='light-button' handler={() => {}}>
                <span data-testid='light-button'>Light</span>
              </LightButton>
              <div data-testid='preview-button'>
                <PreviewButton handler={() => {}} />
              </div>
            </>
          );
        }}
      </Controls>
    </TestWrapper>
  );

  expect(screen.getByTestId('dark-button')).toBeInTheDocument();
  expect(screen.getByTestId('light-button')).toBeInTheDocument();
  expect(
    screen.getByTestId('preview-button').querySelector('button')
  ).toBeInTheDocument();
});

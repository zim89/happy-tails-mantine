import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { CustomBadge, Props } from './';
import { TestWrapper } from '../TestWrapper';
import { orderPalette } from '@/shared/lib/constants';

const renderBadge = (
  props = {
    name: 'Completed!',
    color: 'completed',
    palette: orderPalette,
  } as Props
) => {
  return (
    <TestWrapper>
      <CustomBadge
        name={props.name}
        color={props.color}
        palette={props.palette}
      />
    </TestWrapper>
  );
};

test('Badge is rendered with a default palette and correct color', () => {
  render(renderBadge());

  const badge = screen.getByRole('badge');

  expect(badge).toBeInTheDocument();
  expect(badge).toHaveStyle({ backgroundColor: orderPalette['completed'] });
});

test('Badge is rendered with a custom palette and correct color', () => {
  const customPalette = {
    test: '#95d500',
  };

  render(renderBadge({ name: 'Test', color: 'test', palette: customPalette }));

  const badge = screen.getByRole('badge');

  expect(badge).toBeInTheDocument();
  expect(badge).toHaveStyle({ backgroundColor: customPalette['test'] });
});

test('Render a correct text node', () => {
  const testingTextNode = 'Ciaò, mondo!';

  render(renderBadge({ name: testingTextNode, color: 'completed' }));

  const badge = screen.getByRole('badge');

  expect(badge).toHaveTextContent(testingTextNode);
  expect(badge).not.toHaveTextContent('');
});

test('Expected a completed type in case of incorrectly defined color param', () => {
  const customPalette = {
    test: '#95d500',
  };

  render(
    renderBadge({ name: 'Test', color: 'NOT EXISTING', palette: customPalette })
  );

  const badge = screen.getByRole('badge');

  expect(badge).toBeInTheDocument();
  expect(badge).toHaveStyle({ backgroundColor: orderPalette['completed'] });
});

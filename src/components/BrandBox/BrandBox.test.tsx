import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { TestWrapper } from '../TestWrapper';
import BrandBox, { Props } from './BrandBox';

const TestBrandBox = ({ children, ...rest }: Props) => {
  return (
    <TestWrapper>
      <BrandBox {...rest}>{children}</BrandBox>
    </TestWrapper>
  );
};

test('It renders', () => {
  render(
    <TestBrandBox title=''>
      <h1 role='article'>Test</h1>
    </TestBrandBox>
  );
  expect(screen.getByRole('article')).toBeInTheDocument();
});

test('It renders with a title', () => {
  render(
    <TestBrandBox title='Test title'>
      <h1>Test</h1>
    </TestBrandBox>
  );

  expect(screen.getByText('Test title')).toBeInTheDocument();
});

test('It renders with a custom right section', () => {
  render(
    <TestBrandBox
      title='Test title'
      rightSection={<span role='option'>{`Hello, it's me!`}</span>}
    >
      <h1>Test</h1>
    </TestBrandBox>
  );

  expect(screen.getByRole('option')).toBeInTheDocument();
  expect(screen.getByRole('option')).toHaveTextContent("Hello, it's me!");
});

test('It adds custom classnames to the container', () => {
  render(
    <TestBrandBox className='custom-class' title='Test title'>
      <h1>Test</h1>
    </TestBrandBox>
  );

  expect(screen.getByTestId('box-container')).toHaveClass('custom-class');
});

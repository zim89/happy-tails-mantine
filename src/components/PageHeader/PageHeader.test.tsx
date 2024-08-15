import { describe, test } from 'vitest';
import { render } from '@testing-library/react';

import { TestWrapper } from '../TestWrapper';
import PageHeader, { Props } from './PageHeader';

const TestPageHeader = (props: Props) => {
  return (
    <TestWrapper>
      <PageHeader {...props} />
    </TestWrapper>
  );
};

describe('PageHeader', () => {
  test('should render', () => {
    const { getByText } = render(
      <TestPageHeader>
        {() => {
          return <h1>test</h1>;
        }}
      </TestPageHeader>
    );

    expect(getByText('test')).toBeInTheDocument();
  });

  test('should render a group with a title', () => {
    const { getByRole } = render(
      <TestPageHeader>
        {(Group) => {
          return <Group title='Test' />;
        }}
      </TestPageHeader>
    );

    expect(getByRole('group')).toBeInTheDocument();
    expect(getByRole('group').children[0]).toHaveTextContent('Test');
  });

  test('should render a group with a title and additional text', () => {
    const { getByRole, getByTestId } = render(
      <TestPageHeader>
        {(Group) => {
          return <Group title='Test' additional='Test Test' />;
        }}
      </TestPageHeader>
    );

    expect(getByRole('group').children[0]).toHaveTextContent('Test');
    expect(getByTestId('additional-text')).toHaveTextContent('Test Test');
  });

  test('should render a group with a right section', () => {
    const { getByRole, getByTestId } = render(
      <TestPageHeader
        rightSection={<span data-testid='right-section'>Test Section</span>}
      >
        {(Group) => {
          return <Group title='Test' />;
        }}
      </TestPageHeader>
    );

    expect(getByRole('group')).toBeInTheDocument();
    expect(getByTestId('right-section')).toBeInTheDocument();
  });
});

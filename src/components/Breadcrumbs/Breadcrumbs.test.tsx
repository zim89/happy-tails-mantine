import { describe, test } from 'vitest';
import { render } from '@testing-library/react';

import { TestWrapper } from '../TestWrapper';
import Breadcrumbs, { Props } from './Breadcrumbs';

const TestBreadcrumbs = (props: Props) => {
  return (
    <TestWrapper>
      <Breadcrumbs {...props} />
    </TestWrapper>
  );
};

// Crumb posseses BlockLink which uses useRouter hook that needs to be mocked out
vi.mock('next/navigation');

describe('Breadcrumbs', () => {
  test('should render', () => {
    const { getByTestId } = render(
      <TestBreadcrumbs crumbs={[{ text: 'Test' }]} />
    );

    expect(getByTestId('breadcrumbs')).toBeInTheDocument();
  });

  test('should render all crumbs correctly', () => {
    const crumbs = [
      { text: 'Test 1', href: '/test' },
      { text: 'Test 2', href: '/test2' },
      { text: 'Test 3' },
    ];

    const { getAllByTestId } = render(<TestBreadcrumbs crumbs={crumbs} />);
    const selection = getAllByTestId('crumb');
    expect(selection.length).toBe(crumbs.length);

    for (let i = 0; i < selection.length; i++) {
      // Link or a plain text of the crumb
      expect(selection[i].children[0]).toHaveTextContent(crumbs[i].text);

      // When it's a link then check it's href attribute
      selection[i].children[0].nodeName === 'A' &&
        expect(selection[i].children[0]).toHaveAttribute(
          'href',
          crumbs[i].href
        );
    }
  });
});

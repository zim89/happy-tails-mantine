import { describe, test } from 'vitest';
import { render } from '@testing-library/react';

import { TestWrapper } from '../TestWrapper';
import Template, { Props } from './HeaderTemplate';

const TestTemplate = (props: Props) => {
  return (
    <TestWrapper>
      <Template {...props} />
    </TestWrapper>
  );
};

describe('HeaderTemplate', () => {
  test('renders the header template with logo', () => {
    const { getAllByTestId } = render(
      <TestTemplate>
        {({ Logo }) => (
          <>
            <div>
              <Logo />
            </div>
          </>
        )}
      </TestTemplate>
    );

    expect(getAllByTestId('logo').length).toBeGreaterThan(0);
  });
});

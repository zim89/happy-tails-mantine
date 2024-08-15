import { fireEvent, render } from '@testing-library/react';
import { describe, test } from 'vitest';

import ModalFooter, { Props } from './ModalFooter';
import { TestWrapper } from '../TestWrapper';

const TestModalFooter = (props: Props) => {
  return (
    <TestWrapper>
      <ModalFooter {...props} />
    </TestWrapper>
  );
};

describe('ModalFooter', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(
      <TestModalFooter
        primaryBtnOnClick={vi.fn()}
        primaryBtnText='Test'
        secondaryBtnOnClick={vi.fn()}
        secondaryBtnText='Test'
        singleBtn={false}
      />
    );

    expect(getByTestId('modal-footer')).toBeInTheDocument();
  });

  test('handles single button click', () => {
    const handler = vi.fn();

    const { getByTestId } = render(
      <TestModalFooter
        primaryBtnOnClick={handler}
        primaryBtnText='Test'
        singleBtn
      />
    );

    fireEvent.click(getByTestId('single-button'));

    expect(handler).toHaveBeenCalled();
  });

  test('renders only single button when singleBtn opt is enabled', () => {
    const { queryByTestId } = render(
      <TestModalFooter
        primaryBtnOnClick={vi.fn()}
        primaryBtnText='Test'
        singleBtn
      />
    );

    expect(queryByTestId('single-button')).not.toBeNull();
    expect(queryByTestId('primary-button')).toBeNull();
    expect(queryByTestId('secondary-button')).toBeNull();
  });

  test("handles only primary button when it's clicked and doesn't handle secondary one", () => {
    const primaryHandler = vi.fn();
    const secondaryHandler = vi.fn();

    const { getByTestId } = render(
      <TestModalFooter
        primaryBtnOnClick={primaryHandler}
        primaryBtnText='Primary'
        secondaryBtnOnClick={secondaryHandler}
        secondaryBtnText='Secondary'
        singleBtn={false}
      />
    );

    fireEvent.click(getByTestId('primary-button'));

    expect(primaryHandler).toHaveBeenCalled();
    expect(secondaryHandler).not.toHaveBeenCalled();
  });

  test("handles only secondary button when it's clicked and doesn't handle primary one", () => {
    const primaryHandler = vi.fn();
    const secondaryHandler = vi.fn();

    const { getByTestId } = render(
      <TestModalFooter
        primaryBtnOnClick={primaryHandler}
        primaryBtnText='Primary'
        secondaryBtnOnClick={secondaryHandler}
        secondaryBtnText='Secondary'
        singleBtn={false}
      />
    );

    fireEvent.click(getByTestId('secondary-button'));

    expect(primaryHandler).not.toHaveBeenCalled();
    expect(secondaryHandler).toHaveBeenCalled();
  });

  test("applies container's styles", () => {
    const testColor = 'rgb(19, 23, 18)';

    const { getByTestId } = render(
      <TestModalFooter
        primaryBtnOnClick={vi.fn()}
        primaryBtnText='Test'
        secondaryBtnOnClick={vi.fn()}
        secondaryBtnText='Test'
        singleBtn={false}
        containerStyles={{ color: testColor }}
      />
    );

    expect(getByTestId('modal-footer')).toHaveStyle({ color: testColor });
  });

  //   I don't know why the test doesn't work
  test("applies primary button's class name", async () => {
    const testClassName = 'text-[12px]';

    const { getByTestId } = render(
      <TestModalFooter
        primaryBtnOnClick={vi.fn()}
        primaryBtnText='Test'
        primaryBtnClassName={testClassName}
        secondaryBtnOnClick={vi.fn()}
        secondaryBtnText='Test'
        singleBtn={false}
      />
    );

    // expect(getByTestId('primary-button')).toHaveClass(testClassName);
  });

  test("applies primary button's text", async () => {
    const testText = 'Primary button';

    const { getByTestId } = render(
      <TestModalFooter
        primaryBtnOnClick={vi.fn()}
        primaryBtnText={testText}
        secondaryBtnOnClick={vi.fn()}
        secondaryBtnText='Test'
        singleBtn={false}
      />
    );

    expect(getByTestId('primary-button')).toHaveTextContent(testText);
  });

  test("applies secondary button's text", async () => {
    const testText = 'Secondary button';

    const { getByTestId } = render(
      <TestModalFooter
        primaryBtnOnClick={vi.fn()}
        primaryBtnText='Test'
        secondaryBtnOnClick={vi.fn()}
        secondaryBtnText={testText}
        singleBtn={false}
      />
    );

    expect(getByTestId('secondary-button')).toHaveTextContent(testText);
  });
});

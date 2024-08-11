import { test, describe, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import { TestWrapper } from '../TestWrapper';
import PreviewButton, { Props } from './PreviewButton';

const TestPreviewButton = (props: Props) => {
  return (
    <TestWrapper>
      <PreviewButton {...props} />
    </TestWrapper>
  );
};

describe('PreviewButton', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(<TestPreviewButton handler={() => {}} />);

    expect(getByTestId('preview-button')).toBeInTheDocument();
  });

  test('renders its color correctly', () => {
    const { getByTestId } = render(<TestPreviewButton handler={() => {}} />);
    expect(getByTestId('preview-button')).toHaveStyle(
      'background-color: ButtonFace;'
    );
  });

  test('renders its color correctly when the prop is set', () => {
    const { getByTestId } = render(
      <TestPreviewButton handler={() => {}} color='rgb(0, 255, 53)' />
    );

    expect(getByTestId('preview-button')).toHaveStyle(
      'background-color: rgb(0, 255, 53);'
    );
  });
});

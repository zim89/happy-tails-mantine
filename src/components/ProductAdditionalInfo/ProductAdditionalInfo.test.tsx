import { describe, test } from 'vitest';
import { render } from '@testing-library/react';

import { TestWrapper } from '../TestWrapper';
import AdditionalInfo from './';
import { additionalList } from '@/modules/ProductDetails/lib/data';

const TestAdditionalInfo = () => {
  return (
    <TestWrapper>
      <AdditionalInfo />
    </TestWrapper>
  );
};

describe('ProductAdditionalInfo', () => {
  test('should render correctly', () => {
    const { getByTestId } = render(<TestAdditionalInfo />);
    expect(getByTestId('info-wrapper')).toBeInTheDocument();
  });

  test('should render all additional information', () => {
    const { getAllByTestId } = render(<TestAdditionalInfo />);

    // Check that all items are in the document
    const selection = getAllByTestId('info-item');
    expect(selection.length).toEqual(additionalList.length);

    // Check whether all images are rendered correctly
    const infoImgs = getAllByTestId('info-img');

    infoImgs.forEach((item, index) => {
      expect(item).toHaveAttribute('src', additionalList[index].icon);
      expect(item).toHaveAttribute('alt', additionalList[index].title);
    });

    // Check whether all titles are rendered correctly
    const infoTitles = getAllByTestId('info-title');

    infoTitles.forEach((item, index) => {
      expect(item).toHaveTextContent(additionalList[index].title);
    });

    // Check whether all descriptions are rendered correctly
    const infoDescriptions = getAllByTestId('info-description');

    infoDescriptions.forEach((item, index) => {
      expect(item).toHaveTextContent(additionalList[index].desc);
    });
  });
});

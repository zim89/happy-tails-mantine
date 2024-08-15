import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import DeleteModal, { Props } from './DeleteModal';
import { TestWrapper } from '../TestWrapper';

const TestDeleteModal = (props: Props) => {
  return (
    <TestWrapper>
      <DeleteModal {...props} />
    </TestWrapper>
  );
};

test('should render', () => {
  render(
    <TestDeleteModal>
      {(Modal) => {
        return (
          <Modal
            opened
            onClose={() => {}}
            footerProps={{
              singleBtn: true,
              primaryBtnOnClick: () => {},
              primaryBtnText: 'Test',
            }}
          >
            <span data-testid='text'>Test</span>;
          </Modal>
        );
      }}
    </TestDeleteModal>
  );

  expect(screen.getByTestId('text')).toBeInTheDocument();
});

test("should render a modal when it's active", () => {
  render(
    <TestDeleteModal>
      {(Modal) => {
        return (
          <Modal
            opened
            onClose={() => {}}
            footerProps={{
              singleBtn: true,
              primaryBtnOnClick: () => {},
              primaryBtnText: 'Test',
            }}
          >
            <span data-testid='text'>Test</span>;
          </Modal>
        );
      }}
    </TestDeleteModal>
  );

  expect(screen.getByTestId('text')).toBeVisible();
});

test("shouldn't render a modal when it's not active", () => {
  const { findByTestId, queryByTestId } = render(
    <TestDeleteModal>
      {(Modal) => {
        return (
          <Modal
            opened={false}
            onClose={() => {}}
            footerProps={{
              singleBtn: true,
              primaryBtnOnClick: () => {},
              primaryBtnText: 'Test',
            }}
          >
            <span data-testid='text'>Test</span>;
          </Modal>
        );
      }}
    </TestDeleteModal>
  );

  expect(queryByTestId('text')).toBeNull();
});

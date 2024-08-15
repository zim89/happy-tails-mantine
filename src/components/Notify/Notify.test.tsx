import { expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import Notify, { NotifyProps } from './';
import { TestWrapper } from '../TestWrapper';
import { NotificationProps } from '@mantine/core';

const renderNotify = (
  visible: boolean,
  state?: NotifyProps['kind'],
  onClose: NotifyProps['onClose'] = () => {},
  classNames?: NotificationProps['classNames'] & { progress?: string }
) => {
  return (
    <TestWrapper>
      <Notify
        kind={state ?? 'success'}
        onClose={onClose}
        text='TEST TEXT'
        visible={visible}
        classNames={classNames}
      />
    </TestWrapper>
  );
};

test('Notify is hidden', () => {
  render(renderNotify(false));

  const notifyText = screen.queryByText('TEST TEXT');
  expect(notifyText).not.toBeInTheDocument();
});

test('Notify is visible', () => {
  render(renderNotify(true));

  const notifyText = screen.queryByText('TEST TEXT');
  expect(notifyText).toBeVisible();
});

test('Failed state is red', () => {
  render(renderNotify(true, 'fail', () => {}, { progress: 'text-red-500' }));

  const progressBar = screen.queryByRole('progressbar');
  expect(progressBar).toHaveClass('text-red-500');
});

test('Succeded state is green', () => {
  render(
    renderNotify(true, 'success', () => {}, { progress: 'text-lime-500' })
  );

  const progressBar = screen.queryByRole('progressbar');
  expect(progressBar).toHaveClass('text-lime-500');
});

test('Called onClose function after an animation', async () => {
  const onClose = vi.fn();

  render(renderNotify(true, 'success', onClose));

  const notificationElement = screen.getByRole('progressbar');
  fireEvent.animationEnd(notificationElement);

  expect(onClose).toHaveBeenCalled();
});

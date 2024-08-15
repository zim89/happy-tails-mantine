import { expect, test, describe } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { useContext, useEffect } from 'react';
import * as hooks from '@mantine/hooks';

import { TestWrapper } from '../TestWrapper';
import BlockButton, { Props } from './BlockButton';
import {
  UnsavedChangesContext,
  UnsavedChangesProvider,
} from '@/shared/context/unsaved.context';

vi.mock('@mantine/hooks', () => ({
  useDisclosure: () => [
    false,
    { close: vi.fn(), open: vi.fn(), toggle: vi.fn() },
  ],
}));

const ButtonContent = () => {
  return <span role='textbox'>Test button</span>;
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <TestWrapper>
      <UnsavedChangesProvider>{children}</UnsavedChangesProvider>
    </TestWrapper>
  );
};

const TestButton = ({
  onClick,
  children,
  unsavedChanges,
  ...props
}: Props & { unsavedChanges: boolean }) => {
  const { update } = useContext(UnsavedChangesContext);

  useEffect(() => {
    update((prev) => ({ ...prev, unsavedChanges: unsavedChanges }));
  }, []);

  return (
    <BlockButton {...props} onClick={onClick}>
      {children}
    </BlockButton>
  );
};

describe('BlockButton', () => {
  test('Renders a content for the button', () => {
    render(
      <Wrapper>
        <TestButton onClick={() => {}} unsavedChanges={false}>
          <ButtonContent />
        </TestButton>
      </Wrapper>
    );

    const el = screen.queryByRole('textbox');
    expect(el).toHaveTextContent('Test button');
  });

  test('Should not trigger handler when unsavedChanges prop is true', () => {
    const onClick = vi.fn();
    render(
      <Wrapper>
        <TestButton onClick={onClick} unsavedChanges={true}>
          <ButtonContent />
        </TestButton>
      </Wrapper>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  test('should trigger handler when unsavedChanges prop is false', () => {
    const onClick = vi.fn();
    render(
      <Wrapper>
        <TestButton onClick={onClick} unsavedChanges={false}>
          <ButtonContent />
        </TestButton>
      </Wrapper>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  test("click event should trigger modal's opening", () => {
    const handler = vi.fn();
    const useDisclosure = vi.spyOn(hooks, 'useDisclosure');
    useDisclosure.mockReturnValue([
      true,
      { close: vi.fn(), open: vi.fn(), toggle: vi.fn() },
    ]);

    const { getByRole, queryByTestId } = render(
      <Wrapper>
        <TestButton onClick={handler} unsavedChanges={true}>
          <ButtonContent />
        </TestButton>
      </Wrapper>
    );

    fireEvent.click(getByRole('button'));

    expect(handler).not.toHaveBeenCalled();
    expect(queryByTestId('modal-content')).not.toBeNull();
  });
});

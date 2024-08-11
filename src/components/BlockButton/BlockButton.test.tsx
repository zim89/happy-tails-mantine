import { expect, test } from 'vitest';
import { TestWrapper } from '../TestWrapper';
import BlockButton, { Props } from './BlockButton';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  UnsavedChangesContext,
  UnsavedChangesProvider,
} from '@/shared/context/unsaved.context';
import { useContext, useEffect } from 'react';

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

test('Should trigger handler when unsavedChanges prop is false', () => {
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

test("Button click triggers modal's opening", () => {
  render(
    <Wrapper>
      <TestButton onClick={() => {}} unsavedChanges={false}>
        <ButtonContent />
      </TestButton>
    </Wrapper>
  );

  expect(screen.getByRole('dialog')).not.toBeVisible();
});

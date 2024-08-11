import { test, describe, expect } from 'vitest';
import { screen, render } from '@testing-library/react';

import { PostFormProvider } from '@/shared/context/postform.context';
import { TestWrapper } from '../TestWrapper';
import FontFamilyControl from './FontFamilyControl';
import EditorContext from '@/modules/EditorWrapper';
import { RichTextEditor } from '@mantine/tiptap';

const TestFontFamilyControl = () => {
  return (
    <TestWrapper>
      <PostFormProvider>
        <EditorContext>
          {(editor) => {
            return (
              <RichTextEditor editor={editor}>
                <RichTextEditor.Toolbar>
                  <RichTextEditor.ControlsGroup>
                    <FontFamilyControl />
                  </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>
              </RichTextEditor>
            );
          }}
        </EditorContext>
      </PostFormProvider>
    </TestWrapper>
  );
};

describe('FontFamilyControl ', () => {
  test('renders correctly', () => {
    render(<TestFontFamilyControl />);
  });

  console.log(screen.getByTestId('option-button'));
});

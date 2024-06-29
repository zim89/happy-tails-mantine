'use client';

import { useContext } from 'react';

// @tiptap editor's libs and components
import { Editor, useEditor } from '@tiptap/react';
import { Link } from '@mantine/tiptap';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';

import { FontFamily, FontSize, ImageResize } from '@/shared/lib/utils';
import { PostFormContext } from '@/shared/context/postform.context';

type Props = {
  children(editor: Editor): React.ReactNode;
};
export default function EditorWrapper({ children }: Props) {
  const { form } = useContext(PostFormContext);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      TextStyle,
      Color,
      // Image,
      ImageResize,
      FontSize,
      FontFamily,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: form.values.content,
    onUpdate: ({ editor }) => form.setFieldValue('content', editor.getHTML()),
  });

  if (!editor) return null;

  return <>{children(editor)}</>;
}

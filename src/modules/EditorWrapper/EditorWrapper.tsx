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

import { FontFamily, FontSize, Image } from '@/shared/lib/utils';

type Props = {
  children(editor: Editor): React.ReactNode;
  content: string
  handleChange: (value: string) => void;
};
export default function EditorWrapper({ children, content, handleChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      TextStyle,
      Color,
      Image,
      FontSize,
      FontFamily,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
    onUpdate: ({ editor }) => handleChange(editor.getHTML()),
  });

  if (!editor) return null;

  return <>{children(editor)}</>;
}

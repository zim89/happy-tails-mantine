// Author: wildsonc
// Timestamp: on Mar 18, 2023
// Reference: https://github.com/orgs/mantinedev/discussions/3821

import { FileButton } from '@mantine/core';
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap';
import { Image } from 'lucide-react';
import { useEffect } from 'react';

import { sharedProps } from '@/modules/EditorTemplate/lib/shared-props';

interface Props {
  handleImageUpload: (file: File) => Promise<string | null>;
}

const ImageControl = ({ handleImageUpload }: Props) => {
  const { editor } = useRichTextEditorContext();

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      if (!event.clipboardData || !event.clipboardData.items) return;

      const item = Array.from(event.clipboardData.items).find(
        (item: DataTransferItem) => item.type.indexOf('image') === 0
      );

      if (!item) return;

      const file = item.getAsFile();
      if (file) handleImage(file);
    };

    window.document.addEventListener('paste', handlePaste);

    return () => {
      window.document.removeEventListener('paste', handlePaste);
    };
  }, [editor]);

  const handleImage = (file: File | null) => {
    if (!file) return;

    if (process.env.NODE_ENV !== 'production') {
      editor?.chain().focus().setImage({ src: '/images/auth-dog.png' }).run();
    } else {
      handleImageUpload(file).then((url) => {
        url && editor?.chain().focus().setImage({ src: url }).run();
      });
    }
  };

  return (
    <FileButton
      onChange={handleImage}
      accept='image/png,image/jpeg,image/webp,image/gif'
    >
      {(props) => (
        <RichTextEditor.Control
          {...props}
          {...sharedProps.toolbarBtn}
          aria-label='Insert image'
          title='Insert image'
        >
          <Image size='1rem' />
        </RichTextEditor.Control>
      )}
    </FileButton>
  );
};

export default ImageControl;

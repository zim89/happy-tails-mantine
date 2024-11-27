import { useContext, useEffect } from 'react';
import { Editor } from '@tiptap/react';

import { EditorTemplate } from '@/modules/EditorTemplate';
import { context } from '../lib/utils';

type Props = {
  editor: Editor;
};

export const AddProductEditor = ({ editor }: Props) => {
  const { productForm } = useContext(context);

  // This is used to clear the editor when the product is created (cleared description field)
  useEffect(() => {
    if (
      !productForm.values.description.trim() ||
      productForm.values.description.trim() === '<p></p>'
    ) {
      editor.commands.deleteNode('paragraph');
    }
  }, [productForm.values.description]);

  return (
    <div className='mb-10 mt-6 flex-1 flex-wrap'>
      <EditorTemplate
        kind='text'
        editor={editor}
        classNames={{
          root: 'h-full max-w-[430px]',
          content: 'h-full',
          typographyStylesProvider: 'h-full',
        }}
      />
    </div>
  );
};

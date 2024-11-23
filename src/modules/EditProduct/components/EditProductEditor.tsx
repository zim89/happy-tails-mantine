import { EditorTemplate } from '@/modules/EditorTemplate';
import { Editor } from '@tiptap/react';
import { useContext, useEffect } from 'react';
import { context } from '../lib/utils';

type Props = {
  editor: Editor;
};

export const EditProductEditor = ({ editor }: Props) => {
  const { productForm } = useContext(context);

  useEffect(() => {
    if (productForm.values.description.trim()) {
      editor.commands.insertContent(productForm.values.description);
    }
  }, []);

  return (
    <>
      <div className='mb-10 mt-6 flex-1 flex-wrap'>
        <EditorTemplate
          kind='text'
          editor={editor}
          classNames={{
            // Max width: screen - sidebar length - paddings
            root: 'h-full max-w-[calc(100vw-124px)] md:max-w-[500px]',
            content: 'h-full max-w-[calc(100vw-124px)] md:max-w-[500px]',
            typographyStylesProvider: 'h-full',
          }}
        />
      </div>
    </>
  );
};

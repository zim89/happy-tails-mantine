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
      editor.commands.clearContent();
    } else {
      editor.commands.setContent(productForm.values.description);
    }
  }, [productForm.values.description]);

  return (
    <div className='mb-10 h-[90%] flex-1 flex-wrap'>
      <EditorTemplate
        kind='text'
        editor={editor}
        classNames={{
          root: 'h-full max-w-[444px]',
          content: 'h-full',
          typographyStylesProvider: 'h-full',
        }}
        additionalProps={{
          fancyOption: {
            input: `Write me a great description of the following product, but in HTML <p> tag, and use also anchors or lists if you need: ${productForm.values.name}. Maximum symbols: 255, including markup. Product category: ${productForm.values.categoryName}`,
            validate: () => {
              return (
                !productForm.validateField('name').hasError &&
                !productForm.validateField('categoryName').hasError
              );
            },
            onFinish: (content) => {
              productForm.setFieldValue('description', content);
            },
          },
        }}
      />
    </div>
  );
};

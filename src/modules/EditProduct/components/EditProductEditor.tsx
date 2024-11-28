import { EditorTemplate } from '@/modules/EditorTemplate';
import { Editor } from '@tiptap/react';
import { useContext } from 'react';
import { context } from '../lib/utils';

type Props = {
  editor: Editor;
};

export const EditProductEditor = ({ editor }: Props) => {
  const { productForm } = useContext(context);

  return (
    <>
      <div className='mb-10 mt-6 flex-1 flex-wrap'>
        <EditorTemplate
          kind='text'
          editor={editor}
          classNames={{
            // Max width: screen - sidebar length - paddings
            root: 'h-full max-w-[calc(100vw-124px)] md:max-w-[444px]',
            content: 'h-full max-w-[calc(100vw-124px)] md:max-w-[444px]',
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
    </>
  );
};

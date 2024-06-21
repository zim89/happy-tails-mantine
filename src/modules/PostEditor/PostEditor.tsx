'use client';

import axios from 'axios';
import { useCallback, useContext } from 'react';
import { Editor } from '@tiptap/react';
import { TextInput, Button } from '@mantine/core';

// Rich text editor libraries
import { RichTextEditor } from '@mantine/tiptap';
import ImageControl from '@/components/ImageControl';

import classes from './classes.module.css';
import { cn } from '@/shared/lib/utils';
import FontSizeControl from '@/components/FontSizeControl';
import FontFamilyControl from '@/components/FontFamilyControl';
import { PostFormContext } from '@/shared/lib/context';
// import ImageResizeControl from '@/components/ImageResizeControl';

export const sharedProps = {
  toolbarBtn: {
    styles: {
      control: {
        height: '36px',
        backgroundColor: 'transparent',
        border: 0,
        padding: 0,
        color: 'black',
        strokeWidth: '2px',
      },
    },
    classNames: { control: classes.controlIcon },
  },
  controlGroup: {
    bg: 'transparent',
    styles: {
      controlsGroup: {
        borderRight: '1px solid #b2b2b2',
        height: '100%',
        padding: '0em .5rem',
      },
    },
  },
};

type Props = {
  editor: Editor;
};

export default function PostEditor({ editor }: Props) {
  const { form } = useContext(PostFormContext);

  const handleImageUpload = useCallback(async (file: File) => {
    // It works only in secured connection and does not in localhost domain //
    const payload = new FormData();
    payload.append('image', file);
    payload.append('type', 'image');
    payload.append('title', `Image for post: ${file.name}`);
    const res = await axios.post('https://api.imgur.com/3/image/', payload, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data.data.link;
  }, []);

  return (
    <div className='flex w-full max-w-[700px] flex-col gap-12 rounded border border-[#C8C8C8] bg-white p-4 lg:pb-8 min-[2000px]:max-w-[60%]'>
      <div>
        <label className='mb-1'>Title</label>
        <TextInput
          classNames={{
            input: cn('form-input', form?.errors?.title && 'form-error--input'),
            root: 'form-root',
            label: 'form-label',
            error: 'form-error',
          }}
          {...form.getInputProps('title')}
        />
      </div>
      <div style={{ height: '100%', position: 'relative' }}>
        <label className='mb-1'>Content</label>
        <div
          style={{
            height: '95%',
            border: form.errors?.content
              ? '1px solid red'
              : '1px solid #C8C8C8',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
        >
          <RichTextEditor
            editor={editor}
            classNames={{
              root: classes.editorContent,
            }}
          >
            <RichTextEditor.Toolbar
              styles={{
                toolbar: {
                  backgroundColor: '#C8C8C8',
                  gap: 0,
                  padding: '0 0.5em',
                },
              }}
            >
              <RichTextEditor.ControlsGroup {...sharedProps.controlGroup}>
                <FontSizeControl />
              </RichTextEditor.ControlsGroup>
              <RichTextEditor.ControlsGroup {...sharedProps.controlGroup}>
                <FontFamilyControl />
                <RichTextEditor.ColorPicker
                  colors={[
                    '#25262b',
                    '#868e96',
                    '#fa5252',
                    '#e64980',
                    '#be4bdb',
                    '#7950f2',
                    '#4c6ef5',
                    '#228be6',
                    '#15aabf',
                    '#12b886',
                    '#40c057',
                    '#82c91e',
                    '#fab005',
                    '#fd7e14',
                  ]}
                  style={sharedProps.toolbarBtn.styles.control}
                />

                <RichTextEditor.Bold {...sharedProps.toolbarBtn} />
                <RichTextEditor.Italic {...sharedProps.toolbarBtn} />
                <RichTextEditor.Underline {...sharedProps.toolbarBtn} />
                <RichTextEditor.Strikethrough {...sharedProps.toolbarBtn} />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup {...sharedProps.controlGroup}>
                <RichTextEditor.AlignLeft {...sharedProps.toolbarBtn} />
                <RichTextEditor.AlignCenter {...sharedProps.toolbarBtn} />
                <RichTextEditor.AlignJustify {...sharedProps.toolbarBtn} />
                <RichTextEditor.AlignRight {...sharedProps.toolbarBtn} />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup {...sharedProps.controlGroup}>
                <RichTextEditor.OrderedList {...sharedProps.toolbarBtn} />
                <RichTextEditor.BulletList {...sharedProps.toolbarBtn} />
                <RichTextEditor.ControlsGroup />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup {...sharedProps.controlGroup}>
                <ImageControl handleImageUpload={handleImageUpload} />
                <RichTextEditor.Link {...sharedProps.toolbarBtn} />
              </RichTextEditor.ControlsGroup>
              {/* TODO: Image resize */}
              {/* <RichTextEditor.ControlsGroup {...sharedProps.controlGroup}>
								<ImageResizeControl />
							</RichTextEditor.ControlsGroup> */}
            </RichTextEditor.Toolbar>
            <RichTextEditor.Content />
          </RichTextEditor>
        </div>
        {form.errors?.content && (
          <p className='py-1 text-[10px] text-[#dc362e]'>
            {form.errors.content}
          </p>
        )}
      </div>
    </div>
  );
}

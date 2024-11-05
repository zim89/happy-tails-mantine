'use client';

import { useCallback, useContext } from 'react';
import { Editor } from '@tiptap/react';
import { TextInput } from '@mantine/core';

import classes from './classes.module.css';
import { cn } from '@/shared/lib/utils';
import { PostFormContext } from '@/shared/context/postform.context';
import { publishImage } from '@/shared/lib/requests';
import {
  brandNotification,
  isAxiosQueryError,
  isErrorDataString,
} from '@/shared/lib/helpers';
import { EditorTemplate } from '../EditorTemplate';

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
    try {
      const res = await publishImage(file, '');
      return res;
    } catch (err) {
      if (isAxiosQueryError(err)) {
        brandNotification(
          'ERROR',
          isErrorDataString(err.data) ? err.data : err.data.message
        );
      }

      return null;
    }
  }, []);

  return (
    <div
      className={`flex w-full max-w-[700px] flex-col gap-12 rounded border border-brand-grey-400 bg-primary p-4 lg:pb-8 min-[2000px]:max-w-[60%]`}
    >
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
          <EditorTemplate
            kind='multi'
            editor={editor}
            handleImageUpload={handleImageUpload}
          />
        </div>
        {form.errors?.content && (
          <p className='py-1 text-[0.675rem] text-brand-red-400'>
            {form.errors.content}
          </p>
        )}
      </div>
    </div>
  );
}

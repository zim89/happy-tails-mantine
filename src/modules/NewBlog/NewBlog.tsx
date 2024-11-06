'use client';

import EditorContext from '@/modules/EditorWrapper';

import PostEditor from '@/modules/PostEditor';
import ImageBox from '@/modules/ImageBox';
import { Details } from './components/Details';
import { Header } from './components/Header';
import { PostFormContext } from '@/shared/context/postform.context';
import { useContext } from 'react';

export default function NewBlog() {
  const { form } = useContext(PostFormContext);

  return (
    <>
      <EditorContext
        content={form.values.content}
        handleChange={(value) => {
          form.setFieldValue('content', value);
        }}
      >
        {(editor) => (
          <form>
            <Header editor={editor} />
            <div className='flex flex-col gap-16 lg:flex-row'>
              <PostEditor editor={editor} />

              <div className='flex-1'>
                <Details />
                <ImageBox />
              </div>
            </div>
          </form>
        )}
      </EditorContext>
    </>
  );
}

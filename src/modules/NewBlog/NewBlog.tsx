'use client';

import EditorContext from '@/modules/EditorWrapper';

import PostEditor from '@/modules/PostEditor';
import ImageBox from '@/modules/ImageBox';
import { Details } from './components/Details';
import { Header } from './components/Header';
import { PostFormProvider } from '@/shared/context/postform.context';

export default function NewBlog() {
  return (
    <PostFormProvider>
      <EditorContext>
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
    </PostFormProvider>
  );
}

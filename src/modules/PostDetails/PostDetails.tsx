'use client';

import { notFound } from 'next/navigation';

import EditorWrapper from '@/modules/EditorWrapper';
import PostEditor from '@/modules/PostEditor';
import { Details } from './components/Details';
import { Header } from './components/Header';
import ImageBox from '@/modules/ImageBox';
import { useFindOneQuery } from '@/shared/api/postApi';
import Loader from '@/components/Loader/Loader';
import { useContext } from 'react';
import { PostFormContext } from '@/shared/context/postform.context';

type Props = {
  postId: string;
};
export default function PostDetails({ postId }: Props) {
  const { data, isLoading, error } = useFindOneQuery({ id: postId });
  const { form } = useContext(PostFormContext);

  if (isLoading) return <Loader size={164} />;
  if (!data) notFound();
  if (error)
    return (
      <p>
        {
          "Whoops, it shouldn't have happened, our experts are already fixing this!"
        }
      </p>
    );

  return (
    <>
      <EditorWrapper
        content={form.values.content}
        handleChange={(value) => {
          form.setFieldValue('content', value);
        }}
      >
        {(editor) => (
          <>
            <Header editor={editor} post={data} />
            <div className='flex flex-col gap-16 lg:flex-row'>
              <PostEditor editor={editor} />
              <div className='flex-1'>
                <Details status={data.postStatus} />
                <ImageBox />
              </div>
            </div>
          </>
        )}
      </EditorWrapper>
    </>
  );
}

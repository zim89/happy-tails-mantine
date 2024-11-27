'use client';

import { notFound } from 'next/navigation';
import { useContext } from 'react';

import EditorWrapper from '@/modules/EditorWrapper';
import PostEditor from '@/modules/PostEditor';
import { Details } from './components/Details';
import { Header } from './components/Header';
import ImageBox from '@/modules/ImageBox';
import { useFindOneQuery } from '@/shared/api/postApi';
import { PostFormContext } from '@/shared/context/postform.context';
import { PostDetailsSkeleton } from './components/Skeleton';

type Props = {
  postId: string;
};
export default function PostDetails({ postId }: Props) {
  const { data, error, isLoading } = useFindOneQuery({ id: postId });
  const { form } = useContext(PostFormContext);

  if (!data) notFound();
  if (error)
    return (
      <p>
        {
          "Whoops, it shouldn't have happened, our experts are already fixing this!"
        }
      </p>
    );

  if (isLoading) return <PostDetailsSkeleton />;

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

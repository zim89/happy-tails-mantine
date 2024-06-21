'use client';

import EditorWrapper from '@/modules/EditorWrapper';
import PostEditor from '@/modules/PostEditor';
import { Details } from './components/Details';
import { Header } from './components/Header';
import ImageBox from '@/modules/ImageBox';
import { useSelectPosts } from '@/shared/hooks/useSelectPosts';
import { notFound } from 'next/navigation';
import { useFindOneQuery } from '@/shared/api/postApi';
import Loader from '@/components/Loader';

type Props = {
  postId: string;
};
export default function PostDetails({ postId }: Props) {
  const { data, isLoading, error } = useFindOneQuery({ id: postId });

  if (isLoading) return <Loader size={164} />;

  if (!data) notFound();

  return (
    <>
      <EditorWrapper>
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

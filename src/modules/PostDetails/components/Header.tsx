import { useContext, useEffect, useState } from 'react';
import { Editor } from '@tiptap/react';

import { Post } from '@/shared/api/postApi';
import { formatDate } from '@/shared/lib/helpers';
import { CustomBadge } from '@/components/Badge';
import {
  ArchivedController,
  DraftController,
  PublishedController,
} from './Controllers';
import { PostFormContext } from '@/shared/context/postform.context';
import { UnsavedChangesContext } from '@/shared/context/unsaved.context';
import PageHeader from '@/components/PageHeader';

type Props = {
  editor: Editor;
  post: Post;
};
export const Header = ({ editor, post }: Props) => {
  const { form, defaultValues } = useContext(PostFormContext);
  const { update: setUnsavedState } = useContext(UnsavedChangesContext);

  const [isEdited, setIsEdited] = useState(false);
  const editorContent = editor?.getHTML();

  useEffect(() => {
    // I forced to compare editor's text to the default value because whenever I put something or clear in the editor, it wraps the text in <p> tag, so it's always dirty
    const res = form.isDirty();
    setIsEdited(res);
    setUnsavedState((prev) => ({ ...prev, unsavedChanges: res }));
  }, [editorContent, form, defaultValues.content]);

  const handleCancel = () => {
    // Roll back to the initial state
    editor.commands.setContent(defaultValues.content);
    form.reset();
    setIsEdited(false);
  };

  return (
    <>
      <div className='mb-8 items-center justify-between md:flex'>
        <PageHeader>
          {(Group) => (
            <Group
              title='Blog post'
              additional={
                <div className='flex items-baseline gap-3'>
                  {formatDate(post.createdAt, 'MMM DD, YYYY, HH:mm:ss A', true)}
                  <CustomBadge
                    color={post.postStatus.toLowerCase()}
                    name={post.postStatus}
                    palette={{
                      published: '#389B48',
                      draft: '#FBBC04',
                      archived: '#B4B4B4',
                    }}
                  />
                </div>
              }
            />
          )}
        </PageHeader>

        <div className='mt-4 flex gap-3 md:mt-0'>
          {isEdited && post.postStatus === 'PUBLISHED' && (
            <PublishedController
              refetch={() => {
                form.resetDirty();
              }}
              handleCancel={handleCancel}
            />
          )}
          {isEdited && post.postStatus === 'ARCHIVED' && (
            <ArchivedController
              postId={post.id}
              refetch={() => {
                form.resetDirty();
              }}
            />
          )}
          {post.postStatus === 'DRAFT' && (
            <DraftController
              postId={post.id}
              refetch={() => {
                form.resetDirty();
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

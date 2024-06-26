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
import { notifyContext } from '@/shared/context/notification.context';

type Props = {
  editor: Editor;
  post: Post;
};
export const Header = ({ editor, post }: Props) => {
  const { form, defaultValues } = useContext(PostFormContext);
  const { update: setUnsavedState } = useContext(UnsavedChangesContext);
  const { setNotification } = useContext(notifyContext);

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
        <hgroup>
          <h2 className={`mr-1 text-[2rem]/[2.4rem] font-black`}>Blog post</h2>
          <div className='flex items-baseline gap-3'>
            <p>{formatDate(post.createdAt, 'MMM DD, YYYY, HH:mm:ss A')}</p>
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
        </hgroup>
        <div className='mt-4 flex gap-3 md:mt-0'>
          {isEdited && post.postStatus === 'PUBLISHED' && (
            <PublishedController
              setNotification={setNotification}
              refetch={() => {
                form.resetDirty();
              }}
              handleCancel={handleCancel}
            />
          )}
          {isEdited && post.postStatus === 'ARCHIVED' && (
            <ArchivedController
              setNotification={setNotification}
              postId={post.id}
              refetch={() => {
                form.resetDirty();
              }}
            />
          )}
          {post.postStatus === 'DRAFT' && (
            <DraftController
              setNotification={setNotification}
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

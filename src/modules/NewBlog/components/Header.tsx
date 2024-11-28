'use client';

import { UnstyledButton } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { Editor } from '@tiptap/react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { useCreatePostMutation } from '@/shared/api/postApi';

import {
  brandNotification,
  isAxiosQueryError,
  isErrorDataString,
} from '@/shared/lib/helpers';
import PageHeader from '@/components/PageHeader';
import { PostFormContext } from '@/shared/context/postform.context';
import { UnsavedChangesContext } from '@/shared/context/unsaved.context';
import { publishImage } from '@/shared/lib/requests';
import {
  TOO_LARGE_PAYLOAD,
  UNSUPPORTED_TYPE,
} from '@/shared/constants/httpCodes';

type Props = {
  editor: Editor;
};
export const Header = ({ editor }: Props) => {
  const { form, defaultValues } = useContext(PostFormContext);
  const { update: setUnsavedState } = useContext(UnsavedChangesContext);
  const [dispatch] = useCreatePostMutation();
  const router = useRouter();

  const [isEdited, setIsEdited] = useState(false);
  const editorContent = editor?.getHTML();

  // Keep in my mind, whenever you put or clear something in the editor, it wraps the text in <p> tag, so it's always considered to be dirty as defaultValues.content is a plain text node
  const checkIsFormDirty = () => {
    // First, check if the form itself reports being dirty using its isDirty method
    if (!form.isDirty()) return false; // If the form is not dirty, immediately return false

    // Compare the current text in the editor with the default content value
    const isContentSame = editorContent === defaultValues.content;

    // Check if specific form fields ('image', 'isHero', 'title') are not dirty
    const isOtherFieldsNotDirty =
      !form.isDirty('image') &&
      !form.isDirty('isHero') &&
      !form.isDirty('title');

    // The form is considered not dirty if the content is the same as the default
    // and none of the specified fields are dirty
    // If both conditions are true, !(true && true) => false, meaning the form is not dirty
    // If any condition is false, it means there's a difference or a dirty field, hence the form is dirty
    return !(isContentSame && isOtherFieldsNotDirty);
  };

  useEffect(() => {
    // I forced to compare editor's text to the default value because whenever I put something or clear in the editor, it wraps the text in <p> tag, so it's always dirty
    const res = checkIsFormDirty();

    setIsEdited(res);
    setUnsavedState((prev) => ({ ...prev, unsavedChanges: res }));
  }, [editorContent, form, defaultValues.content]);

  const reset = () => {
    // Roll back to the initial state
    form.reset();
    editor.commands.setContent(defaultValues.content);
    setIsEdited(false);
  };

  const handleCancel = () => {
    reset();
  };

  const handleSave = async () => {
    form.validate();
    if (!form.isValid()) return;

    try {
      const { author, content, image, title, isHero } = form.values;

      let posterImgSrc = 'https://placehold.co/600x400.png';

      try {
        if (image) {
          posterImgSrc = await publishImage(
            image,
            `Post poster for: ${form.values.title}`
          );
        }

        const { id } = await dispatch({
          authorName: author || 'Happy Tails Admin',
          content,
          title,
          posterImgSrc,
          hero: isHero,
        }).unwrap();
        router.push(`/admin/blogs/${id}`);
        reset();
        brandNotification('SUCCESS', 'Post creation succeeded!');
      } catch (err) {
        if (err instanceof AxiosError) {
          form.setFieldError('image', err.message);
          throw err;
        }
      }
    } catch (err) {
      if (isAxiosQueryError(err)) {
        if (
          err.status === UNSUPPORTED_TYPE ||
          err.status === TOO_LARGE_PAYLOAD
        ) {
          form.setFieldValue('image', null);
          form.setFieldError('image', `${err.data}`);
        } else {
          brandNotification(
            'ERROR',
            isErrorDataString(err.data) ? err.data : err.data.message
          );
        }
      }
    }
  };

  return (
    <>
      <PageHeader
        rightSection={
          isEdited && (
            <div className='mt-4 flex gap-3 md:mt-0'>
              <UnstyledButton
                classNames={{
                  root: 'text-black text-sm font-bold border w-[150px] text-center rounded-sm border-brand-grey-400 border-solid py-[10px]',
                }}
                onClick={handleCancel}
              >
                Cancel
              </UnstyledButton>
              <UnstyledButton
                classNames={{
                  root: 'rounded-sm text-sm font-bold bg-black w-[150px] text-center py-[10px] text-white',
                }}
                onClick={handleSave}
              >
                Save
              </UnstyledButton>
            </div>
          )
        }
      >
        {(Group) => (
          <>
            <Group
              title='Blog post'
              additional='Сreating and publishing engaging content for our audience.'
            />
          </>
        )}
      </PageHeader>
    </>
  );
};

'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

import Controls from '@/components/Controls';
import {
  useChangePostStatusMutation,
  useUpdatePostMutation,
} from '@/shared/api/postApi';
import { publishImage } from '@/shared/lib/requests';
import {
  brandNotification,
  isAxiosQueryError,
  isErrorDataString,
} from '@/shared/lib/helpers';
import { KEYS } from '@/shared/constants/localStorageKeys';
import { PostFormContext } from '@/shared/context/postform.context';
import { handleError } from '@/shared/helpers/error.helpers';
import { toast } from 'react-toastify';

type PublishedControllerProps = {
  handleCancel: () => void;
  refetch: () => void;
};

export const PublishedController = ({
  refetch,
  handleCancel,
}: PublishedControllerProps) => {
  const { form } = useContext(PostFormContext);
  const [dispatch] = useUpdatePostMutation();

  const handleSave = async () => {
    form.validate();
    if (!form.isValid()) return;

    try {
      const { id, author, content, image, title, isHero } = form.values;
      let posterImgSrc = typeof image === 'string' ? image : '';

      if (form.isDirty('image') && image) {
        try {
          posterImgSrc = await publishImage(
            image,
            `Post poster for: ${form.values.title}`
          );
        } catch (err) {
          if (err instanceof AxiosError) {
            form.setFieldError('image', err.message);
            throw err;
          }
        }
      }

      await dispatch({
        id: id.toString(),
        authorName: author,
        content,
        title,
        posterImgSrc,
        hero: isHero,
      }).unwrap();
      refetch();
      brandNotification('SUCCESS', 'Post has been saved!');
    } catch (err) {
      handleError(err, toast.error);
    }
  };

  return (
    <Controls>
      {({ DarkButton, LightButton }) => (
        <>
          <LightButton handler={handleCancel}>Cancel</LightButton>
          <DarkButton handler={handleSave}>Save</DarkButton>
        </>
      )}
    </Controls>
  );
};

type ArchivedControllerProps = {
  postId: number;
  refetch: () => void;
};

export const ArchivedController = ({
  postId,
  refetch,
}: ArchivedControllerProps) => {
  const [dispatch] = useChangePostStatusMutation();

  const handler = async (id: number, status: 'DRAFT' | 'PUBLISHED') => {
    try {
      await dispatch({ id, status }).unwrap();
      refetch();
      brandNotification(
        'SUCCESS',
        `The post has been ${status === 'DRAFT' ? 'placed in drafts!' : 'published!'}`
      );
    } catch (err) {
      handleError(err, toast.error);
    }
  };

  return (
    <Controls>
      {({ DarkButton, LightButton }) => (
        <>
          <LightButton handler={handler.bind(null, postId, 'DRAFT')}>
            Save as a draft
          </LightButton>
          <DarkButton handler={handler.bind(null, postId, 'PUBLISHED')}>
            Publish
          </DarkButton>
        </>
      )}
    </Controls>
  );
};

type DraftControllerProps = {
  postId: number;
  refetch: () => void;
};

export const DraftController = ({ postId, refetch }: DraftControllerProps) => {
  const { form } = useContext(PostFormContext);
  const [dispatch] = useUpdatePostMutation();
  const [changeStatus] = useChangePostStatusMutation();
  const router = useRouter();

  const save = async () => {
    form.validate();
    if (!form.isValid()) return;

    try {
      const { id, author, content, image, title, isHero } = form.values;
      let posterImgSrc = typeof image === 'string' ? image : '';

      if (form.isDirty('image') && image) {
        posterImgSrc = await publishImage(
          image,
          `Post poster for: ${form.values.title}`
        );
      }

      await dispatch({
        id: id.toString(),
        authorName: author,
        content,
        title,
        posterImgSrc,
        hero: isHero,
      }).unwrap();

      brandNotification('SUCCESS', 'The post has been saved!');
      refetch();
    } catch (err) {
      handleError(err, toast.error);
    }
  };

  const publish = async () => {
    try {
      await save();
      await changeStatus({ id: postId, status: 'PUBLISHED' }).unwrap();
      brandNotification('SUCCESS', 'The post has been published!');
      refetch();
    } catch (err) {
      handleError(err, toast.error);
    }
  };

  return (
    <Controls>
      {({ DarkButton, LightButton, PreviewButton }) => (
        <>
          <PreviewButton
            handler={() => {
              localStorage.setItem(
                KEYS['TEMP_PREVIEW'],
                JSON.stringify(form.values)
              );
              router.push(`/admin/blogs/${postId}/preview`);
            }}
          />
          <LightButton
            handler={async () => {
              await save();
              router.push('/admin/blogs');
            }}
          >
            Save and exit
          </LightButton>
          <DarkButton handler={publish}>Publish</DarkButton>
        </>
      )}
    </Controls>
  );
};

'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UnstyledButton, Checkbox } from '@mantine/core';
import { Eye, Trash2, FolderDown, AlertTriangle, Check } from 'lucide-react';

import classes from '../classes.module.css';
import { Post } from '@/shared/api/postApi';
import { cn } from '@/shared/lib/utils';
import { KEYS } from '@/shared/constants/localStorageKeys';
import { useNotification } from '@/shared/hooks/useNotification';
import Notify from '@/components/Notify';
import DeletePostModal from '@/modules/DeletePostModal';
import ArchivePostModal from '@/modules/ArchivePostModal';
import { PostFormContext } from '@/shared/context/postform.context';

type Props = {
  status: Post['postStatus'];
};

export const Details = ({ status }: Props) => {
  const { form } = useContext(PostFormContext);
  const router = useRouter();

  const [
    setNotification_archived,
    { props: props_archived, clear: clear_archived },
  ] = useNotification({
    failed: {
      color: 'transparent',
      icon: <AlertTriangle size={24} fill='#DC362E' />,
      text: 'Post archivation failed!',
    },
    success: {
      color: '#389B48',
      icon: <Check size={24} />,
      text: 'Post successfully archived!',
    },
  });

  const [
    setNotification_deleted,
    { props: props_deleted, clear: clear_deleted },
  ] = useNotification({
    failed: {
      color: 'transparent',
      icon: <AlertTriangle size={24} fill='#DC362E' />,
      text: 'Post deletion failed!',
    },
    success: {
      color: '#389B48',
      icon: <Check size={24} />,
      text: 'Post successfully deleted!',
    },
  });

  // Checked param doesn't track whether the form was cleared or not (form.reset()); see @/modules/PostDetails/components/Header.tsx - handleCancel function
  const { checked: omitted, value, ...rest } = form.getInputProps('isHero');

  return (
    <>
      <div className='mb-8 rounded border border-brand-grey-400 bg-primary'>
        <p className={classes.auxiliaryHeading}>Details</p>
        <Checkbox
          color='black'
          label='Assign as the main article'
          checked={value}
          {...rest}
          classNames={{
            root: cn(
              'group bg-brand-grey-300 px-4 py-6',
              status === 'DRAFT' && 'mb-8'
            ),
            body: 'checkbox-body',
            inner: 'checkbox-inner',
            input: 'checkbox-input',
            label: 'checkbox-label font-bold',
          }}
        />
        {status !== 'DRAFT' && (
          <div className='flex flex-col items-start gap-4 px-4 py-6'>
            {status === 'PUBLISHED' && (
              <>
                <UnstyledButton
                  onClick={() => {
                    // Temporarily save the state of the content
                    localStorage.setItem(
                      KEYS['TEMP_PREVIEW'],
                      JSON.stringify(form.values)
                    );
                    router.push(`/admin/blogs/${form.values.id}/preview`);
                  }}
                  className='inline-flex items-center gap-2 p-0 text-sm text-secondary outline-none'
                >
                  <Eye size={16} />
                  View the page
                </UnstyledButton>
                <ArchivePostModal
                  id={Number(form.values.id)}
                  setNotification={setNotification_archived}
                  customHandler={(openModal) => (
                    <UnstyledButton
                      onClick={openModal}
                      className='inline-flex items-center gap-2 p-0 text-sm text-secondary outline-none'
                    >
                      <FolderDown size={16} />
                      Add to archive
                    </UnstyledButton>
                  )}
                />
              </>
            )}
            <DeletePostModal
              redirect='/admin/blogs'
              id={Number(form.values.id)}
              setNotification={setNotification_deleted}
              customHandler={(openModal) => (
                <UnstyledButton
                  onClick={openModal}
                  className='inline-flex items-center gap-2 p-0 text-sm text-secondary outline-none'
                >
                  <Trash2 size={16} /> Delete article
                </UnstyledButton>
              )}
            />
          </div>
        )}
      </div>

      <Notify {...props_archived} onClose={clear_archived} />
      <Notify {...props_deleted} onClose={clear_deleted} />
    </>
  );
};

'use client';

import { FileButton, UnstyledButton } from '@mantine/core';
import { useContext } from 'react';
import { LucideRotateCcw, UploadCloud } from 'lucide-react';
import Image from 'next/image';

import classes from './classes.module.css';

import { cn } from '@/shared/lib/utils';
import { PostFormContext } from '@/shared/context/postform.context';
import { MAX_FILE_SIZE } from '@/shared/constants/sizes.const';

export default function FeaturedImage() {
  const { form } = useContext(PostFormContext);
  const image = form.values.image;

  const handleImage = (file: File | null) => {
    if (!file) return;

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return form.setFieldError('image', 'Too large image');
    }

    const regex = /^image\/(gif|webp|png|jpeg)$/;
    const match = file.type.match(regex);

    // Handle unsupported file type
    if (!match) {
      return form.setFieldError('image', 'Unsupported file type');
    }

    form.setFieldValue('image', file);
  };

  const handleRemoveImage = () => {
    form.setFieldValue('image', null);
  };

  return (
    <div className='relative rounded border border-brand-grey-400 bg-primary'>
      <p className={classes.auxiliaryHeading}>Featured image</p>
      {form.errors?.image && (
        <p className='absolute left-4 top-12 text-[0.625rem] text-brand-red-400'>
          {form.errors.image}
        </p>
      )}
      <div
        className={cn(
          'm-4 flex items-center p-3 py-6',
          classes.borderedBox,
          form.errors?.image && classes.error
        )}
      >
        {image ? (
          <div className='flex w-full flex-col'>
            <div className='relative min-h-[120px]'>
              <Image
                src={
                  typeof image === 'string' ? image : URL.createObjectURL(image)
                }
                layout='fill'
                style={{ objectFit: 'cover' }}
                alt='Poster image'
              />
            </div>
            <div className='mt-8 flex justify-between'>
              <UnstyledButton
                classNames={{ root: 'text-sm flex items-center gap-2' }}
                disabled={!form.isDirty('image')}
              >
                <LucideRotateCcw size={16} />
                Update
              </UnstyledButton>
              <UnstyledButton
                classNames={{ root: 'text-sm flex items-center gap-2' }}
                c='#DC362E'
                onClick={handleRemoveImage}
              >
                Remove
              </UnstyledButton>
            </div>
          </div>
        ) : (
          <>
            <FileButton onChange={handleImage} accept='image/png,image/jpeg'>
              {(props) => (
                <UnstyledButton
                  {...props}
                  classNames={{
                    root: 'rounded-sm flex items-center justify-center gap-2 w-full bg-brand-grey-900 text-white font-bold p-2',
                  }}
                  aria-label='Add image'
                  title='Add image'
                >
                  <UploadCloud size={20} /> Add Image
                </UnstyledButton>
              )}
            </FileButton>
          </>
        )}
      </div>
    </div>
  );
}

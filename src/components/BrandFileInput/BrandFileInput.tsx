import { FileInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import { MutableRefObject } from 'react';

import { cn } from '@/shared/lib/utils';
import classes from './classes.module.css';

type FormFields<T extends { image: File | null }> = {
  [K in keyof T]: T[K];
};

type FormReturnType<T extends { image: File | null }> = UseFormReturnType<
  FormFields<T>,
  (values: FormFields<T>) => FormFields<T>
>;

type Props<T extends { image: File | null }> = {
  form: FormReturnType<T>;
  previewImage: MutableRefObject<{
    image: string | null;
    name: string | null;
  }>;
  clearFile: () => void;
};

export const BrandFileInput = <T extends { image: File | null }>({
  form,
  previewImage,
  clearFile,
}: Props<T>) => {
  return (
    <>
      {!previewImage.current?.image || !previewImage.current?.name ? (
        <div className={classes.upload} data-testid='upload'>
          <label htmlFor='file'>
            <UploadCloud color='white' />
            <span>Select Image</span>
          </label>
          <FileInput
            withAsterisk
            id='file'
            fileInputProps={{
              role: 'upload-field',
            }}
            data-testid='upload-field'
            className='pointer-events-none w-full'
            placeholder='Max file size 5 MB'
            {...form.getInputProps('image')}
            accept='.png,.jpeg,.gif,.webp'
            classNames={{
              root: 'form-root',
              wrapper: classes.fileWrapper,
              error: 'form-error -left-[155px]',
              input: cn(
                'form-input',
                classes.fileInput,
                form?.errors?.image && 'form-error--input'
              ),
            }}
          />
        </div>
      ) : (
        <>
          <div
            className={cn(
              classes.previewWrapper,
              form?.errors?.image && 'border !border-brand-red-400'
            )}
            data-testid='preview'
          >
            <Image
              data-testid='preview-image'
              className={classes.previewImage}
              width={32}
              height={32}
              src={previewImage.current.image}
              alt={previewImage.current.name}
            />
            <p data-testid='preview-name'>{previewImage.current.name}</p>
            <button
              onClick={clearFile}
              className='ml-[42px]'
              data-testid='clear-image'
            >
              <X size={14} alignmentBaseline='central' />
            </button>
          </div>
          {form?.errors?.image && (
            <div className='relative'>
              <p className='form-error'>{form.errors.image}</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

import { useContext } from 'react';
import { FileInput, Select, TextInput, Tooltip } from '@mantine/core';
import Image from 'next/image';
import { ChevronDown, Info, UploadCloud, X } from 'lucide-react';

import { useSelectCategories } from '@/shared/hooks/useSelectCategories';
import { productTypeList } from '@/shared/lib/constants';
import { cn } from '@/shared/lib/utils';
import classes from '../classes.module.css';
import { context } from '../lib/utils';
import { ProductStatus } from '@/shared/types/types';
import EditorWrapper from '@/modules/EditorWrapper';
import { AddProductEditor } from './AddProductEditor';

export const Form = () => {
  const { previewImage, productForm } = useContext(context);
  const categoryList = useSelectCategories((cats) => cats);

  const clearFile = () => {
    previewImage.current = {
      path: null,
      name: null,
    };
    productForm.setFieldValue('image', null);
  };

  return (
    <div className={classes.form}>
      <h3 className='mb-6 border-b border-b-brand-grey-400 py-2 text-xl font-bold'>
        Product Options
      </h3>

      <div className='flex flex-col justify-between gap-6 md:flex-row lg:gap-[42px]'>
        <div className='w-full md:max-w-[60%]'>
          <div className={classes.inputRow}>
            <TextInput
              {...productForm.getInputProps('name')}
              withAsterisk
              classNames={{
                root: 'form-root w-full',
                label: 'form-label',
                wrapper: 'flex gap-2 focus:outline outline-2',
                section: 'static w-auto text-secondary whitespace-nowrap',
                input: cn(
                  'form-input px-2 outline-none',
                  productForm?.errors?.name && 'form-error--input'
                ),
                error: 'form-error',
              }}
              type='text'
              label='Name'
            />
          </div>
          <div className={classes.inputRow}>
            <TextInput
              {...productForm.getInputProps('price')}
              withAsterisk
              classNames={{
                root: 'form-root w-full',
                label: 'form-label',
                wrapper: 'flex gap-2 focus:outline outline-2',
                section: 'static w-auto text-secondary whitespace-nowrap',
                input: cn(
                  'form-input rounded-sm px-2 outline-none',
                  productForm?.errors?.price && 'form-error--input'
                ),
                error: 'form-error',
              }}
              type='number'
              min={0}
              max={Number.MAX_SAFE_INTEGER}
              label='Price, $'
            />
            <Select
              {...productForm.getInputProps('productStatus')}
              withAsterisk
              classNames={{
                root: 'form-root w-full',
                label: 'form-label',
                wrapper:
                  'flex border border-brand-grey-400 rounded-sm px-2 gap-2 focus:outline outline-2 bg-primary',
                section: 'static w-auto text-secondary whitespace-nowrap',
                option: 'text-xs',
                input: cn(
                  'form-input border-0 p-0 outline-none',
                  productForm?.errors?.productStatus && 'form-error--input'
                ),
                error: 'form-error',
              }}
              rightSection={<ChevronDown color='black' size={16} />}
              type='text'
              label='Status'
              data={['IN STOCK', 'OUT OF STOCK'] as ProductStatus[]}
            />
          </div>
          <div className={classes.inputRow}>
            <Select
              {...productForm.getInputProps('categoryName')}
              defaultValue={null}
              withAsterisk
              classNames={{
                root: 'form-root w-full',
                label: 'form-label',
                wrapper:
                  'flex border border-brand-grey-400 rounded-sm px-2 gap-2 focus:outline outline-2 bg-primary',
                section: 'static w-auto text-secondary whitespace-nowrap',
                option: 'text-xs',
                input: cn(
                  'form-input border-0 p-0 outline-none',
                  productForm?.errors?.categoryName && 'form-error--input'
                ),
                error: 'form-error',
              }}
              rightSection={<ChevronDown color='black' size={16} />}
              type='text'
              label='Category'
              data={categoryList.map((cat) => cat.name)}
            />

            <Select
              {...productForm.getInputProps('productType')}
              classNames={{
                root: 'form-root w-full',
                label: 'form-label',
                wrapper:
                  'flex border border-brand-grey-400 rounded-sm px-2 gap-2 focus:outline outline-2 bg-primary',
                section: 'static w-auto text-secondary whitespace-nowrap',
                option: 'text-xs',
                input: cn(
                  'form-input border-0 p-0 outline-none',
                  productForm?.errors?.productType && 'form-error--input'
                ),
                error: 'form-error',
              }}
              rightSection={<ChevronDown color='black' size={16} />}
              data={productTypeList}
              type='text'
              label='Type'
            />
          </div>

          {!previewImage.current?.path || !previewImage.current?.name ? (
            <>
              <div className={classes.upload}>
                <p className='m-0 flex items-center gap-1'>
                  <span>
                    Image{' '}
                    <span className='text-[var(--mantine-color-error)]'>*</span>
                  </span>
                  <Tooltip label='.jpeg,.jpg,.png,.gif,.apng,.tiff' withArrow>
                    <Info
                      size={16}
                      className='-mb-[3px] cursor-pointer'
                      color='#5A5A5A'
                    />
                  </Tooltip>
                </p>
                <div>
                  <label htmlFor='file' className=''>
                    <UploadCloud color='white' />
                    <span>Select Image</span>
                  </label>
                  <FileInput
                    withAsterisk
                    id='file'
                    w='100%'
                    placeholder='Max file size 5 MB'
                    {...productForm.getInputProps('image')}
                    accept='.png,.jpeg,.gif,.webp'
                    classNames={{
                      root: 'form-root',
                      wrapper: classes.fileWrapper,
                      error: 'form-error -left-[155px]',
                      input: cn(
                        'form-input',
                        classes.fileInput,
                        productForm?.errors?.image && 'form-error--input'
                      ),
                    }}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className={classes.previewWrapper}>
              <Image
                className={classes.previewImage}
                width={32}
                height={32}
                src={previewImage.current.path}
                alt=''
              />
              <p>{previewImage.current.name}</p>
              <button className={classes.clearImage} onClick={clearFile}>
                <X size={14} alignmentBaseline='central' />
              </button>
            </div>
          )}
        </div>
        <EditorWrapper
          content={productForm.values.description}
          handleChange={(value) => {
            productForm.setFieldValue('description', value);
          }}
        >
          {(editor) => <AddProductEditor editor={editor} />}
        </EditorWrapper>
      </div>
    </div>
  );
};

'use client';

import { useCallback, useEffect, useRef } from 'react';
import {
  UnstyledButton,
  InputLabel,
  TextInput,
  Tooltip,
  Textarea,
} from '@mantine/core';
import { Info } from 'lucide-react';
import { hasLength, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

import styles from './UpdateCategoryModal.module.css';

import Modal from '@/components/ModalWindow/ModalWindow';
import ModalHeader from '@/components/ModalHeader';
import ModalFooter from '@/components/ModalFooter';
import { useUpdateCategoryMutation } from '@/shared/api/categoryApi';
import { cn } from '@/shared/lib/utils';
import {
  brandNotification,
  isAxiosQueryError,
  isErrorDataString,
} from '@/shared/lib/helpers';
import { Category } from '@/shared/types/types';
import { publishImage } from '@/shared/lib/requests';
import {
  TOO_LARGE_PAYLOAD,
  UNSUPPORTED_TYPE,
} from '@/shared/constants/httpCodes';
import { BrandFileInput } from '@/components/BrandFileInput';

type Props = {
  categoryLine: Category;
};
export default function UpdateCategoryModal({ categoryLine }: Props) {
  const [dispatch] = useUpdateCategoryMutation();
  const previewImage = useRef<{ image: string | null; name: string | null }>({
    image: null,
    name: null,
  });

  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      categoryName: '',
      image: null as File | null,
      description: categoryLine.description,
    },

    onValuesChange(values) {
      if (values.image && previewImage.current) {
        previewImage.current.image = URL.createObjectURL(values.image);
        previewImage.current.name = values.image.name;
      }
    },

    validate: {
      categoryName: hasLength(
        { min: 2, max: 50 },
        'Name should be between 2 and 50 characters long.'
      ),
      description: (value) => {
        if (!value.trim().length) {
          return 'Description is required';
        } else if (hasLength({ min: 0, max: 255 })(value)) {
          return 'Description should not exceed 255 characters';
        }
      },
    },
  });

  const changeThumbnail = useCallback(() => {
    if (categoryLine.imgSrc) {
      previewImage.current = {
        image: categoryLine.imgSrc,
        name: categoryLine.name,
      };
    }
  }, [categoryLine.id]);

  // When the list of categories is changed, change the form values respectively
  useEffect(() => {
    if (!opened) changeThumbnail();
  }, [categoryLine.id, opened]);

  const clearFile = () => {
    previewImage.current = {
      image: null,
      name: null,
    };
    form.setFieldValue('image', null);
  };

  const clearAndClose = () => {
    form.reset();
    close();
  };

  const handleSubmit = async ({
    categoryName,
    image,
    description,
  }: (typeof form)['values']) => {
    try {
      const res = form.validate();

      if (res.hasErrors) return;

      const { updatedAt, productCount, ...category } = categoryLine;

      let requestBody = {
        ...category,
        name: categoryName,
        description,
        title: categoryName,
      };

      // Uploading an image
      if (image) {
        requestBody.imgSrc = await publishImage(
          image,
          `Category: ${categoryName}`
        );
      }

      await dispatch({ req: requestBody }).unwrap();

      clearAndClose();
      brandNotification('SUCCESS', 'Changes saved!');
    } catch (err) {
      if (isAxiosQueryError(err)) {
        // If a file doesn't match the criterias, then just notify the user, don't close the modal
        if (
          err.status === UNSUPPORTED_TYPE ||
          err.status === TOO_LARGE_PAYLOAD
        ) {
          form.setFieldValue('image', null);
          form.setFieldError('image', `${err.data}`);
        } else {
          clearAndClose();
          brandNotification(
            'ERROR',
            isErrorDataString(err.data) ? err.data : err.data.message
          );
        }
        console.error(err);
      }
    }
  };

  return (
    <>
      <UnstyledButton className={styles.actionButton} onClick={open}>
        Update
      </UnstyledButton>

      <Modal
        size={694}
        opened={opened}
        classNames={{
          header: styles.modalHeader,
          content: styles.modalContent,
        }}
        onClose={close}
      >
        <ModalHeader heading='Update Category' handleClose={close} />

        <form>
          <TextInput
            classNames={{
              root: 'form-root',
              label: 'form-label',
              wrapper: 'flex border-2 p-2 gap-2 focus:outline outline-2',
              section: 'static w-auto text-secondary whitespace-nowrap',
              input: cn(
                'form-input rounded-sm border-0 p-0 outline-none',
                form?.errors?.categoryName && 'form-error--input'
              ),
              error: 'form-error',
            }}
            withAsterisk
            withErrorStyles
            type='text'
            label='Category Name'
            {...form.getInputProps('categoryName')}
            rightSection={
              <button
                type='button'
                className='hover:underline'
                onClick={() =>
                  form.setFieldValue('categoryName', categoryLine.name)
                }
              >
                {categoryLine.name}
              </button>
            }
          />

          <Textarea
            withAsterisk
            rows={10}
            classNames={{
              root: 'form-root w-full mt-4',
              label: 'form-label',
              wrapper: 'grid h-full',
              input: cn(
                'form-input textarea p-2',
                form?.errors?.description && 'form-error--input'
              ),
              error: 'form-error -bottom-4',
            }}
            label='Description'
            {...form.getInputProps('description')}
          />

          <InputLabel
            classNames={{
              label: styles.fileLabel,
            }}
          >
            <span>
              {' '}
              Image <span className='text-[var(--mantine-color-error)]'>*</span>
            </span>
            <Tooltip label='.png, .jpeg, .gif, .webp'>
              <Info size={16} className='cursor-pointer' />
            </Tooltip>
          </InputLabel>

          <BrandFileInput
            clearFile={clearFile}
            form={form}
            previewImage={previewImage}
          />
        </form>

        <ModalFooter
          singleBtn={false}
          secondaryBtnText='Cancel'
          secondaryBtnOnClick={clearAndClose}
          primaryBtnText='Save'
          primaryBtnOnClick={() => handleSubmit(form.values)}
        />
      </Modal>
    </>
  );
}

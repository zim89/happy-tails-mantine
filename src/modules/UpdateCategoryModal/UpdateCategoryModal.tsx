'use client';

import { useCallback, useContext, useEffect, useRef } from 'react';
import {
  UnstyledButton,
  FileInput,
  InputLabel,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { Info, UploadCloud, X } from 'lucide-react';
import { hasLength, isNotEmpty, useForm } from '@mantine/form';
import Image from 'next/image';
import { useDisclosure } from '@mantine/hooks';

import styles from './UpdateCategoryModal.module.css';

import Modal from '@/components/ModalWindow/ModalWindow';
import ModalHeader from '@/components/ModalHeader';
import ModalFooter from '@/components/ModalFooter';
import { useUpdateCategoryMutation } from '@/shared/api/categoryApi';
import { cn } from '@/shared/lib/utils';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';
import { Category } from '@/shared/types/types';
import { notifyContext } from '@/shared/context/notification.context';
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

  const { setNotification } = useContext(notifyContext);

  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      categoryName: '',
      image: null as File | null,
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
  }: (typeof form)['values']) => {
    try {
      const res = form.validate();

      if (res.hasErrors) return;

      const { updatedAt, productCount, ...category } = categoryLine;

      let requestBody = {
        ...category,
        name: categoryName,
        title: categoryName,
        description: `Category name: ${categoryName}`,
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
      setNotification('Success', 'Changes saved!');
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
          setNotification(
            'Failed',
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

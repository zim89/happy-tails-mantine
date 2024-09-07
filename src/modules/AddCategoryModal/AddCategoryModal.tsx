'use client';

import { useContext, useRef } from 'react';
import {
  Button,
  FileInput,
  InputLabel,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { Info, PlusCircle, UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';

import styles from './AddCategoryModal.module.css';
import { useAddNewCategoryMutation } from '@/shared/api/categoryApi';
import { DEFAULT_CATEGORY_IMAGE } from '@/shared/lib/constants';

import Modal from '@/components/ModalWindow/ModalWindow';
import ModalHeader from '@/components/ModalHeader';
import ModalFooter from '@/components/ModalFooter';
import { cn } from '@/shared/lib/utils';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';
import { notifyContext } from '@/shared/context/notification.context';
import { file } from 'googleapis/build/src/apis/file';

export default function AddCategoryModal() {
  const [dispatch] = useAddNewCategoryMutation();
  const { setNotification } = useContext(notifyContext);

  const previewImage = useRef<{ image: string | null; name: string | null }>({
    image: null,
    name: null,
  });

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
      categoryName: (value) =>
        !value.trim() ? 'Entered an invalid category name' : null,
      image: isNotEmpty('Image must not be empty'),
    },
  });

  const clearFile = () => {
    previewImage.current = {
      image: null,
      name: null,
    };
    form.setFieldValue('image', null);
  };

  const clearAndClose = () => {
    form.reset();
    clearFile();
    close();
  };

  const handleSubmit = async ({
    categoryName,
    image,
  }: (typeof form)['values']) => {
    try {
      const res = form.validate();

      if (res.hasErrors) return;

      let imgSrc = DEFAULT_CATEGORY_IMAGE;

      if (image && process.env.NODE_ENV === 'production') {
        const regex = /^image\/(gif|webp|png|jpeg)$/;
        const match = image.type.match(regex);

        if (!match) {
          clearAndClose();
          setNotification(
            'Failed',
            'Forbidden image type. Available image types are: gif, webp, png and jpeg'
          );
          return;
        }

        const form = new FormData();
        form.append('image', image);
        form.append('title', `CATEGORY: ${categoryName}`);

        const res = await axios.post('https://api.imgur.com/3/image/', form, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        imgSrc = res.data.data.link;
      }

      const newCategory = {
        name: categoryName,
        title: categoryName,
        imgSrc,
        coordinateOnBannerX: 0,
        coordinateOnBannerY: 0,
      };

      await dispatch(newCategory).unwrap();

      clearAndClose();
      setNotification('Success', 'Category successfully created!');
    } catch (err) {
      clearAndClose();
      if (isAxiosQueryError(err)) {
        setNotification(
          'Failed',
          isErrorDataString(err.data) ? err.data : err.data.message
        );
      }
      console.error(err);
    }
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <hgroup>
          <h2>Categories</h2>
          <p>Manage your product categories</p>
        </hgroup>
        <Button
          leftSection={<PlusCircle size={20} />}
          onClick={open}
          bg={'black'}
          data-testid='modal-handler'
        >
          Add category
        </Button>
      </div>

      <Modal
        size={694}
        opened={opened}
        classNames={{
          header: styles.modalHeader,
          content: styles.modalContent,
        }}
        onChange={() => {}}
        onClose={close}
      >
        <ModalHeader heading='Add Category' handleClose={close} />

        <form data-testid='modal-form'>
          <TextInput
            withAsterisk
            classNames={{
              root: 'form-root',
              label: 'form-label',
              wrapper: 'flex border-2 gap-2 focus:outline outline-2',
              section: 'static w-auto text-secondary whitespace-nowrap',
              input: cn(
                'form-input h-[40px] rounded-sm border-0 p-1 outline-none',
                form?.errors?.categoryName && 'form-error--input'
              ),
              error: 'form-error',
            }}
            withErrorStyles
            type='text'
            label='Category Name'
            data-testid='category-input'
            {...form.getInputProps('categoryName')}
          />

          <InputLabel
            classNames={{
              label: styles.fileLabel,
            }}
          >
            <span>
              Image <span className='text-[var(--mantine-color-error)]'>*</span>
            </span>
            <Tooltip label='.png, .jpeg, .gif, .webp'>
              <Info size={16} className='cursor-pointer' />
            </Tooltip>
          </InputLabel>

          {!previewImage.current?.image || !previewImage.current?.name ? (
            <div className={styles.upload} data-testid='upload'>
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
                placeholder='Max file size 500 kB'
                {...form.getInputProps('image')}
                accept='.png,.jpeg,.gif,.webp'
                classNames={{
                  root: 'form-root',
                  wrapper: styles.fileWrapper,
                  error: 'form-error -left-[155px]',
                  input: cn(
                    'form-input',
                    styles.fileInput,
                    form?.errors?.image && 'form-error--input'
                  ),
                }}
              />
            </div>
          ) : (
            <div className={styles.previewWrapper} data-testid='preview'>
              <Image
                data-testid='preview-image'
                className={styles.previewImage}
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
          )}
        </form>

        <ModalFooter
          singleBtn={false}
          secondaryBtnText='Cancel'
          secondaryBtnOnClick={clearAndClose}
          primaryBtnText='Save'
          primaryBtnOnClick={() => {
            handleSubmit(form.values);
          }}
        />
      </Modal>
    </>
  );
}

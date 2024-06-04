'use client';

import { useRef } from 'react';
import {
  Button,
  FileInput,
  InputLabel,
  TextInput,
  Tooltip,
} from '@mantine/core';
import {
  Info,
  PlusCircle,
  UploadCloud,
  X,
  Check,
  AlertTriangle,
} from 'lucide-react';
import Image from 'next/image';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';

import styles from './AddCategoryModal.module.css';
import { useAddNewCategoryMutation } from '@/shared/api/categoryApi';
import { DEFAULT_CATEGORY_IMAGE } from '@/shared/lib/constants';

import Modal from '@/components/ModalWindow';
import Notify from '@/components/Notify';
import ModalHeader from '@/components/ModalHeader';
import ModalFooter from '@/components/ModalFooter';
import { cn } from '@/shared/lib/utils';
import { useNotification } from '@/shared/hooks/useNotification';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';

export default function AddCategoryModal() {
  const [dispatch] = useAddNewCategoryMutation();
  const [setNotification, { props, clear }] = useNotification({
    failed: {
      icon: <AlertTriangle size={24} fill='#DC362E' />,
      color: 'transparent',
      text: 'Category creating failed',
    },
    success: {
      icon: <Check size={24} />,
      color: '#389B48',
      text: 'Category successfully added!',
    }
  })

  const previewImage = useRef<{ image: string | null; name: string | null }>({
    image: null,
    name: null,
  });

  const handleClose = () => {
    clear();
  };

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
      let imgSrc = DEFAULT_CATEGORY_IMAGE;

      if (image) {
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
      setNotification('Success');
    } catch (err) {
      clearAndClose();
      if (isAxiosQueryError(err)) {
        setNotification('Failed', isErrorDataString(err.data) ? err.data : err.data.message);
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

        <form>
          <TextInput
            classNames={{
              root: 'form-root',
              label: 'form-label',
              wrapper: 'flex border-2 gap-2 focus:outline outline-2',
              section: 'static w-auto text-[#161616] whitespace-nowrap',
              input: cn(
                'form-input rounded-sm border-0 p-1 outline-none h-[40px]',
                form?.errors?.categoryName && 'form-error--input'
              ),
              error: 'form-error',
            }}
            withErrorStyles
            type='text'
            label='Category Name'
            {...form.getInputProps('categoryName')}
          />

          <InputLabel
            classNames={{
              label: styles.fileLabel,
            }}
          >
            <span>Image</span>
            <Tooltip label='.png, .jpeg, .gif, .webp'>
              <Info size={16} className='cursor-pointer' />
            </Tooltip>
          </InputLabel>

          {!previewImage.current?.image || !previewImage.current?.name ? (
            <div className={styles.upload}>
              <label htmlFor='file'>
                <UploadCloud color='white' />
                <span>Select Image</span>
              </label>
              <FileInput
                id='file'
                className='pointer-events-none w-full'
                placeholder='Max file size 500 kB'
                {...form.getInputProps('image')}
                accept='.png,.jpeg,.gif,.webp'
                classNames={{
                  wrapper: styles.fileWrapper,
                  input: cn('form-input', styles.fileInput),
                }}
              />
            </div>
          ) : (
            <div className={styles.previewWrapper}>
              <Image
                className={styles.previewImage}
                width={32}
                height={32}
                src={previewImage.current.image}
                alt={previewImage.current.name}
              />
              <p>{previewImage.current.name}</p>
              <button onClick={clearFile} className='ml-[42px]'>
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
          primaryBtnOnClick={form.onSubmit((values) => handleSubmit(values))}
        />
      </Modal>

      <Notify {...props} onClose={handleClose} />
    </>
  );
}

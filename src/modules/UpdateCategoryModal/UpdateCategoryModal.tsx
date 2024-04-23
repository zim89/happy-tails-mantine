"use client";
import { useEffect, useRef, useState } from 'react';
import {
  Button,
  FileInput,
  InputLabel,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { Info, UploadCloud, X, Check, AlertTriangle } from 'lucide-react';

import styles from './UpdateCategoryModal.module.css';
import { useDisclosure } from '@mantine/hooks';
import { isNotEmpty, useForm } from '@mantine/form';

import Notify, { NotifyProps } from '@/components/Notify';

import Modal from '@/components/ModalWindow';
import ModalHeader from '@/components/ModalHeader';
import ModalFooter from '@/components/ModalFooter';
import { Category, useUpdateCategoryMutation } from '@/shared/api/categoryApi';
import Image from 'next/image';
import { useAuth } from '@/shared/hooks/useAuth';
import axios from 'axios';
import { cn } from '@/shared/lib/utils';

type Props = {
  categoryLine: Category & { image: { path: string; name: string } };
};
export default function UpdateCategoryModal({ categoryLine }: Props) {
  const { access_token } = useAuth();
  const [dispatch] = useUpdateCategoryMutation();
  const [notificationType, setNotificationType] = useState('');
  const previewImage = useRef<(typeof categoryLine)['image']>();

  const handleClose = () => {
    setNotificationType('');
  };

  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      categoryName: '',
      image: null as File | null,
    },

    onValuesChange(values) {
      if (values.image && previewImage.current) {
        previewImage.current.path = URL.createObjectURL(values.image);
        previewImage.current.name = values.image.name;
      }
    },

    validate: {
      categoryName: isNotEmpty('The category name should be filled'),
    },
  });

  const changeThumbnail = () => {
    previewImage.current = {
      path: categoryLine.image.path,
      name: categoryLine.image.name,
    };
  };

  // When the list of categories is changed, change the form values respectively
  useEffect(() => {
    changeThumbnail();
  }, [categoryLine.id]);

  const clearFile = () => {
    previewImage.current = {
      path: '',
      name: '',
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
      let requestBody = {
        ...categoryLine,
        name: categoryName,
      };
  
      // Uploading an image
      if (image) {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('type', 'image');
        formData.append('title', `Category image: ${categoryName}`);
  
        const res = await axios.post('https://api.imgur.com/3/image/', formData, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
            'Content-Type': 'multipart/form-data',
          },
        });
  
        requestBody.imgSrc = res.data.data.link;
      }
  
      await dispatch({ req: requestBody, access_token });
  
      clearAndClose();
      setNotificationType('Success');
    } catch (err) {
      setNotificationType('Failed');
      console.error(err);
    }
  };

  const notifyProps: Omit<NotifyProps, 'onClose'> | null =
    notificationType === 'Success'
      ? {
          kind: 'success',
          icon: <Check size={15} />,
          color: '#389B48',
          visible: true,
          text: 'Changes saved!',
        }
      : notificationType === 'Failed'
        ? {
            kind: 'fail',
            icon: <AlertTriangle size={15} />,
            color: '#DC362E',
            visible: true,
            text: 'Failed to update!',
          }
        : null;

  return (
    <>
      <Button className={styles.actionButton} onClick={open}>
        Update
      </Button>

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
              section: 'static w-auto text-[#161616] whitespace-nowrap',
              input: cn(
                'form-input rounded-sm border-0 p-0 outline-none',
                form?.errors?.categoryName && 'form-error--input'
              ),
              error: 'form-error',
            }}
            withErrorStyles
            type='text'
            label='Category Name'
            {...form.getInputProps('categoryName')}
            rightSection={categoryLine.name}
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

          {!previewImage.current?.path || !previewImage.current?.name ? (
            <div className={styles.upload}>
              <label htmlFor='file'>
                <UploadCloud color='white' />
                <span>Select Image</span>
              </label>
              <FileInput
                id='file'
                w='100%'
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
                src={previewImage.current.path}
                alt={previewImage.current.name}
              />
              <p>{previewImage.current.name}</p>
              <button onClick={clearFile} className={styles.clearImage}>
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

      {notifyProps && <Notify {...notifyProps} onClose={handleClose} />}
    </>
  );
}

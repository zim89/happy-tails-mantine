import { useEffect, useRef, useState } from 'react';
import {
  Button,
  FileInput,
  InputLabel,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { Info, UploadCloud, X, Check } from 'lucide-react';

import styles from './UpdateCategoryModal.module.css';
import { useDisclosure } from '@mantine/hooks';
import Modal from '@/components/ModalWindow';
import { useForm } from '@mantine/form';

import Notify from '@/components/Notify';

import ModalHeader from '@/components/ModalHeader';
import ModalFooter from '@/components/ModalFooter';
import { Category, useUpdateCategoryMutation } from '@/shared/api/categoryApi';
import Image from 'next/image';
import { useAuth } from '@/shared/hooks/useAuth';

type Props = {
  categoryLine: Category & { image: { path: string; name: string } };
};
export default function UpdateCategoryModal({ categoryLine }: Props) {
  const { access_token } = useAuth();
  const [isNotified, setIsNotified] = useState(false);
  const [dispatch] = useUpdateCategoryMutation();
  const previewImage = useRef<(typeof categoryLine)['image']>();

  console.log(categoryLine);

  const handleClose = () => {
    setIsNotified(false);
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
      categoryName: (value) =>
        !value.trim() ? 'Entered a valid category name' : null,
    },
  });

  const changeThumbnail = () => {
    previewImage.current = {
      path: categoryLine.image.path,
      name: categoryLine.image.name,
    };
  }

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
    // TODO: image upload

    const { image: thumbnail, ...requestBody } = {
      ...categoryLine,
      name: categoryName,
    };

    await dispatch({ req: requestBody, access_token });

    clearAndClose();
    setIsNotified(true);
  };

  return (
    <>
      <Button className={styles.actionButton} onClick={open}>
        Update
      </Button>

      <Modal
        size={694}
        opened={opened}
        classNames={{
          header: 'hidden',
          content: 'py-[14px] px-6',
        }}
        onClose={close}
      >
        <ModalHeader heading='Update Category' handleClose={close} />
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            classNames={{
              input: 'rounded-sm outline-none border-0 p-0',
              label: 'mb-1',
              wrapper: 'flex border-2 p-2 gap-2 focus:outline outline-2',
              section: 'static w-auto text-[#161616] whitespace-nowrap',
            }}
            withErrorStyles
            type='text'
            label='Category Name'
            {...form.getInputProps('categoryName')}
            rightSection={categoryLine.name}
          />

          <InputLabel
            classNames={{
              label: 'flex gap-[10px] items-center mt-7 mb-1',
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
                className='pointer-events-none w-full'
                placeholder='Max file size 500 kB'
                {...form.getInputProps('image')}
                accept='image/*'
                classNames={{
                  wrapper: 'h-full',
                  input: "h-full rounded-sm font-['Arial']",
                }}
              />
            </div>
          ) : (
            <div className='flex max-w-max items-center gap-2 border-[1px] border-[#C8C8C8] bg-[#f7f7f7] px-4 py-1'>
              <Image
                className='h-8 w-8 object-contain'
                width={32}
                height={32}
                src={previewImage.current.path}
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

      <Notify
        icon={<Check size={15} />}
        color='#389B48'
        visible={isNotified}
        onClose={handleClose}
        text='Changes saved!'
      />
    </>
  );
};

import { useRef, useState } from 'react';
import {
  Button,
  FileInput,
  InputLabel,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { Info, PlusCircle, UploadCloud, X, Check } from 'lucide-react';
import Image from 'next/image';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';

import styles from './AddCategoryModal.module.css';
import { useAuth } from '@/shared/hooks/useAuth';
import { useAddNewCategoryMutation } from '@/shared/api/categoryApi';
import { DEFAULT_CATEGORY_IMAGE } from '@/shared/lib/constants';

import Modal from '@/components/ModalWindow';
import Notify from '@/components/Notify';
import ModalHeader from '@/components/ModalHeader';
import ModalFooter from '@/components/ModalFooter';

export default function AddCategoryModal() {
  const { accessToken, currentUser } = useAuth();
  const [dispatch] = useAddNewCategoryMutation();

  const [isNotified, setIsNotified] = useState(false);
  const previewImage = useRef<{ image: string | null; name: string | null }>({
    image: null,
    name: null,
  });

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
    // TODO: image upload
    let imgSrc = DEFAULT_CATEGORY_IMAGE;

    if (image) {
      const form = new FormData();
      form.append('image', image);
      form.append('title', 'CATEGORY: image deploy');

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
      productCount: 0,
      imgSrc,
      access_token: accessToken,
    };

    await dispatch(newCategory);

    clearAndClose();
    setIsNotified(true);
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <hgroup>
          <h2>Category</h2>
          <p>Manage your product category</p>
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
          header: 'hidden',
          content: 'py-[14px] px-6',
        }}
        onChange={() => {}}
        onClose={close}
      >
        <ModalHeader heading='Add Category' handleClose={close} />

        <form>
          <TextInput
            classNames={{ input: 'ounded-sm', label: 'mb-1' }}
            withErrorStyles
            type='text'
            label='Category Name'
            {...form.getInputProps('categoryName')}
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

      <Notify
        icon={<Check size={15} />}
        color='#389B48'
        visible={isNotified}
        onClose={handleClose}
        text='Category successfully added!'
      />
    </>
  );
}

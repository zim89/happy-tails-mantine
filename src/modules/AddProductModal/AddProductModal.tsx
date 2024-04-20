"use client";
import { useRef } from 'react';
import {
  Button,
  FileInput,
  Group,
  Select,
  Textarea,
  TextInput
} from '@mantine/core';
import { PlusCircle, UploadCloud, X, Check } from 'lucide-react';
import Image from 'next/image';
import { Form, isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';

import styles from './AddProductModal.module.css';
import { useAuth } from '@/shared/hooks/useAuth';
import { DEFAULT_CATEGORY_IMAGE } from '@/shared/lib/constants';

import Modal from '@/components/ModalWindow';
import Notify from '@/components/Notify';
import ModalHeader from '@/components/ModalHeader';
import ModalFooter from '@/components/ModalFooter';
import { cn } from '@/shared/lib/utils';
import { useCreateMutation } from '@/shared/api/productApi';
import { Product } from '@/shared/types/types';
import { useSelectCategories } from '@/shared/hooks/useSelectCategories';

type PreviewImage = {
  name: string | null;
  path: string | null;
};

export default function AddProductModal() {
  const { access_token } = useAuth();
  const [dispatch] = useCreateMutation();
  const categoryList = useSelectCategories(cats => cats);

  const previewImage = useRef<PreviewImage>({ name: '', path: '' });
  const [isNotified, { open: openNotification, close: closeNotification }] =
    useDisclosure(false);

  const handleClose = () => {
    closeNotification();
  };

  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      name: "",
      code: "",
      categoryName: "" as Product["categoryName"],
      price: 0,
      quantity: 0,
      productStatus: "" as Product["productStatus"],
      description: "",
      image: null as File | null,
    },

    onValuesChange(values) {
      if (values.image && previewImage.current) {
        previewImage.current.path = URL.createObjectURL(values.image);
        previewImage.current.name = values.image.name;
      }
    },

    validate: {
      name: isNotEmpty('Entered an invalid product name'),
      categoryName: isNotEmpty('Pick a category for the product'),
      code: isNotEmpty("Entered an invalid product code"),
      price: val => val < 1 ? "Entered an invalid price" : null,
      quantity: val => val < 1 ? "Entered an invalid quantity" : null,
      productStatus: isNotEmpty("Pick a product status"),
      description: isNotEmpty("Enter a description"),
    },
  });

  const clearFile = () => {
    previewImage.current = {
      path: null,
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
    image,
    code,
    ...rest
  }: (typeof form)['values']) => {
    let imagePath = DEFAULT_CATEGORY_IMAGE;

    if (image) {
      const form = new FormData();
      form.append('image', image);
      form.append('title', `PRODUCT: ${name}`);

      const res = await axios.post('https://api.imgur.com/3/image/', form, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      imagePath = res.data.data.link;
    }

    const newProduct: Partial<Product> = {
      ...rest,
      article: code,
      imagePath
    };

    const candidate = categoryList.find(cat => cat.name === newProduct.categoryName);
    candidate && (newProduct.categoryId = candidate.id);

    await dispatch({ req: newProduct, access_token });
    
    clearAndClose();
    openNotification();
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <hgroup className='pb-6'>
          <h1 className='text-[32px] font-bold'>Products</h1>
          <p>Manage your product catalog</p>
        </hgroup>
        <Button className='bg-black' onClick={open}>
          <PlusCircle width={16} className='mr-[10px]' />
          Add product
        </Button>
      </div>

      <Modal
        size={1151}
        opened={opened}
        classNames={{
          header: styles.modalHeader,
          content: styles.modalContent,
        }}
        onChange={() => {}}
        onClose={close}
      >
        <ModalHeader heading='Add New Product' handleClose={close} />

        <Form form={form}>
          <div className='flex gap-[42px]'>
            <Group className='flex-column flex gap-[30px]'>
              <TextInput
                {...form.getInputProps('name')}
                classNames={{
                  root: 'form-root w-full',
                  label: 'form-label',
                  wrapper: 'flex border-2 px-2 gap-2 focus:outline outline-2',
                  section: 'static w-auto text-[#161616] whitespace-nowrap',
                  input: cn(
                    'form-input rounded-sm border-0 p-0 outline-none',
                    form?.errors?.name && 'form-error--input'
                  ),
                  error: 'form-error',
                }}
                type='text'
                label='Name'
              />
              <TextInput
                {...form.getInputProps('code')}
                classNames={{
                  root: 'form-root w-full',
                  label: 'form-label',
                  wrapper: 'flex border-2 px-2 gap-2 focus:outline outline-2',
                  section: 'static w-auto text-[#161616] whitespace-nowrap',
                  input: cn(
                    'form-input rounded-sm border-0 p-0 outline-none',
                    form?.errors?.code && 'form-error--input'
                  ),
                  error: 'form-error',
                }}
                type='text'
                label='Code'
              />
              <Select
                {...form.getInputProps('categoryName')}
                classNames={{
                  root: 'form-root w-full',
                  label: 'form-label',
                  wrapper: 'flex border-2 px-2 gap-2 focus:outline outline-2',
                  section: 'static w-auto text-[#161616] whitespace-nowrap',
                  option: 'text-xs',
                  input: cn(
                    'form-input rounded-sm border-0 p-0 outline-none',
                    form?.errors?.categoryName && 'form-error--input'
                  ),
                  error: 'form-error',
                }}
                type='text'
                label='Category'
                data={categoryList.map(cat => cat.name)}
              ></Select>
            </Group>
            <Group className='flex-column flex gap-[30px]'>
              <TextInput
                {...form.getInputProps('price')}
                classNames={{
                  root: 'form-root w-full',
                  label: 'form-label',
                  wrapper: 'flex border-2 px-2 gap-2 focus:outline outline-2',
                  section: 'static w-auto text-[#161616] whitespace-nowrap',
                  input: cn(
                    'form-input rounded-sm border-0 p-0 outline-none',
                    form?.errors?.price && 'form-error--input'
                  ),
                  error: 'form-error',
                }}
                type='number'
                min={0}
                max={Number.MAX_SAFE_INTEGER}
                label='Price'
              />
              <TextInput
                {...form.getInputProps('quantity')}
                classNames={{
                  root: 'form-root w-full',
                  label: 'form-label',
                  wrapper: 'flex border-2 px-2 gap-2 focus:outline outline-2',
                  section: 'static w-auto text-[#161616] whitespace-nowrap',
                  input: cn(
                    'form-input rounded-sm border-0 p-0 outline-none',
                    form?.errors?.quantity && 'form-error--input'
                  ),
                  error: 'form-error',
                }}
                type='number'
                min={0}
                max={Number.MAX_SAFE_INTEGER}
                label='Quantity'
              />
              <Select
                {...form.getInputProps('productStatus')}
                classNames={{
                  root: 'form-root w-full',
                  label: 'form-label',
                  wrapper: 'flex border-2 px-2 gap-2 focus:outline outline-2',
                  section: 'static w-auto text-[#161616] whitespace-nowrap',
                  option: 'text-xs',
                  input: cn(
                    'form-input rounded-sm border-0 p-0 outline-none',
                    form?.errors?.productStatus && 'form-error--input'
                  ),
                  error: 'form-error',
                }}
                data={['DELETE', 'ACTIVE', 'TEMPORARILY_ABSENT', 'IN STOCK']}
                type='text'
                label='Status'
              ></Select>
            </Group>
            <Textarea
              classNames={{
                root: 'form-root w-full',
                label: 'form-label',
                wrapper: 'grid h-full pb-[28px]',
                input: cn(
                  'form-input textarea',
                  form?.errors?.description && 'form-error--input'
                ),
                error: 'form-error',
              }}
              label='Description'
              {...form.getInputProps('description')}
            />
          </div>
          {!previewImage.current?.path || !previewImage.current?.name ? (
            <>
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
                  input: cn('form-input', styles.fileInput)
                }}
              />
            </div>
            </>
          ) : (
            <div className={styles.previewWrapper}>
              <Image
                className={styles.previewImage}
                width={32}
                height={32}
                src={previewImage.current.path}
                alt=''
              />
              <p>{previewImage.current.name}</p>
              <button className={styles.clearImage} onClick={clearFile}>
                <X size={14} alignmentBaseline='central' />
              </button>
            </div>
          )}
        </Form>

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

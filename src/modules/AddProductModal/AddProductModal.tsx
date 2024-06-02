'use client';

import { useRef } from 'react';
import {
  UnstyledButton,
  FileInput,
  Group,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core';
import { PlusCircle, UploadCloud, X, Check, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import { Form, isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';

import styles from './AddProductModal.module.css';
import { DEFAULT_CATEGORY_IMAGE, productTypeList } from '@/shared/lib/constants';

import Modal from '@/components/ModalWindow';
import Notify from '@/components/Notify';
import ModalHeader from '@/components/ModalHeader';
import ModalFooter from '@/components/ModalFooter';
import { cn } from '@/shared/lib/utils';
import { useCreateMutation } from '@/shared/api/productApi';
import { Product, ProductSizeEnum } from '@/shared/types/types';
import { useSelectCategories } from '@/shared/hooks/useSelectCategories';
import { useNotification } from '@/shared/hooks/useNotification';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';

type PreviewImage = {
  name: string | null;
  path: string | null;
};

export default function AddProductModal() {
  const [dispatch] = useCreateMutation();
  const categoryList = useSelectCategories((cats) => cats);
  const [setNotification, { props, clear }] = useNotification({
    failed: {
      color: 'transparent',
      icon: <AlertTriangle size={24} fill="#DC362E" />,
      text: 'Product adding failed!',
    },
    success: {
      icon: <Check size={24} />,
      color: '#389B48',
      text: 'Product successfully added!',
    }
  });

  const previewImage = useRef<PreviewImage>({ name: '', path: '' });

  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      name: '',
      categoryName: '' as Product['categoryName'],
      price: 0,
      productType: 'INDOORS' as Product['productType'],
      description: '',
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
      price: (val) => (val < 1 ? 'Entered an invalid price' : null),
      description: isNotEmpty('Enter a description'),
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
    ...rest
  }: (typeof form)['values']) => {
    try {
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
        productSizes: [{
          size: ProductSizeEnum["M"],
          quantity: 1,
          productStatus: "IN STOCK"
        }],
        imagePath
      };

      const candidate = categoryList.find(
        (cat) => cat.name === newProduct.categoryName
      );
      candidate && (newProduct.categoryId = candidate.id);

      await dispatch({ req: newProduct }).unwrap();

      clearAndClose();
      setNotification("Success");
    } catch (err) {
      clearAndClose();
      console.error(err);

      if (isAxiosQueryError(err)) {
        setNotification("Failed", isErrorDataString(err.data) ? err.data : err.data.message);
      }
    }
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <hgroup className='pb-6'>
          <h2>Products</h2>
          <p>Manage your product catalog</p>
        </hgroup>
        <UnstyledButton className='bg-black text-white flex gap-2 items-center font-black rounded px-4 py-[10px]' onClick={open}>
          <PlusCircle width={20} />
          Add product
        </UnstyledButton>
      </div>

      <Modal
        size={1151}
        opened={opened}
        classNames={{
          header: styles.modalHeader,
          content: styles.modalContent,
        }}
        onChange={() => { }}
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
                data={categoryList.map((cat) => cat.name)}
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
              <Select
                defaultValue={"INDOORS"}
                {...form.getInputProps('productType')}
                classNames={{
                  root: 'form-root w-full',
                  label: 'form-label',
                  wrapper: 'flex border-2 px-2 gap-2 focus:outline outline-2',
                  section: 'static w-auto text-[#161616] whitespace-nowrap',
                  option: 'text-xs',
                  input: cn(
                    'form-input rounded-sm border-0 p-0 outline-none',
                    form?.errors?.productType && 'form-error--input'
                  ),
                  error: 'form-error',
                }}
                data={productTypeList}
                type='text'
                label='Type'
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
                    input: cn('form-input', styles.fileInput),
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

      <Notify {...props} onClose={clear} />
    </>
  );
}

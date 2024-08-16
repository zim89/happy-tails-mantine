'use client';

import { UploadCloud, X } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';
import { Form, useForm } from '@mantine/form';
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { FileInput, Group, Select, Textarea, TextInput } from '@mantine/core';

import styles from './classes.module.css';
import Modal from '@/components/ModalWindow/ModalWindow';
import ModalHeader from '@/components/ModalHeader';
import ModalFooter from '@/components/ModalFooter';
import { cn } from '@/shared/lib/utils';
import { Product } from '@/shared/types/types';
import { useUpdateMutation } from '@/shared/api/productApi';
import { useSelectCategories } from '@/shared/hooks/useSelectCategories';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';
import { productTypeList } from '@/shared/lib/constants';

type Props = {
  productLine: Product;
  setNotification: (type: 'Success' | 'Failed', text?: string) => void;
};

type PreviewImage = {
  name: string;
  path: string;
};

const UpdateProductModal = ({ productLine, setNotification }: Props) => {
  const categoryList = useSelectCategories((res) => res.map((cat) => cat.name));

  const form = useForm({
    initialValues: {
      name: productLine.name,
      categoryName: productLine.categoryName,
      price: productLine.price,
      salePrice: productLine.salePrice,
      productType: productLine.productType,
      description: productLine.description,
      image: null as File | null,
    },

    onValuesChange(values) {
      if (values.image && previewImage.current) {
        previewImage.current.path = URL.createObjectURL(values.image);
        previewImage.current.name = values.image.name;
      }
    },
  });

  useEffect(() => {
    form.initialize({
      name: productLine.name,
      categoryName: productLine.categoryName,
      price: productLine.price,
      salePrice: productLine.salePrice,
      productType: productLine.productType,
      description: productLine.description,
      image: null,
    });
  }, [
    productLine.article,
    productLine.categoryName,
    productLine.description,
    productLine.name,
    productLine.price,
  ]);

  const previewImage = useRef<PreviewImage>({ name: '', path: '' });

  const [dispatch] = useUpdateMutation();

  const [opened, { open, close }] = useDisclosure(false);

  // Initialize previewImage until the modal is opened
  useEffect(() => {
    if (!opened) {
      previewImage.current.path = productLine.imagePath;
      previewImage.current.name = productLine.name;
    }
  }, [opened, productLine]);

  const clearAndClose = () => {
    form.clearErrors();
    form.reset();
    close();
  };

  const handleSubmit = async ({
    image,
    productType,
    ...rest
  }: typeof form.values) => {
    try {
      let requestBody: Product = {
        ...productLine,
        productSizes: productLine?.productSizes
          ? [
              {
                size: productLine.productSizes[0].size,
                quantity: productLine.productSizes[0].quantity,
                productStatus: productLine.productSizes[0].productStatus,
                description: productLine.productSizes[0].description,
              },
            ]
          : null,
        ...rest,
      };

      // Uploading an image
      if (image) {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('type', 'image');
        formData.append('title', `Product image: ${rest.name}`);

        const res = await axios.post(
          'https://api.imgur.com/3/image/',
          formData,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        requestBody.imagePath = res.data.data.link;
      }

      await dispatch({ req: requestBody }).unwrap();
      clearAndClose();
      setNotification('Success', 'Product updated successfully!');
    } catch (err) {
      clearAndClose();
      if (isAxiosQueryError(err)) {
        setNotification(
          'Failed',
          isErrorDataString(err.data) ? err.data : err.data.message
        );
      }
      console.log(err);
    }
  };

  const clearFile = () => {
    previewImage.current = {
      path: '',
      name: '',
    };
    form.setFieldValue('image', null);
  };

  return (
    <>
      <span className={styles.actionButton} onClick={open}>
        Edit
      </span>

      <Modal
        size={1151}
        opened={opened}
        classNames={{
          header: styles.modalHeader,
          content: styles.modalContent,
        }}
        onClose={clearAndClose}
      >
        <ModalHeader heading='Edit Product' handleClose={clearAndClose} />

        <Form form={form}>
          <div className='flex gap-[42px]'>
            <Group className='flex-column flex gap-[30px]'>
              <TextInput
                {...form.getInputProps('name')}
                classNames={{
                  root: 'form-root w-full',
                  label: 'form-label',
                  wrapper: 'flex border-2 px-2 gap-2 focus:outline outline-2',
                  section: 'static w-auto text-secondary whitespace-nowrap',
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
                  section: 'static w-auto text-secondary whitespace-nowrap',
                  option: 'text-xs',
                  input: cn(
                    'form-input rounded-sm border-0 p-0 outline-none',
                    form?.errors?.categoryName && 'form-error--input'
                  ),
                  error: 'form-error',
                }}
                type='text'
                label='Category'
                data={categoryList}
              ></Select>
              <TextInput
                {...form.getInputProps('price')}
                classNames={{
                  root: 'form-root w-full',
                  label: 'form-label',
                  wrapper: 'flex border-2 px-2 gap-2 focus:outline outline-2',
                  section: 'static w-auto text-secondary whitespace-nowrap',
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
            </Group>
            <Group className='flex-column flex gap-[30px]'>
              <TextInput
                {...form.getInputProps('price')}
                classNames={{
                  root: 'form-root w-full',
                  label: 'form-label',
                  wrapper: 'flex border-2 px-2 gap-2 focus:outline outline-2',
                  section: 'static w-auto text-secondary whitespace-nowrap',
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
                defaultValue='INDOORS'
                {...form.getInputProps('productType')}
                classNames={{
                  root: 'form-root w-full',
                  label: 'form-label',
                  wrapper: 'flex border-2 px-2 gap-2 focus:outline outline-2',
                  section: 'static w-auto text-secondary whitespace-nowrap',
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
          primaryBtnOnClick={() => handleSubmit(form.values)}
        />
      </Modal>
    </>
  );
};

export default UpdateProductModal;

import { UploadCloud, X } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';
import { Form, useForm } from '@mantine/form';

import styles from './classes.module.css';
import Modal from '@/components/ModalWindow';
import ModalHeader from '@/components/ModalHeader';
import ModalFooter from '@/components/ModalFooter';
import { FileInput, Group, Select, Textarea, TextInput } from '@mantine/core';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Product } from '@/shared/types/types';
import axios from 'axios';
import { useUpdateMutation } from '@/shared/api/productApi';
import { useAuth } from '@/shared/hooks/useAuth';
import { getAllCategories } from '@/shared/api/categoryApi';
import { useSelectCategories } from '@/shared/hooks/useSelectCategories';

type Props = {
  productLine: Product;
  setIsNotified: Dispatch<SetStateAction<string>>;
};

type PreviewImage = {
  name: string;
  path: string;
};

const UpdateProductModal = ({ productLine, setIsNotified }: Props) => {
  const { access_token } = useAuth();
  const categoryList = useSelectCategories(res => res.map(cat => cat.name)); 

  const form = useForm({
    initialValues: {
      name: productLine.name,
      code: productLine.article,
      categoryName: productLine.categoryName,
      price: productLine.price,
      quantity: productLine.quantity,
      productStatus: productLine.productStatus,
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
    (async () => {
      try {
        form.initialize({
          name: productLine.name,
          code: productLine.article,
          categoryName: productLine.categoryName,
          price: productLine.price,
          quantity: productLine.quantity,
          productStatus: productLine.productStatus,
          description: productLine.description,
          image: null
        })
         
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const previewImage = useRef<PreviewImage>({ name: '', path: '' });

  const [dispatch, { isError, isLoading }] = useUpdateMutation();

  const [opened, { open, close }] = useDisclosure(false);

  const clearAndClose = () => {
    form.clearErrors();
    form.reset();
    close();
  };

  const handleSubmit = async ({ code, image, ...rest }: typeof form.values) => {
    try {
      let requestBody: Product = {
        ...productLine,
        ...rest,
        article: code,
      };
  
      // Uploading an image
      if (image) {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('type', 'image');
        formData.append('title', `Product image: ${rest.name}`);
  
        const res = await axios.post('https://api.imgur.com/3/image/', formData, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
            'Content-Type': 'multipart/form-data',
          },
        });
  
        requestBody.imagePath = res.data.data.link;
      }
      
      await dispatch({ req: requestBody, access_token });
      clearAndClose();
      setIsNotified("Update_Success");
    } catch (err) {
      setIsNotified("Update_Failed");
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
        onClose={close}
      >
        <ModalHeader heading='Edit Product' handleClose={close} />

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
                data={categoryList}
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
    </>
  );
};

export default UpdateProductModal;

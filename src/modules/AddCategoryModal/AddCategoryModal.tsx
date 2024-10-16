'use client';

import { useRef } from 'react';
import {
  Button,
  InputLabel,
  TextInput,
  Textarea,
  Tooltip,
} from '@mantine/core';
import { Info, PlusCircle } from 'lucide-react';
import { hasLength, isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

import styles from './AddCategoryModal.module.css';
import { useAddNewCategoryMutation } from '@/shared/api/categoryApi';
import { DEFAULT_CATEGORY_IMAGE } from '@/shared/lib/constants';

import Modal from '@/components/ModalWindow/ModalWindow';
import ModalHeader from '@/components/ModalHeader';
import ModalFooter from '@/components/ModalFooter';
import { cn } from '@/shared/lib/utils';
import {
  brandNotification,
  isAxiosQueryError,
  isErrorDataString,
} from '@/shared/lib/helpers';
import { publishImage } from '@/shared/lib/requests';
import {
  TOO_LARGE_PAYLOAD,
  UNSUPPORTED_TYPE,
} from '@/shared/constants/httpCodes';
import { BrandFileInput } from '@/components/BrandFileInput';

export default function AddCategoryModal() {
  const [dispatch] = useAddNewCategoryMutation();

  const previewImage = useRef<{ image: string | null; name: string | null }>({
    image: null,
    name: null,
  });

  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      categoryName: '',
      image: null as File | null,
      description: '',
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
      image: isNotEmpty('Image must not be empty'),
      description: (value) => {
        if (!value.trim().length) {
          return 'Description is required';
        } else if (hasLength({ min: 0, max: 255 })(value)) {
          return 'Description should not exceed 255 characters';
        }
      },
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
    description,
  }: (typeof form)['values']) => {
    try {
      const res = form.validate();

      if (res.hasErrors) return;

      let imgSrc = DEFAULT_CATEGORY_IMAGE;

      if (image) {
        imgSrc = await publishImage(image, `Category: ${categoryName}`);
      }

      const newCategory = {
        name: categoryName,
        title: categoryName,
        path: categoryName.toLowerCase(),
        description,
        imgSrc,
        coordinateOnBannerX: 0,
        coordinateOnBannerY: 0,
      };

      await dispatch(newCategory).unwrap();

      clearAndClose();
      brandNotification('SUCCESS', 'Category successfully created!');
    } catch (err) {
      if (isAxiosQueryError(err)) {
        if (
          err.status === UNSUPPORTED_TYPE ||
          err.status === TOO_LARGE_PAYLOAD
        ) {
          form.setFieldValue('image', null);
          form.setFieldError('image', `${err.data}`);
        } else {
          clearAndClose();
          brandNotification(
            'ERROR',
            isErrorDataString(err.data) ? err.data : err.data.message
          );
        }
      }
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

          <Textarea
            withAsterisk
            rows={10}
            classNames={{
              root: 'form-root w-full mt-4',
              label: 'form-label',
              wrapper: 'grid h-full',
              input: cn(
                'form-input textarea p-2',
                form?.errors?.description && 'form-error--input'
              ),
              error: 'form-error -bottom-4',
            }}
            label='Description'
            {...form.getInputProps('description')}
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
          primaryBtnOnClick={() => {
            handleSubmit(form.values);
          }}
        />
      </Modal>
    </>
  );
}

import { isNotEmpty, useForm } from '@mantine/form';
import { FileInput, Select, TextInput, Tooltip } from '@mantine/core';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { ChevronDown, Info, UploadCloud, X } from 'lucide-react';
import Image from 'next/image';

import classes from '../classes.module.css';
import { VariantForm } from '../lib/utils';
import { cn } from '@/shared/lib/utils';

type PreviewImage = {
  name: string | null;
  path: string | null;
};

type Props = {
  index: number;
  setVariants: Dispatch<SetStateAction<(VariantForm | null)[]>>;
  variant: VariantForm | null;
};

export const SingleVariant = ({ index, setVariants, variant }: Props) => {
  const variantImage = useRef<PreviewImage>({ name: '', path: '' });

  const form = useForm({
    initialValues: {
      size: variant?.values?.size || 'ONE SIZE',
      color: variant?.values?.color || 'ONE COLOR',
      quantity: variant?.values?.quantity || 0,
      price: variant?.values?.price || 0,
      variantImage: variant?.values?.variantImage || (null as File | null),
    },

    onValuesChange(values) {
      if (values.variantImage && variantImage.current) {
        variantImage.current.path = URL.createObjectURL(values.variantImage);
        variantImage.current.name = values.variantImage.name;
      }
    },

    validate: {
      size: isNotEmpty('Please select a size'),
      color: isNotEmpty('Please select a color'),
      quantity: (val) => (val < 1 ? 'Entered an invalid quantity' : null),
      price: (val) => (val < 1 ? 'Entered an invalid price' : null),
      variantImage: isNotEmpty('Please upload an image'),
    },
  }) as VariantForm;

  useEffect(() => {
    setVariants((variants) => {
      const newVariants = [...variants];
      newVariants[index] = form;
      return newVariants;
    });
  }, [
    form.values.color,
    form.values.size,
    form.values.quantity,
    form.values.price,
    form.values.variantImage,
  ]);

  const clearFile = () => {
    variantImage.current = {
      path: null,
      name: null,
    };
    form.setFieldValue('variantImage', null);
  };

  return (
    <div className={classes.variant}>
      <div className={classes.variantInputs}>
        <Select
          withAsterisk
          {...form.getInputProps('size')}
          classNames={{
            root: 'form-root w-full',
            label: 'form-label',
            wrapper:
              'flex border border-brand-grey-400 rounded-sm px-2 gap-2 focus:outline outline-2 bg-primary',
            section: 'static w-auto text-secondary whitespace-nowrap',
            option: 'text-xs',
            input: cn(
              'form-input border-0 p-0 outline-none',
              form?.errors?.size && 'form-error--input'
            ),
            error: 'form-error',
          }}
          rightSection={<ChevronDown color='black' size={16} />}
          type='text'
          label='Select Size'
          defaultValue={'ONE SIZE'}
          data={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'ONE SIZE']}
        />
        <Select
          withAsterisk
          {...form.getInputProps('color')}
          classNames={{
            root: 'form-root w-full',
            label: 'form-label',
            wrapper:
              'flex border border-brand-grey-400 rounded-sm px-2 gap-2 focus:outline outline-2 bg-primary',
            section: 'static w-auto text-secondary whitespace-nowrap',
            option: 'text-xs',
            input: cn(
              'form-input border-0 p-0 outline-none',
              form?.errors?.color && 'form-error--input'
            ),
            error: 'form-error',
          }}
          rightSection={<ChevronDown color='black' size={16} />}
          type='text'
          label='Select Color'
          defaultValue={'ONE COLOR'}
          data={[
            'Black',
            'White',
            'Blue',
            'Pink',
            'Yellow',
            'Green',
            'Red',
            'Purple',
            'Orange',
            'Gray',
            'Brown',
            'ONE COLOR',
          ]}
        />
      </div>
      <div className={classes.variantInputs}>
        <TextInput
          withAsterisk
          {...form.getInputProps('quantity')}
          classNames={{
            root: 'form-root w-full ',
            label: 'form-label',
            wrapper: 'flex gap-2 focus:outline outline-2',
            section: 'static w-auto text-secondary whitespace-nowrap',
            input: cn(
              'form-input px-2 outline-none',
              form?.errors?.quantity && 'form-error--input'
            ),
            error: 'form-error',
          }}
          type='number'
          label='Quantity'
        />
        <TextInput
          withAsterisk
          {...form.getInputProps('price')}
          classNames={{
            root: 'form-root w-full',
            label: 'form-label',
            wrapper: 'flex gap-2 focus:outline outline-2',
            section: 'static w-auto text-secondary whitespace-nowrap',
            input: cn(
              'form-input rounded-sm px-2 outline-none',
              form?.errors?.price && 'form-error--input'
            ),
            error: 'form-error',
          }}
          type='number'
          min={0}
          max={Number.MAX_SAFE_INTEGER}
          label='Price'
        />
      </div>
      {!variantImage.current?.path || !variantImage.current?.name ? (
        <div className={classes.upload}>
          <p className='m-0 flex items-center gap-1'>
            <span>
              Image <span className='text-[var(--mantine-color-error)]'>*</span>
            </span>
            <Tooltip label='.jpeg,.jpg,.png,.gif,.apng,.tiff' withArrow>
              <Info
                size={16}
                className='-mb-[3px] cursor-pointer'
                color='#5A5A5A'
              />
            </Tooltip>
          </p>
          <div>
            <label htmlFor={`variant-image-${index}`}>
              <UploadCloud color='white' />
              <span>Select Image</span>
            </label>
            <FileInput
              id={`variant-image-${index}`}
              w='100%'
              placeholder='Max file size 5 MB'
              {...form.getInputProps('variantImage')}
              accept='.png,.jpeg,.gif,.webp'
              classNames={{
                root: 'form-root',
                wrapper: classes.fileWrapper,
                error: 'form-error -left-[140px] -bottom-4',
                input: cn(
                  'form-input',
                  classes.fileInput,
                  form?.errors?.variantImage && 'form-error--input'
                ),
              }}
            />
          </div>
        </div>
      ) : (
        <div className={classes.previewWrapper}>
          <Image
            className={classes.previewImage}
            width={32}
            height={32}
            src={variantImage.current.path}
            alt=''
          />
          <p>{variantImage.current.name}</p>
          <button className={classes.clearImage} onClick={clearFile}>
            <X size={14} alignmentBaseline='central' />
          </button>
        </div>
      )}
    </div>
  );
};

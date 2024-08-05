import { NumberInput, Select, Textarea } from '@mantine/core';
import { useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { isNotEmpty, useForm } from '@mantine/form';

import { SizeForm, ContextType } from '../lib/utils';
import classes from '../classes.module.css';
import { cn } from '@/shared/lib/utils';

type Props = {
  size: ContextType['sizes'][number];
  index: number;
  setSizes: ContextType['setSizes'];
};

export const SingleSize = ({ size, index, setSizes }: Props) => {
  const form = useForm<SizeForm['values']>({
    initialValues: {
      description:
        size.id === 'form' ? size.values.description : size.description,
      size: size.id === 'form' ? size.values.size : size.size,
      quantity: size.id === 'form' ? size.values.quantity : size.quantity,
    },

    validate: {
      size: isNotEmpty('Please select a size'),
      quantity: (val) => (val < 1 ? 'Entered an invalid quantity' : null),
    },
  });

  useEffect(() => {
    const { hasErrors } = form.validate();

    // Update sizes array only when form's values are correct
    if (!hasErrors) {
      setSizes((s) => {
        const newSizes = [...s];
        newSizes[index] = { id: 'form', ...form };
        return newSizes;
      });
    }
  }, [form.values.size, form.values.quantity, form.values.description]);

  return (
    <div className={classes.variant}>
      <div className={classes.variantInputs}>
        <Select
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
            error: 'form-error -bottom-3',
          }}
          rightSection={<ChevronDown color='black' size={16} />}
          type='text'
          label='Select Size'
          defaultValue={'ONE SIZE'}
          data={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'ONE SIZE']}
        />
        <NumberInput
          {...form.getInputProps('quantity')}
          label='Quantity'
          min={0}
          classNames={{
            root: 'form-root w-full',
            label: 'form-label',
            section: 'hidden',
            wrapper:
              'flex border border-brand-grey-400 rounded-sm px-2 gap-2 focus:outline outline-2 bg-primary',
            input: cn(
              'form-input border-0 p-0 outline-none',
              form?.errors?.quantity && 'form-error--input'
            ),
            error: 'form-error -bottom-3',
          }}
        />
      </div>

      <div className={classes.variantInputs}>
        <Textarea
          {...form.getInputProps('description')}
          rows={5}
          classNames={{
            root: 'form-root w-full mb-6',
            label: 'form-label',
            wrapper: 'grid h-full',
            input: cn(
              'form-input textarea p-2',
              form?.errors?.description && 'form-error--input'
            ),
            error: 'form-error',
          }}
          label='Description'
        />
      </div>
    </div>
  );
};

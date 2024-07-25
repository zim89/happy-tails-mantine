import { TextInput, Tooltip } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { Info } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { ShippingMethod } from '@/shared/types/shippingMethod.types';
import BrandBox from '@/components/BrandBox';
import UpdateShippingMethodModal from '@/modules/UpdateShippingMethodModal';
import DeleteShippingMethodModal from '@/modules/DeleteShippingMethodModal';

type Props = {
  option: ShippingMethod;
  deleteBtn?: boolean;
};

export const ShippingForm = ({ option, deleteBtn = true }: Props) => {
  const form = useForm({
    initialValues: {
      name: option.name,
      delivery: option.daysOfDelivery,
      price: option.price,
    },

    validate: {
      name: isNotEmpty('The method name is required.'),
      delivery: (val) =>
        !val || val < 0 ? 'Delivery days are filled incorrectly.' : null,
      price: (val) => (val <= 0 ? 'Price should be more than zero.' : null),
    },
  });

  return (
    <BrandBox
      title={option.name}
      className='mt-6'
      rightSection={
        <div>
          <UpdateShippingMethodModal
            visible={form.isDirty() && form.isValid()}
            shippingMethod={{
              ...option,
              daysOfDelivery: form.values.delivery,
              name: form.values.name,
              price: form.values.price,
            }}
          />
          {deleteBtn && <DeleteShippingMethodModal shippingMethod={option} />}
        </div>
      }
    >
      <form className='flex flex-col gap-4 md:flex-row md:items-center md:gap-16'>
        <TextInput
          {...form.getInputProps('name')}
          label='Option name'
          classNames={{
            root: 'form-root w-full',
            label: 'form-label',
            wrapper:
              'flex border border-brand-grey-400 rounded-sm px-2 gap-2 focus:outline outline-2 bg-primary',
            input: cn(
              'form-input h-full border-0 p-0 outline-none',
              form?.errors.name && 'form-error--input'
            ),
            error: 'form-error',
          }}
        />
        <TextInput
          {...form.getInputProps('delivery')}
          label={
            <p className='mb-1 flex items-center gap-1 text-sm'>
              <span>Delivery days</span>
              <Tooltip
                classNames={{
                  arrow: 'border-b border-b-black',
                  tooltip:
                    'bg-white text-secondary rounded-none shadow p-4 text-sm',
                }}
                label='Number of delivery days from the order date'
                withArrow
                arrowSize={16}
              >
                <Info
                  size={16}
                  className='-mb-[3px] cursor-pointer'
                  color='#5A5A5A'
                />
              </Tooltip>
            </p>
          }
          type='number'
          classNames={{
            root: 'form-root w-full',
            label: 'form-label',
            wrapper:
              'flex border border-brand-grey-400 rounded-sm px-2 gap-2 focus:outline outline-2 bg-primary',
            input: cn(
              'form-input h-full border-0 p-0 outline-none',
              form?.errors.delivery && 'form-error--input'
            ),
            error: 'form-error',
          }}
        />
        <TextInput
          {...form.getInputProps('price')}
          label='Price, $'
          type='number'
          classNames={{
            root: 'form-root w-full',
            label: 'form-label',
            wrapper:
              'flex border border-brand-grey-400 rounded-sm px-2 gap-2 focus:outline outline-2 bg-primary',
            input: cn(
              'form-input h-full border-0 p-0 outline-none',
              form?.errors.price && 'form-error--input'
            ),
            error: 'form-error',
          }}
        />
      </form>
    </BrandBox>
  );
};

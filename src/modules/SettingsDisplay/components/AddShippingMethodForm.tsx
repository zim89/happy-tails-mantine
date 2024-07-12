import { TextInput, Tooltip } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { Info } from 'lucide-react';

import BrandBox from '@/components/BrandBox';
import DarkButton from '@/components/DarkButton';
import LightButton from '@/components/LightButton';
import { cn } from '@/shared/lib/utils';
import { useCreateShippingMethodMutation } from '@/shared/api/shippingMethodsApi';
import { useContext } from 'react';
import { notifyContext } from '@/shared/context/notification.context';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';

type Props = {
  onClose: () => void;
};

export const AddShippingMethodForm = ({ onClose }: Props) => {
  const [dispatch] = useCreateShippingMethodMutation();
  const { setNotification } = useContext(notifyContext);

  const form = useForm({
    initialValues: {
      name: '',
      delivery: 0,
      price: 0,
    },

    validate: {
      name: isNotEmpty('The method name is required.'),
      delivery: (val) =>
        !val || val < 0 ? 'Delivery days are filled incorrectly.' : null,
      price: (val) => (val <= 0 ? 'Price should be more than zero.' : null),
    },
  });

  const handleSubmit = async () => {
    try {
      await dispatch({
        daysOfDelivery: form.values.delivery,
        description: '',
        name: form.values.name,
        price: form.values.price,
      }).unwrap();

      setNotification('Success', 'Shipping method successfully created!');
      form.reset();
      onClose();
    } catch (err) {
      if (isAxiosQueryError(err)) {
        setNotification(
          'Failed',
          isErrorDataString(err.data) ? err.data : err.data.message
        );
      }
      console.error('Creating failed: ', err);
    }
  };

  return (
    <>
      <BrandBox title='New Shipping Method' className='mt-6'>
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
            min={0}
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
            min={0}
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
        <div className='mt-[50px] flex gap-[45px]'>
          <LightButton handler={onClose}>Cancel</LightButton>

          <DarkButton
            disabled={!form.isDirty() || !form.isValid()}
            handler={handleSubmit}
          >
            Save
          </DarkButton>
        </div>
      </BrandBox>
    </>
  );
};

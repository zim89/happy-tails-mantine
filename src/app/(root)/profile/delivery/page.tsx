'use client';
import { cn } from '@/shared/lib/utils';
import { Group, Button, TextInput } from '@mantine/core';
import { useForm, hasLength, isNotEmpty } from '@mantine/form';

export default function DeliveryPage() {
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      postcode: '',
      company: '',
      addressOne: '',
      addressTwo: '',
      contactNumber: '',
      county: '',
    },

    transformValues(values) {
      return {
        ...values,
        addressTwo: values.addressOne,
      };
    },

    validate: {
      firstName: hasLength({ min: 2 }, 'Field must have 2 or more characters'),
      lastName: hasLength({ min: 2 }, 'Field must have 2 or more characters'),
      country: isNotEmpty('Please enter a country name.'),
      city: isNotEmpty('Please enter a city name.'),
      postcode: isNotEmpty('Please enter a postcode.'),
      addressOne: isNotEmpty('Please enter an address.'),
      contactNumber: isNotEmpty('Please enter a contact number.'),
    },
  });

  return (
    <>
      <hgroup className='text-center'>
        <h1 className='hidden text-[28px] lg:block'>Delivery address</h1>
        <p className='py-4 font-light'>
          * Required fields are marked with an asterisk <br />
          Please enter your delivery address
        </p>
      </hgroup>
      <form
        className='flex flex-col gap-4 md:items-center'
        onSubmit={form.onSubmit((values) => {
          console.log(values);
          form.clearErrors();
          form.reset();
        })}
      >
        <Group className='flex-col justify-center md:w-full md:flex-row'>
          <TextInput
            withAsterisk
            classNames={{
              root: 'form-root w-full md:flex-1 lg:flex-initial lg:w-[275px]',
              label: 'form-label',
              input: cn(
                'form-input',
                form?.errors?.firstName && 'border-brand-red-400 text-secondary'
              ),
              error: 'form-error',
            }}
            label='First Name'
            {...form.getInputProps('firstName')}
            placeholder='Enter Your First Name'
          />
          <TextInput
            withAsterisk
            classNames={{
              root: 'form-root w-full md:flex-1 lg:flex-initial lg:w-[275px]',
              label: 'form-label',
              input: cn(
                'form-input',
                form?.errors?.lastName && 'border-brand-red-400 text-secondary'
              ),
              error: 'form-error',
            }}
            label='Last Name'
            {...form.getInputProps('lastName')}
            placeholder='Enter Your Last Name'
          />
        </Group>
        <Group className=' flex-col justify-center md:w-full md:flex-row'>
          <TextInput
            withAsterisk
            classNames={{
              root: 'form-root w-full md:flex-1 lg:flex-initial lg:w-[275px]',
              label: 'form-label',
              input: cn(
                'form-input',
                form?.errors?.country && 'border-brand-red-400 text-secondary'
              ),
              error: 'form-error',
            }}
            type='country'
            label='Country'
            {...form.getInputProps('country')}
            placeholder='Enter Country'
          />
          <TextInput
            withAsterisk
            classNames={{
              root: 'form-root w-full md:flex-1 lg:flex-initial lg:w-[275px]',
              label: 'form-label',
              input: cn(
                'form-input',
                form?.errors?.city && 'border-brand-red-400 text-secondary'
              ),
              error: 'form-error',
            }}
            label='Town / City'
            {...form.getInputProps('city')}
            placeholder='Enter Town / City'
          />
        </Group>
        <Group className=' flex-col justify-center  md:w-full md:flex-row'>
          <TextInput
            withAsterisk
            classNames={{
              root: 'form-root w-full md:flex-1 lg:flex-initial lg:w-[275px]',
              label: 'form-label',
              input: cn(
                'form-input',
                form?.errors?.postcode && 'border-brand-red-400 text-secondary'
              ),
              error: 'form-error',
            }}
            label='Postcode'
            {...form.getInputProps('postcode')}
            placeholder='Enter Postcode'
          />
          <TextInput
            classNames={{
              root: 'w-full md:flex-1 lg:flex-initial lg:w-[275px]',
              label: 'form-label',
            }}
            label='Company'
            {...form.getInputProps('company')}
            placeholder='Enter Company'
          />
        </Group>
        <Group className=' flex-col justify-center  md:w-full md:flex-row'>
          <TextInput
            withAsterisk
            classNames={{
              root: 'form-root w-full md:flex-1 lg:flex-initial lg:w-[275px]',
              label: 'form-label',
              input: cn(
                'form-input',
                form?.errors?.addressOne && 'border-brand-red-400 text-secondary'
              ),
              error: 'form-error',
            }}
            label='Address Line 1'
            {...form.getInputProps('addressOne')}
            placeholder='Enter Address Line 1'
          />
          <TextInput
            classNames={{
              root: 'w-full md:flex-1 lg:flex-initial lg:w-[275px]',
              label: 'form-label',
            }}
            label='Address Line 2'
            {...form.getInputProps('addressTwo')}
            placeholder='Enter Address Line 2'
          />
        </Group>
        <Group className='flex-col justify-center md:w-full md:flex-row'>
          <TextInput
            withAsterisk
            classNames={{
              root: 'form-root w-full md:flex-1 lg:flex-initial lg:w-[275px]',
              label: 'form-label',
              input: cn(
                'form-input',
                form?.errors?.contactNumber && 'border-brand-red-400 text-secondary'
              ),
              error: 'form-error',
            }}
            label='Contact Number'
            {...form.getInputProps('contactNumber')}
            placeholder='Enter Contact Number'
          />
          <TextInput
            classNames={{
              root: 'w-full md:flex-1 lg:flex-initial lg:w-[275px]',
              label: 'form-label',
            }}
            label='County'
            {...form.getInputProps('county')}
            placeholder='Enter County'
          />
        </Group>
        <Button
          type='submit'
          className='mt-6 bg-black uppercase md:w-[380px] lg:w-[315px]'
        >
          Add Address
        </Button>
      </form>
    </>
  );
}

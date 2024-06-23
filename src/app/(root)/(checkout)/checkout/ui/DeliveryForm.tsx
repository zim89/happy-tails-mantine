import { useAuth } from '@/shared/hooks/useAuth';
import { cn } from '@/shared/lib/utils';
import {
  selectCheckout,
  setBillingData,
  setShippingData,
} from '@/shared/redux/checkout/checkoutSlice';
import { useAppDispatch, useAppSelector } from '@/shared/redux/store';
import { Select, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useState, useEffect } from 'react';
import { cleanPostcode } from '@/shared/lib/helpers';
import Checkbox from '@/components/Checkbox';
import { useScrollIntoView } from '@mantine/hooks';
import styles from '../styles/Forms.module.css';
import { ChevronDown } from 'lucide-react';

const countries = ['Canada', 'United States'];

export default function DeliveryForm() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [checked, setChecked] = useState(false);
  const { currentUser } = useAuth();

  const { contactData, shippingAddress, billingAddress } =
    useAppSelector(selectCheckout);
  const dispatch = useAppDispatch();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    duration: 150,
  });

  const form = useForm({
    initialValues: {
      shippingAddress: {
        firstName: currentUser?.shippingAddress?.firstName ?? '',
        lastName: currentUser?.shippingAddress?.lastName ?? '',
        country: currentUser?.shippingAddress?.country ?? '',
        state: currentUser?.shippingAddress?.state ?? '',
        city: currentUser?.shippingAddress?.city ?? '',
        zip: currentUser?.shippingAddress?.zip ?? '',
        addressLine1: currentUser?.shippingAddress?.address_line1 ?? '',
        addressLine2: currentUser?.shippingAddress?.address_line2 ?? '',
        company: currentUser?.shippingAddress?.company ?? '',
        phoneNumber: currentUser?.shippingAddress?.phoneNumber ?? '',
      },
      billingAddress: {
        firstName: currentUser?.billingAddress?.firstName ?? '',
        lastName: currentUser?.billingAddress?.lastName ?? '',
        country: currentUser?.billingAddress?.country ?? '',
        state: currentUser?.billingAddress?.state ?? '',
        city: currentUser?.billingAddress?.city ?? '',
        zip: currentUser?.billingAddress?.zip ?? '',
        addressLine1: currentUser?.billingAddress?.address_line1 ?? '',
        addressLine2: currentUser?.billingAddress?.address_line2 ?? '',
        company: currentUser?.billingAddress?.company ?? '',
        phoneNumber: currentUser?.billingAddress?.phoneNumber ?? '',
      },
    },
    transformValues: (values) => {
      const shippingAddressZip = cleanPostcode(values.shippingAddress.zip);
      const billingAddressZip = cleanPostcode(values.billingAddress.zip);

      return {
        ...values,
        shippingAddress: {
          ...values.shippingAddress,
          zip: shippingAddressZip,
        },
        billingAddress: {
          ...values.billingAddress,
          zip: billingAddressZip,
        },
      };
    },
    validate: {
      shippingAddress: {
        firstName: isNotEmpty('Please enter a first name'),
        lastName: isNotEmpty('Please enter a last name'),
        country: isNotEmpty('Please enter a country name'),
        city: isNotEmpty('Please enter a city name'),
        zip: isNotEmpty('Please enter a postcode'),
        addressLine1: isNotEmpty('Please enter an address'),
        phoneNumber: isNotEmpty('Please enter a contact number'),
      },
      billingAddress: {
        firstName: isNotEmpty('Please enter a first name'),
        lastName: isNotEmpty('Please enter a last name'),
        country: isNotEmpty('Please enter a country name'),
        city: isNotEmpty('Please enter a city name'),
        zip: isNotEmpty('Please enter a postcode'),
        addressLine1: isNotEmpty('Please enter an address'),
        phoneNumber: isNotEmpty('Please enter a contact number'),
      },
    },
  });

  type FormData = typeof form.values;

  const onSubmit = (formData: FormData) => {
    if (checked) {
      form.setFieldValue('billingAddress', form.values.shippingAddress);
    }

    const shippingData = {
      firstName: formData.shippingAddress.firstName,
      lastName: formData.shippingAddress.lastName,
      phoneNumber: formData.shippingAddress.phoneNumber,
      country: formData.shippingAddress.country,
      zip: formData.shippingAddress.zip,
      state: formData.shippingAddress.state,
      city: formData.shippingAddress.city,
      company: formData.shippingAddress.company ?? '',
      address_line1: formData.shippingAddress.addressLine1,
      address_line2: formData.shippingAddress.addressLine2 ?? '',
    };
    const billingData = {
      firstName: formData.billingAddress.firstName,
      lastName: formData.billingAddress.lastName,
      phoneNumber: formData.billingAddress.phoneNumber,
      country: formData.billingAddress.country,
      zip: formData.billingAddress.zip,
      state: formData.billingAddress.state,
      city: formData.billingAddress.city,
      company: formData.billingAddress.company ?? '',
      address_line1: formData.billingAddress.addressLine1,
      address_line2: formData.billingAddress.addressLine2 ?? '',
    };
    dispatch(setShippingData(shippingData));
    dispatch(setBillingData(billingData));
    setIsCompleted(true);
    scrollIntoView({ alignment: 'center' });
  };

  const generateAddressString = (data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    country: string;
    zip: string;
    state?: string;
    city: string;
    company?: string;
    address_line1: string;
    address_line2?: string;
  }) => {
    const address = [];
    address.push(data.address_line1);
    if (data.address_line2) {
      address.push(data.address_line2);
    }
    if (data.company) {
      address.push(data.company);
    }
    if (data.state) {
      address.push(data.state);
    }
    address.push(data.zip);
    address.push(data.city);
    address.push(data.country);

    return address.join(', ');
  };

  useEffect(() => {
    if (checked) {
      form.setFieldValue('billingAddress', form.values.shippingAddress);
    }
  }, [checked]);

  if (!contactData) {
    return <h2 className={styles.heading2_default}>Shipping Method</h2>;
  }

  return (
    <div className={styles.wrap}>
      <h2 className={styles.heading2}>
        Delivery Options
        {isCompleted && (
          <button
            type='button'
            className={styles.editButton}
            onClick={() => setIsCompleted(false)}
          >
            Edit
          </button>
        )}
      </h2>

      {isCompleted ? (
        <div
          ref={targetRef}
          className={cn('grid grid-cols-2 gap-14 pt-4', styles.text)}
        >
          <div className='space-y-1'>
            <h3 className={styles.heading3}>Shipping Addresses</h3>
            <p>
              {shippingAddress?.firstName} {shippingAddress?.lastName}
            </p>
            <p>{shippingAddress?.phoneNumber}</p>
            <p>{shippingAddress && generateAddressString(shippingAddress)}</p>
          </div>
          <div className='space-y-1'>
            <h3 className={styles.heading3}>Billing Addresses</h3>
            <p>
              {billingAddress?.firstName} {billingAddress?.lastName}
            </p>
            <p>{billingAddress?.phoneNumber}</p>
            <p>{billingAddress && generateAddressString(billingAddress)}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={form.onSubmit(onSubmit)}>
          <h3 className={styles.heading3_form}>Shipping Addresses</h3>

          <div className='space-y-4'>
            <TextInput
              {...form.getInputProps('shippingAddress.firstName')}
              withAsterisk
              label='First Name'
              classNames={{
                root: 'form-root',
                label: 'form-label',
                input: cn(
                  'form-input',
                  form?.errors['shippingAddress.firstName'] &&
                    'border-brand-red-400 text-secondary'
                ),
                error: 'text-brand-red-400',
              }}
            />
            <TextInput
              {...form.getInputProps('shippingAddress.lastName')}
              withAsterisk
              label='Last Name'
              classNames={{
                root: 'form-root',
                label: 'form-label',
                input: cn(
                  'form-input',
                  form?.errors['shippingAddress.lastName'] &&
                    'border-brand-red-400 text-secondary'
                ),
                error: 'text-brand-red-400',
              }}
            />
            <Select
              defaultChecked
              {...form.getInputProps('shippingAddress.country')}
              mt='md'
              withAsterisk
              comboboxProps={{ withinPortal: true }}
              data={countries}
              rightSection={<ChevronDown className='size-4' />}
              classNames={{
                root: 'form-root',
                label: 'form-label',
                input: cn(
                  'form-input',
                  form?.errors['shippingAddress.country'] &&
                    'form-error--input',
                  form?.errors['billingAddress.country'] && 'form-error--input'
                ),
              }}
              placeholder='Pick your country'
              label='Country'
              onChange={(value) => {
                form.getInputProps('shippingAddress.country').onChange(value);
              }}
            />
            <TextInput
              {...form.getInputProps('shippingAddress.state')}
              label='State'
              classNames={{
                root: 'form-root',
                label: 'form-label',
                input: cn(
                  'form-input',
                  form?.errors['shippingAddress.state'] &&
                    'border-brand-red-400 text-secondary'
                ),
                error: 'text-brand-red-400',
              }}
            />
            <TextInput
              {...form.getInputProps('shippingAddress.city')}
              label='City'
              withAsterisk
              classNames={{
                root: 'form-root',
                label: 'form-label',
                input: cn(
                  'form-input',
                  form?.errors['shippingAddress.city'] &&
                    'border-brand-red-400 text-secondary'
                ),
                error: 'text-brand-red-400',
              }}
            />
            <TextInput
              {...form.getInputProps('shippingAddress.zip')}
              label='Postcode'
              withAsterisk
              classNames={{
                root: 'form-root',
                label: 'form-label',
                input: cn(
                  'form-input',
                  form?.errors['shippingAddress.zip'] &&
                    'border-brand-red-400 text-secondary'
                ),
                error: 'text-brand-red-400',
              }}
            />
            <TextInput
              {...form.getInputProps('shippingAddress.company')}
              label='Company'
              classNames={{
                root: 'form-root',
                label: 'form-label',
                input: cn(
                  'form-input',
                  form?.errors['shippingAddress.company'] &&
                    'border-brand-red-400 text-secondary'
                ),
                error: 'text-brand-red-400',
              }}
            />
            <TextInput
              {...form.getInputProps('shippingAddress.addressLine1')}
              withAsterisk
              label='Address Line 1'
              classNames={{
                root: 'form-root',
                label: 'form-label',
                input: cn(
                  'form-input',
                  form?.errors['shippingAddress.addressLine1'] &&
                    'border-brand-red-400 text-secondary'
                ),
                error: 'text-brand-red-400',
              }}
            />
            <TextInput
              {...form.getInputProps('shippingAddress.addressLine2')}
              label='Address Line 2'
              classNames={{
                root: 'form-root',
                label: 'form-label',
                input: cn(
                  'form-input',
                  form?.errors['shippingAddress.addressLine2'] &&
                    'border-brand-red-400 text-secondary'
                ),
                error: 'text-brand-red-400',
              }}
            />
            <TextInput
              {...form.getInputProps('shippingAddress.phoneNumber')}
              withAsterisk
              label='Contact Number'
              classNames={{
                root: 'form-root',
                label: 'form-label',
                input: cn(
                  'form-input',
                  form?.errors['shippingAddress.phoneNumber'] &&
                    'border-brand-red-400 text-secondary'
                ),
                error: 'text-brand-red-400',
              }}
            />
          </div>

          <h3 className={cn(styles.heading3_form, 'pt-10')}>
            Billing Addresses
          </h3>

          <Checkbox
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
            label='Use shipping address as billing address'
            classNames={{
              body: 'checkbox-body',
              inner: 'checkbox-inner',
              label: 'checkbox-label',
            }}
          />

          {!checked && (
            <div className='space-y-4 pt-6'>
              <TextInput
                {...form.getInputProps('billingAddressF.firstName')}
                withAsterisk
                label='First Name'
                classNames={{
                  root: 'form-root',
                  label: 'form-label',
                  input: cn(
                    'form-input',
                    form?.errors['billingAddress.firstName'] &&
                      'border-brand-red-400 text-secondary'
                  ),
                  error: 'text-brand-red-400',
                }}
              />
              <TextInput
                {...form.getInputProps('billingAddress.lastName')}
                withAsterisk
                label='Last Name'
                classNames={{
                  root: 'form-root',
                  label: 'form-label',
                  input: cn(
                    'form-input',
                    form?.errors['billingAddress.lastName'] &&
                      'border-brand-red-400 text-secondary'
                  ),
                  error: 'text-brand-red-400',
                }}
              />

              <Select
                defaultChecked
                {...form.getInputProps('billingAddress.country')}
                mt='md'
                withAsterisk
                comboboxProps={{ withinPortal: true }}
                data={countries}
                rightSection={<ChevronDown className='size-4' />}
                classNames={{
                  root: 'form-root',
                  label: 'form-label',
                  input: cn(
                    'form-input',
                    form?.errors['billingAddress.country'] &&
                      'form-error--input'
                  ),
                }}
                placeholder='Pick your country'
                label='Country'
                onChange={(value) => {
                  form.getInputProps('billingAddress.country').onChange(value);
                }}
              />
              <TextInput
                {...form.getInputProps('billingAddress.state')}
                label='State'
                classNames={{
                  root: 'form-root',
                  label: 'form-label',
                  input: cn(
                    'form-input',
                    form?.errors['billingAddress.state'] &&
                      'border-brand-red-400 text-secondary'
                  ),
                  error: 'text-brand-red-400',
                }}
              />
              <TextInput
                {...form.getInputProps('billingAddress.city')}
                label='City'
                withAsterisk
                classNames={{
                  root: 'form-root',
                  label: 'form-label',
                  input: cn(
                    'form-input',
                    form?.errors['billingAddress.city'] &&
                      'border-brand-red-400 text-secondary'
                  ),
                  error: 'text-brand-red-400',
                }}
              />
              <TextInput
                {...form.getInputProps('billingAddress.zip')}
                label='Postcode'
                withAsterisk
                classNames={{
                  root: 'form-root',
                  label: 'form-label',
                  input: cn(
                    'form-input',
                    form?.errors['billingAddress.zip'] &&
                      'border-brand-red-400 text-secondary'
                  ),
                  error: 'text-brand-red-400',
                }}
              />

              <TextInput
                {...form.getInputProps('billingAddress.company')}
                label='Company'
                classNames={{
                  root: 'form-root',
                  label: 'form-label',
                  input: cn(
                    'form-input',
                    form?.errors['billingAddress.company'] &&
                      'border-brand-red-400 text-secondary'
                  ),
                  error: 'text-brand-red-400',
                }}
              />
              <TextInput
                {...form.getInputProps('billingAddress.addressLine1')}
                withAsterisk
                label='Address Line 1'
                classNames={{
                  root: 'form-root',
                  label: 'form-label',
                  input: cn(
                    'form-input',
                    form?.errors['billingAddress.addressLine1'] &&
                      'border-brand-red-400 text-secondary'
                  ),
                  error: 'text-brand-red-400',
                }}
              />
              <TextInput
                {...form.getInputProps('billingAddress.addressLine2')}
                label='Address Line 2'
                classNames={{
                  root: 'form-root',
                  label: 'form-label',
                  input: cn(
                    'form-input',
                    form?.errors['billingAddress.addressLine2'] &&
                      'border-brand-red-400 text-secondary'
                  ),
                  error: 'text-brand-red-400',
                }}
              />
              <TextInput
                {...form.getInputProps('billingAddress.phoneNumber')}
                withAsterisk
                label='Contact Number'
                classNames={{
                  root: 'form-root',
                  label: 'form-label',
                  input: cn(
                    'form-input',
                    form?.errors['billingAddress.phoneNumber'] &&
                      'border-brand-red-400 text-secondary'
                  ),
                  error: 'text-brand-red-400',
                }}
              />
            </div>
          )}

          <button className={cn('btn btn-primary mt-12 w-full')}>
            Continue to Shipping Options
          </button>
        </form>
      )}
    </div>
  );
}

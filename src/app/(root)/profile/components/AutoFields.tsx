import { useState, useEffect } from 'react';
import { XCircle } from 'lucide-react';
import { Autocomplete, Select } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { Form, UseFormReturnType } from '@mantine/form';

import { cn } from '@/shared/lib/utils';
import axios, { AxiosError } from 'axios';
import classes from '../styles.module.css';

type Props = {
  form: UseFormReturnType<{
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    postcode: string;
    company: string;
    addressOne: string;
    addressTwo: string;
    contactNumber: string;
    county: string;
  }>;
  classNames?: {
    root?: string;
    input?: string;
    button?: string;
  };
};

const countries = ['Canada', 'United States'];

export const AutoFields = ({ form, classNames }: Props) => {
  const [found, setFound] = useState(false);
  const [cities, setCities] = useState<string[]>([]);

  const onResetCity = () => {
    form.setFieldValue('city', '');
  };

  const findCountries = async (updated: string | null) => {
    if (form.values.country === updated || !updated) return;

    try {
      setFound(false);
      const res = await axios.post(
        'https://countriesnow.space/api/v0.1/countries/cities',
        {
          country: updated
        }
      );
      setFound(true);
      setCities(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Select
        mt='md'
        withAsterisk
        comboboxProps={{ withinPortal: true }}
        data={countries}
        styles={{
          root: {
            margin: 0
          }
        }}
        classNames={{
          root: cn('form-root', classes.fieldSizing),
          label: 'form-label',
          input: cn('form-input', form?.errors?.country && 'form-error--input'),
        }}
        placeholder='Pick your country'
        label='Country'
        {...form.getInputProps('country')}
        onChange={(updated) => {
          findCountries(updated);
          form.getInputProps('country').onChange(updated);
          onResetCity();
          form.setFieldValue("postcode", "");
        }}
      />
      <Autocomplete
        withAsterisk
        disabled={!found}
        classNames={{
          root: cn('form-root', classes.fieldSizing),
          label: 'form-label',
          input: cn('form-input', form?.errors?.city && 'form-error--input'),
        }}
        {...form.getInputProps('city')}
        limit={10}
        label='Town/City'
        rightSection={
          form.values.city &&
          form.values.country && (
            <button
              className={cn('group absolute right-2', classNames?.button)}
              onClick={onResetCity}
            >
              <XCircle className='h-6 w-6 fill-brand-grey-800 stroke-primary group-hover:fill-secondary' />
            </button>
          )
        }
        placeholder='Pick your city'
        data={cities}
      />
    </>
  );
};

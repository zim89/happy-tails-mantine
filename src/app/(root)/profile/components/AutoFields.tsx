import { useState, useEffect } from 'react';
import { XCircle } from 'lucide-react';
import { Autocomplete } from '@mantine/core';
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
export const AutoFields = ({ form, classNames }: Props) => {
  const [debounced] = useDebouncedValue(form.values.country, 500);
  const [found, setFound] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  const onResetCountry = () => {
    form.setFieldValue('country', '');
    setFound(false);
    onResetCity();
  };

  const onResetCity = () => {
    form.setFieldValue('city', '');
  };

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        'http://api.geonames.org/searchJSON?username=dima5381&continentCode=NA&featureClass=A'
      );

      const raw: { countryName: string }[] = res.data.geonames;
      const transformed = raw.reduce(
        (acc, curr) => acc.add(curr.countryName),
        new Set<string>()
      );
      setCountries([...transformed.values()]);
    })();
  }, []);

  useEffect(() => {
    if (!debounced.trim()) return;

    (async () => {
      try {
        const res = await axios.post(
          'https://countriesnow.space/api/v0.1/countries/cities',
          {
            country: debounced,
            limit: 10,
          }
        );
        setFound(true);
        setCities(res.data.data);
      } catch (err) {
        if (err instanceof AxiosError) console.log(err.response?.data.msg);
        setFound(false);
      }
    })();
  }, [debounced]);

  return (
    <>
      <Autocomplete
        withAsterisk
        label='Country'
        classNames={{
          root: cn('form-root', classes.fieldSizing),
          input: cn('form-input', form?.errors?.country && 'form-error--input'),
          label: 'form-label',
        }}
        rightSection={
          form.values.country && (
            <button
              className={cn('group absolute right-2', classNames?.button)}
              onClick={onResetCountry}
            >
              <XCircle className='h-6 w-6 fill-brand-grey-800 stroke-primary group-hover:fill-secondary' />
            </button>
          )
        }
        disabled={!countries.length}
        placeholder='Pick your country'
        data={countries}
        {...form.getInputProps('country')}
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

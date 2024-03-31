import { UseFormReturnType } from '@mantine/form';

import classes from '../styles.module.css';
import { Autocomplete } from '@mantine/core';
import { cn } from '@/shared/lib/utils';
import { XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Postcode = { postal_code: string, place_name: string };

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
};

export const PostalCodeField = ({ form }: Props) => {
  const [codes, setCodes] = useState<string[]>([]);

  const onResetValue = () => {
    form.setFieldValue('postcode', '');
  };

  useEffect(() => {
    if (!form.values.city.trim()) {
      onResetValue();
      return;
    }
    (async () => {
      const res = await axios.get(
        `https://zip-api.eu/api/v1/codes/place_name=${form.values.city}`
      );
      
      let raw: Postcode | Array<Postcode> = res.data;
      // If there is only one postcode (single object instead of Array), will transform it to array with single element
      !Array.isArray(raw) && (raw = [raw]);

      const transformed = raw.map(({ postal_code, place_name }) => `${postal_code} (${place_name})`);
      setCodes(transformed);
    })();
  }, [form.values.city]);

  return (
    <Autocomplete
      withAsterisk
      classNames={{
        root: cn('form-root', classes.fieldSizing),
        label: 'form-label',
        input: cn('form-input', form?.errors?.city && 'form-error--input'),
      }}
      {...form.getInputProps('postcode')}
      label='Postcode'
      rightSection={
        form.values.city &&
        form.values.postcode && (
          <button
            className={cn('group absolute right-2', classes?.button)}
            onClick={onResetValue}
          >
            <XCircle className='h-6 w-6 fill-brand-grey-800 stroke-primary group-hover:fill-secondary' />
          </button>
        )
      }
      placeholder='Pick your postcode'
      data={codes}
      limit={5}
    />
  );
};

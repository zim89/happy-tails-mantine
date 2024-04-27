import { UseFormReturnType } from '@mantine/form';

import classes from '../styles.module.css';
import { Autocomplete } from '@mantine/core';
import { cn } from '@/shared/lib/utils';
import { XCircle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

type Postcode = { postal_code: string, place_name: string, country_code: string, state: string };

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

  const onResetValue = useCallback(() => {
    form.setFieldValue('postcode', '');
  }, []);

  useEffect(() => {
    if (!form.values.city.trim()) {
      onResetValue();
      setCodes([]);
      return;
    }
    (async () => {
      try {
        // Pick postcodes only from selected countries
        const country_code = form.values.country === "Canada" ? "CA" : "US";
        const res = await axios.get(
          `https://zip-api.eu/api/v1/codes/place_name=${country_code}-${form.values.city}`
        );

        form.clearFieldError("postcode");
        let raw: Postcode | Array<Postcode> = res.data;

        // If there is only one postcode (single object instead of Array), will transform it to array with single element
        !Array.isArray(raw) && (raw = [raw]);
          
        const transformed = raw.map(({ postal_code, place_name, country_code, state }) => `${postal_code}, (${country_code}, ${state}, ${place_name})`);
        setCodes(transformed);

      } catch (err) {
        if (err instanceof AxiosError) {
          form.setFieldError("postcode", `${err.response?.data.message}. Please, put the code yourself`);
        }
      }
    })();
  }, [form.values.city, form]);

  return (
    <Autocomplete
      withAsterisk
      classNames={{
        root: cn('form-root', classes.fieldSizing),
        label: 'form-label',
        input: cn('form-input', form?.errors?.city && 'form-error--input'),
        error: 'form-error',
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
            <XCircle className={classes.clearField} />
          </button>
        )
      }
      placeholder='Pick your postcode'
      data={codes}
      limit={5}
    />
  );
};

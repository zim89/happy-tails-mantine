import { UseFormReturnType } from '@mantine/form';
import {
  PhoneInput,
  defaultCountries,
  parseCountry,
} from 'react-international-phone';

import { cn } from '@/shared/lib/utils';

import classes from '../styles.module.css';

// Picks only necessary countries
const countries = defaultCountries.filter((country) => {
  const { iso2 } = parseCountry(country);
  return ['us', 'ca'].includes(iso2);
});

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

export const PhoneField = ({ form }: Props) => {
  return (
    <div className='flex w-full flex-col lg:w-auto'>
      <label className='form-label block text-left' htmlFor='phone'>
        Phone
      </label>
      <PhoneInput
        inputProps={{
          id: 'phone',
        }}
        defaultCountry='us'
        {...form.getInputProps('contactNumber')}
        countries={countries}
        className={cn('form-root', classes.fieldSizing)}
        inputClassName='w-full !rounded-[2px] !bg-transparent !border-brand-grey-400'
      />
    </div>
  );
};

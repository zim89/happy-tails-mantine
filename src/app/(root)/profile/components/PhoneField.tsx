import { UseFormReturnType } from '@mantine/form';
import {
  PhoneInput,
  PhoneInputProps,
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

type Props = PhoneInputProps & {
  withAsterisk?: true;
};

export const PhoneField = ({ withAsterisk, ...props }: Props) => {
  return (
    <div className='flex w-full flex-col lg:w-auto'>
      <label className='form-label block text-left' htmlFor='phone'>
        Phone {withAsterisk && <span className='text-brand-red-400'>*</span>}
      </label>
      <PhoneInput
        {...props}
        inputProps={{
          id: 'phone',
        }}
        defaultCountry='us'
        countries={countries}
        className={cn('form-root', classes.fieldSizing, props.className)}
        inputClassName={cn(
          'w-full !rounded-[2px] !border-brand-grey-400 !bg-transparent',
          props.inputClassName
        )}
      />
    </div>
  );
};

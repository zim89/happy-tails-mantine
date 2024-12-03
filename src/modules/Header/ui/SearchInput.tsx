import { TextInput } from '@mantine/core';
import { useDebouncedCallback, useUncontrolled } from '@mantine/hooks';
import { Search } from 'lucide-react';
import { useState } from 'react';

type SearchInputProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export const SearchInput = ({
  value,
  defaultValue,
  onChange,
}: SearchInputProps) => {
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    onChange,
  });
  console.log('🚀 ~ _value:', _value);

  return (
    <TextInput
      placeholder='What are you looking for?'
      leftSection={<Search className='h-4 w-4' />}
      value={_value}
      maxLength={80}
      onChange={(event) =>
        handleChange(
          event.currentTarget?.value.length <= 80
            ? event.currentTarget.value
            : _value
        )
      }
      classNames={{
        input:
          'form-input py-3 pl-8 pr-4 text-base placeholder:text-base placeholder:text-brand-grey-600 hover:border-secondary focus:border-secondary',
        section: 'text-brand-grey-600',
      }}
    />
  );
};

'use client';

import { useEffect, useState } from 'react';
import { Search, XCircle } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

export default function SearchForm() {
  const query = useSearchParams();
  const { replace } = useRouter();
  const path = usePathname();
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 300, { leading: true });

  const onChange = (value: string) => {
    const params = new URLSearchParams(query);
    params.set('page', '1');
    replace(`${path}?${params.toString()}`);
    setValue(value);
  };

  const onReset = () => {
    const params = new URLSearchParams(query);
    params.set('page', '1');
    replace(`${path}?${params.toString()}`);
    setValue('');
  };

  useEffect(() => {
    setValue(query.get('name') || '');
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(query);
    debounced ? params.set('name', debounced) : params.delete('name');
    replace(`${path}?${params.toString()}`);
  }, [debounced, path, query, replace]);
  return (
    <div className='mb-8 space-y-4 md:mx-auto md:mb-12 md:w-[458px] lg:mb-16 lg:w-[572px]'>
      <h2 className='heading text-center'>Search results</h2>
      <div className='relative'>
        <TextInput
          placeholder='What are you looking for?'
          leftSection={<Search className='h-4 w-4' />}
          value={value}
          onChange={(event) => onChange(event.currentTarget.value)}
          classNames={{
            input:
              'rounded-0.5 border border-brand-grey-400 bg-primary py-3 pl-8 pr-4 text-base placeholder:text-base placeholder:text-brand-grey-600 hover:border-secondary focus:border-secondary',
            section: 'text-brand-grey-600',
          }}
        />
        {value && (
          <button
            className='group absolute right-3 top-1/2 -translate-y-1/2'
            onClick={onReset}
          >
            <XCircle className='h-6 w-6 fill-brand-grey-800 stroke-primary group-hover:fill-secondary' />
          </button>
        )}
      </div>
    </div>
  );
}

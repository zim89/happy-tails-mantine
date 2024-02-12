'use client';

import React, { useEffect, useState } from 'react';
import { Container, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, XCircle } from 'lucide-react';

import Breadcrumbs from '@/components/Breadcrumbs';
import CatalogProductList from '@/modules/CatalogProductList';

interface Props {
  searchParams: {
    name: string;
    page?: string;
  };
}

export default function Page({ searchParams }: Props) {
  const query = useSearchParams();
  const path = usePathname();
  const { replace } = useRouter();

  const [page, setPage] = useState(1);
  const [value, setValue] = useState(searchParams.name);
  const [debounced] = useDebouncedValue(value, 300);

  const onChange = (value: string) => {
    setPage(1);
    setValue(value);
  };

  const onReset = () => {
    setPage(1);
    setValue('');
  };

  useEffect(() => {
    const params = new URLSearchParams(query);
    debounced ? params.set('name', debounced) : params.delete('name');
    params.set('page', String(page));
    replace(`${path}?${params.toString()}`);
  }, [page, debounced]);

  return (
    <Container>
      <div className='pb-12'>
        <Breadcrumbs
          crumbs={[{ href: '/', text: 'Home' }, { text: 'Search' }]}
        />

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

        <CatalogProductList />
      </div>
    </Container>
  );
}

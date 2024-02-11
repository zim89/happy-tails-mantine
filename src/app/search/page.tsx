'use client';

import React, { useEffect, useState } from 'react';
import { Container, Pagination, TextInput } from '@mantine/core';
import {
  useDebouncedValue,
  useMediaQuery,
  useScrollIntoView,
} from '@mantine/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, XCircle } from 'lucide-react';

import PaginationPrevBtn from '@/components/PaginationPrevBtn';
import PaginationNextBtn from '@/components/PaginationNextBtn';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductList from '@/modules/ProductList';
import { useFindManyQuery } from '@/shared/api/productApi';

interface Props {
  searchParams: {
    name: string;
    page?: string;
  };
}

export default function Page({ searchParams }: Props) {
  const isTablet = useMediaQuery('(min-width: 768px)');
  const query = useSearchParams();
  const path = usePathname();
  const { replace } = useRouter();

  const [page, setPage] = useState(Number(searchParams.page) || 1);
  const [value, setValue] = useState(searchParams.name);
  const [debounced] = useDebouncedValue(value, 300);

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 90,
    duration: 500,
  });

  const { data, isLoading, isError } = useFindManyQuery({
    name: debounced,
    page: page - 1,
    limit: 12,
  });

  const onChange = (value: string) => {
    setPage(1);
    setValue(value);
  };

  const onPaginationChange = (page: number) => {
    setPage(page);
    scrollIntoView();
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

  if (isLoading)
    return (
      <div>
        <p className='mb-[6.1875rem] mt-8 text-center font-light text-brand-grey-700 md:mb-36 md:text-2xl/normal'>
          Loading...
        </p>
      </div>
    );

  if (isError || !data)
    return (
      <div>
        <p className='mb-[6.1875rem] mt-8 text-center font-light text-brand-grey-700 md:mb-36 md:text-2xl/normal'>
          Something went wrong...
        </p>
      </div>
    );

  return (
    <Container>
      <div className='pb-12'>
        <Breadcrumbs
          crumbs={[{ href: '/', text: 'Home' }, { text: 'Search' }]}
        />

        <div className='mb-8 space-y-4 md:mx-auto md:mb-12 md:w-[458px] lg:mb-16 lg:w-[572px]'>
          <h2 className='heading text-center'>Search results</h2>
          <div className='relative' ref={targetRef}>
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

        {!data.empty ? (
          <div className='space-y-12'>
            <ProductList data={data.content} />

            <Pagination
              mt={{ base: 24, md: 48, lg: 72 }}
              value={page}
              onChange={onPaginationChange}
              total={data.totalPages}
              siblings={isTablet ? 1 : 0}
              previousIcon={PaginationPrevBtn}
              nextIcon={PaginationNextBtn}
              classNames={{
                root: 'pagination-root',
                control: 'pagination-control',
                dots: 'pagination-dots',
              }}
            />
          </div>
        ) : (
          <p className='mb-[6.1875rem] mt-8 text-center font-light text-brand-grey-700 md:mb-36 md:text-2xl/normal'>
            No matching results
          </p>
        )}
      </div>
    </Container>
  );
}

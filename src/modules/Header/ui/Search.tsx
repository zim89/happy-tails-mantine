'use client';
import { useCallback, useState } from 'react';
import {
  Drawer,
  NumberFormatter,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import {
  useDebouncedValue,
  useDisclosure,
  useMediaQuery,
} from '@mantine/hooks';
import { ArrowRight, Loader2, Search, X, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useFindManyQuery } from '@/shared/api/productApi';

export default function SearchMenu() {
  const [opened, { open, close }] = useDisclosure(false);
  const isTablet = useMediaQuery('(min-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 500);

  const { data, isLoading, isError } = useFindManyQuery(
    {
      page: 0,
      limit: 12,
      name: debounced,
    },
    {
      skip: !debounced,
    }
  );

  const handleOpen = useCallback(() => {
    open();
    setValue('');
  }, [open]);

  return (
    <>
      <UnstyledButton
        className='flex items-center justify-center'
        aria-label='Search'
        onClick={handleOpen}
      >
        <Search className='iconBtn' />
      </UnstyledButton>

      <Drawer
        opened={opened}
        onClose={close}
        overlayProps={{ backgroundOpacity: 0.2, color: '#161616' }}
        withCloseButton={false}
        position={'right'}
        size={isDesktop ? 453 : isTablet ? 495 : '100%'}
        classNames={{
          body: 'flex h-full flex-col py-12 px-4 md:px-9',
        }}
      >
        <div className='relative'>
          <X className='iconBtn absolute right-0 top-0' onClick={close} />
          <h3 className='text-[28px]/auto mb-8 font-bold'>Search</h3>
          <div className='relative'>
            <TextInput
              placeholder='What are you looking for?'
              leftSection={<Search className='h-4 w-4' />}
              value={value}
              onChange={(event) => setValue(event.currentTarget.value)}
              classNames={{
                input:
                  'rounded-0.5 border border-brand-grey-400 bg-primary py-3 pl-8 pr-4 text-base placeholder:text-base placeholder:text-brand-grey-600 hover:border-secondary focus:border-secondary',
                section: 'text-brand-grey-600',
              }}
            />
            {value && (
              <button
                className='group absolute right-3 top-1/2 -translate-y-1/2'
                onClick={() => setValue('')}
              >
                <XCircle className='h-6 w-6 fill-brand-grey-800 stroke-primary group-hover:fill-secondary' />
              </button>
            )}
          </div>
        </div>

        <div className='pt-10'>
          {isLoading && (
            <div className='flex justify-center'>
              <Loader2 className='h-6 w-6 animate-spin text-brand-orange-400' />
            </div>
          )}

          {!isLoading && isError && (
            <p className='border-b border-b-brand-grey-600 py-3 text-base font-light'>
              `Sorry, something went wrong. Try again later.`
            </p>
          )}

          {!isLoading && !isError && value && data && (
            <>
              {data.content.length === 0 && (
                <p className='border-b border-b-brand-grey-600 py-3 text-base font-light'>
                  {`Sorry, nothing found for "${debounced}"`}
                </p>
              )}

              {data.content.length > 0 && (
                <p className='border-b border-b-brand-grey-600 py-3 text-base font-light'>
                  {`${data?.totalElements} Product results for "${debounced}"`}
                </p>
              )}

              <ul>
                {data.content.slice(0, 5).map((product) => {
                  return (
                    <li key={product.id}>
                      <Link
                        href={`/products/${product.id}`}
                        className='flex w-full items-center gap-6 px-2 py-3'
                        onClick={close}
                      >
                        <div className='relative h-16 w-16 flex-none'>
                          <Image
                            src={product.imagePath}
                            alt={product.name}
                            fill={true}
                            className='object-contain'
                            sizes='25vw'
                          />
                        </div>

                        <div className='grow space-y-1'>
                          <p className='text-base font-bold'>{product.name}</p>
                          <NumberFormatter
                            prefix='$ '
                            value={product.price}
                            decimalScale={2}
                            className='text-sm/normal'
                          />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {data.content.length > 5 && (
                <Link
                  href={{
                    pathname: '/search',
                    query: { name: value, page: 1 },
                  }}
                  className='ml-auto flex w-min items-center gap-2 whitespace-nowrap py-3 text-sm/normal'
                  onClick={close}
                >
                  <span>Show all results</span>
                  <ArrowRight className='h-4 w-4' />
                </Link>
              )}
            </>
          )}
        </div>
      </Drawer>
    </>
  );
}

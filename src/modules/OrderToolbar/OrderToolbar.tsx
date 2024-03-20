'use client';
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import SortBy, { Option } from '@/modules/Toolbar/components/SortBy';
import { Field } from '@/modules/SearchForm/ui/Field';

const sortOptions: Option[] = [
  { title: 'For all time', value: 'all-time' },
  { title: 'For the last 30 days', value: 'last-30-d' },
  { title: 'Fot the last 6 months', value: 'last-6-m' },
  { title: '2023', value: '2023-y' },
  { title: '2022', value: '2022-y' },
];

export default function OrderToolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (values: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(values).forEach(([key, value]) =>
        value ? params.set(key, value) : params.delete(key)
      );

      return params.toString();
    },
    [searchParams]
  );

  return (
    
    <div className='flex gap-4'>
      <div className="flex-1">
        <Field placeholder="Search by all orders" />
      </div>
      <div className="flex-1">
      <SortBy
        options={sortOptions}
        defaultOption={{ title: "Time", value: "none" }}
        onSelect={(sort) => {
          router.push(
            pathname +
              '?' +
              createQueryString({
                sort: sort.value,
              })
          );
        }}
      />
      </div>
    </div>
    
  );
}

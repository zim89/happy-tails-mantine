'use client';

import { Category } from '@/shared/api/categoryApi';
import { useForm } from '@mantine/form';
import { useCallback, useId } from 'react';
import Filter from './components/Filter';
import { FilterFormValues } from './components/FilterForm/FilterForm';
import SortBy, { type Option } from './components/SortBy';
import Badges from './components/Badges';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const sortOptions: Option[] = [
  { title: 'Featured', value: 'none' },
  { title: 'Price, Low to High', value: 'price-asc' },
  { title: 'Price, High to Low', value: 'price-desc' },
  { title: 'Alphabetically, A - Z', value: 'name-asc' },
  { title: 'Alphabetically, Z - A', value: 'name-desc' },
];

export type ToolbarProps = {
  category: Category;
  categories: Category[];
};

export default function Toolbar({ category, categories }: ToolbarProps) {
  const collapseId = useId();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (values: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(values).forEach(([key, value]) => params.set(key, value));

      return params.toString();
    },
    [searchParams]
  );

  const form = useForm<FilterFormValues>({
    initialValues: {
      category: searchParams.get('category') ?? category.id.toString(),
      price: searchParams.get('price') ?? 'none',
      onlyInStock: searchParams.get('inStock') === 'true' ?? false,
    },
  });

  return (
    <div>
      <div className='mb-4 flex items-center text-sm/4 md:py-2 md:text-base'>
        <Filter
          target={`#${CSS.escape(collapseId)}`}
          form={form}
          category={category}
          categories={categories}
          onSubmit={form.onSubmit((values) => {
            router.push(
              pathname +
                '?' +
                createQueryString({
                  category: values.category,
                  price: values.price,
                  inStock: values.onlyInStock.toString(),
                })
            );
          })}
        />
        <p className='hidden md:block'>{category?.productCount} Results</p>
        <Badges
          form={form}
          className='ml-12 hidden lg:block'
          category={category}
          categories={categories}
        />
        <SortBy
          options={sortOptions}
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
      <div id={collapseId}></div>
    </div>
  );
}

'use client';

import { Category } from '@/shared/api/categoryApi';
import { Sort } from '@/shared/types/types';
import { useForm } from '@mantine/form';
import { useContext, useId } from 'react';
import { ToolbarContext } from './ToolbarContext';
import Filter from './components/Filter';
import { FilterFormValues } from './components/FilterForm/FilterForm';
import SortBy, { type Option } from './components/SortBy';
import Badges from './components/Badges';

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
  const [_, setToolbar] = useContext(ToolbarContext);

  const form = useForm<FilterFormValues>({
    initialValues: {
      category: category.id.toString(),
      price: 'none',
      onlyInStock: false,
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
          onSubmit={form.onSubmit((values) =>
            setToolbar((prev) => ({
              ...prev,
              filter: JSON.parse(JSON.stringify(values)),
            }))
          )}
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
          onSelect={(sort) =>
            setToolbar((prev) => ({
              ...prev,
              sort:
                sort.value !== 'none'
                  ? (sort.value.split('-') as Sort)
                  : undefined,
            }))
          }
        />
      </div>
      <div id={collapseId}></div>
    </div>
  );
}

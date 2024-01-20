'use client';

import { Category, getAllCategories } from '@/shared/api/categoryApi';
import SortBy, { type Option } from './components/SortBy';
import Filter from './components/Filter';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import FilterForm from './components/FilterForm';
import { FilterFormValues } from './components/FilterForm/FilterForm';
import { Collapse } from '@mantine/core';
import { useId, useRef } from 'react';

const sortOptions: Option[] = [
  { title: 'Featured', value: 'featured' },
  { title: 'Price, Low to High', value: 'price-asc' },
  { title: 'Price, High to Low', value: 'price-des' },
  { title: 'Alphabetically, A - Z', value: 'name-asc' },
  { title: 'Alphabetically, Z - A', value: 'name-des' },
];

export type ToolbarProps = {
  category: Category;
  categories: Category[];
};

export default function Toolbar({ category, categories }: ToolbarProps) {
  const collapseId = useId();

  const form = useForm<FilterFormValues>({
    initialValues: {
      categories: [],
      prices: [],
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
          onSubmit={form.onSubmit((values) => console.log(values))}
        />
        <p className='hidden md:block'>{category?.productCount} Results</p>
        <SortBy
          options={sortOptions}
          onSelect={(option) => console.log(option)}
        />
      </div>
      <div id={collapseId}></div>
    </div>
  );
}

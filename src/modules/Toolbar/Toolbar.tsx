'use client';

import { useForm } from '@mantine/form';
import { useCallback, useContext, useEffect, useId } from 'react';
import Filter from './components/Filter';
import { FilterFormValues } from './components/FilterForm/FilterForm';
import SortBy, { type Option } from './components/SortBy';
import Badges from './components/Badges';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ProductCountContext } from '../CatalogProductList/ProductCountContext';
import { useDisclosure } from '@mantine/hooks';
import { Category } from '@/shared/types/types';
import { useSearchString } from '@/shared/helpers/searchParams.helpers';

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
  const [productCount] = useContext(ProductCountContext);
  const [opened, { close, toggle }] = useDisclosure(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [createQueryString] = useSearchString(searchParams);

  const form = useForm<FilterFormValues>({
    initialValues: {
      category: category.id.toString(),
      price: 'none',
      size: 'none',
      color: 'none',
      onlyInStock: false,
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const category = params.get('category');
    const price = params.get('price');
    const size = params.get('productSize');
    const color = params.get('color');
    const inStock = params.get('inStock');

    if (category) form.setFieldValue('category', category);
    if (price) form.setFieldValue('price', price);
    if (size) form.setFieldValue('size', size);
    if (color) form.setFieldValue('color', color);
    if (inStock) form.setFieldValue('onlyInStock', inStock === 'true');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (form.isTouched())
      router.push(
        pathname +
          '?' +
          createQueryString({
            category: form.values.category,
            price: form.values.price,
            productSize: form.values.size,
            color: form.values.color,
            inStock: String(form.values.onlyInStock),
          })
      );

    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values]);

  return (
    <div>
      <div className='mb-4 flex items-center gap-4 text-sm/4 md:py-2 md:text-base'>
        <Filter
          target={`#${CSS.escape(collapseId)}`}
          form={form}
          category={category}
          categories={categories}
          opened={opened}
          onClose={close}
          onToggle={toggle}
        />
        <p className='hidden md:block'>{productCount} Results</p>
        <Badges
          form={form}
          className='ml-12 hidden lg:block'
          category={category}
          categories={categories}
        />
        <SortBy
          options={sortOptions}
          defaultOption={sortOptions.find(
            (opt) => opt.value === searchParams.get('sort')
          )}
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

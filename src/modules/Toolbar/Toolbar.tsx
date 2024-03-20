'use client';

import { Category } from '@/shared/api/categoryApi';
import { useForm } from '@mantine/form';
import { useCallback, useContext, useEffect, useId } from 'react';
import Filter from './components/Filter';
import { FilterFormValues } from './components/FilterForm/FilterForm';
import SortBy, { type Option } from './components/SortBy';
import Badges from './components/Badges';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ProductCountContext } from '../CatalogProductList/ProductCountContext';
import { useDisclosure } from '@mantine/hooks';

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

  const form = useForm<FilterFormValues>({
    initialValues: {
      category: category.id.toString(),
      price: 'none',
      onlyInStock: false,
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const category = params.get('category');
    const price = params.get('price');
    const inStock = params.get('inStock');

    if (category) form.setFieldValue('category', category);
    if (price) form.setFieldValue('price', price);
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
            inStock: String(form.values.onlyInStock),
          })
      );

    close();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values]);

  return (
    <div>
      <div className='mb-4 flex gap-4 items-center text-sm/4 md:py-2 md:text-base'>
        <Filter
          target={`#${CSS.escape(collapseId)}`}
          form={form}
          category={category}
          categories={categories}
          onSubmit={(e) => {
            e.preventDefault();
          }}
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

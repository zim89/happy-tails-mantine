import RadioCheck from '@/components/RadioCheck';
import { cn } from '@/lib/utils';
import { Category } from '@/shared/api/categoryApi';
import { Radio, Switch } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { FormEvent } from 'react';

export type FilterFormValues = {
  category: string;
  price: string;
  onlyInStock: boolean;
};

export type FilterFormProps = {
  category: Category;
  categories: Category[];
  form: UseFormReturnType<FilterFormValues>;
  desktop?: boolean;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
};

export default function FilterForm({
  form,
  category,
  categories,
  desktop,
  onSubmit,
}: FilterFormProps) {
  const categoryId = category.id;
  return (
    <form onSubmit={onSubmit}>
      <div
        className={cn(
          'mb-8 space-y-8 px-5 py-4 md:mb-12 md:p-0 lg:mb-0',
          desktop && 'flex gap-10 space-y-0 text-left'
        )}
      >
        <Radio.Group
          defaultValue={categoryId.toString()}
          label='Category'
          classNames={{
            label: 'font-bold mb-4 text-base',
          }}
          {...form.getInputProps('category')}
        >
          <ul className='space-y-3.5'>
            {categories.map((category) => (
              <li key={category.id}>
                <RadioCheck
                  value={category.id.toString()}
                  label={category.name}
                  disabled={categoryId > 0 && category.id !== categoryId}
                />
              </li>
            ))}
          </ul>
        </Radio.Group>
        <Radio.Group
          label='Price'
          classNames={{
            label: 'font-bold mb-4 text-base',
          }}
          {...form.getInputProps('price')}
        >
          <ul className='space-y-3.5'>
            <li>
              <RadioCheck value='-20' label='Under $20' />
            </li>
            <li>
              <RadioCheck value='20-50' label='$20 - $50' />
            </li>
            <li>
              <RadioCheck value='50-70' label='$50 - $70' />
            </li>
            <li>
              <RadioCheck value='70-90' label='$70 - $90' />
            </li>
            <li>
              <RadioCheck value='90-' label='$90 & Above' />
            </li>
          </ul>
        </Radio.Group>

        <div>
          <div className='mb-4 text-base font-bold'>Availability</div>
          {/* TODO: add styles for turned off switch */}
          <Switch
            color='black'
            size='xs'
            label='Show only in stock products'
            {...form.getInputProps('onlyInStock', { type: 'checkbox' })}
          />
        </div>
      </div>
    </form>
  );
}

import Checkbox from '@/components/Checkbox';
import { cn } from '@/lib/utils';
import { Category } from '@/shared/api/categoryApi';
import { Checkbox as RawCheckbox, Switch } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { FormEvent } from 'react';

export type FilterFormValues = {
  categories: string[];
  prices: string[];
  onlyInStock: boolean;
};

export type FilterFormProps = {
  category: Category;
  categories: Category[];
  form: UseFormReturnType<FilterFormValues>;
  desktop?: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onClose?: () => void;
};

export default function FilterForm({
  form,
  category,
  categories,
  desktop,
  onSubmit,
  onClose,
}: FilterFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div
        className={cn(
          'mb-8 space-y-8 px-5 py-4 md:mb-12 md:p-0 lg:mb-0',
          desktop && 'flex gap-10 space-y-0 text-left'
        )}
      >
        <RawCheckbox.Group
          defaultValue={[category.id.toString()]}
          label='Category'
          classNames={{
            label: 'font-bold mb-4 text-base',
          }}
          {...form.getInputProps('categories')}
        >
          <ul className='space-y-3.5'>
            {categories.slice(1).map((category) => (
              <li key={category.id}>
                <Checkbox
                  value={category.id.toString()}
                  label={category.name}
                />
              </li>
            ))}
          </ul>
        </RawCheckbox.Group>
        <RawCheckbox.Group
          label='Price'
          classNames={{
            label: 'font-bold mb-4 text-base',
          }}
          {...form.getInputProps('prices')}
        >
          <ul className='space-y-3.5'>
            <li>
              <Checkbox value='<20' label='Under $20' />
            </li>
            <li>
              <Checkbox value='20-50' label='$20 - $50' />
            </li>
            <li>
              <Checkbox value='50-70' label='$50 - $70' />
            </li>
            <li>
              <Checkbox value='70-90' label='$70 - $90' />
            </li>
            <li>
              <Checkbox value='>90' label='$90 & Above' />
            </li>
          </ul>
        </RawCheckbox.Group>

        <div>
          <div className='mb-4 text-base font-bold'>Availability</div>
          {/* TODO: add styles for turned off switch */}
          <Switch
            color='black'
            size='xs'
            label='Show only in stock products'
            {...form.getInputProps('onlyInStock')}
          />
        </div>
      </div>

      <div
        className={cn(
          desktop && 'absolute bottom-9 right-9 flex w-[19rem] gap-4'
        )}
      >
        {desktop && (
          <button
            type='button'
            onClick={onClose}
            className='w-full max-w-[9rem] rounded-sm border border-brand-grey-400 px-4 py-2.5'
          >
            Close
          </button>
        )}

        <button className='w-full rounded-sm bg-secondary px-4 py-3 font-bold text-primary md:max-w-[13.8125rem] lg:max-w-[9rem] lg:py-2.5'>
          Apply
        </button>
      </div>
    </form>
  );
}

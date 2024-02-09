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
            {categories.slice(1).map((category) => (
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

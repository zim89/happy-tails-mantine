import RadioCheck from '@/components/RadioCheck';
import { COLORS } from '@/shared/constants/colors.const';
import { cn } from '@/shared/lib/utils';
import { Category } from '@/shared/types/types';
import { Radio, Switch } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { FormEvent } from 'react';

export type FilterFormValues = {
  category: string;
  price: string;
  size: string;
  color: string;
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

        <Radio.Group
          label='Price'
          classNames={{
            label: 'font-bold mb-4 text-base',
          }}
          {...form.getInputProps('size')}
        >
          <ul className='space-y-3.5'>
            <li>
              <RadioCheck value='XS' label='XS' />
            </li>
            <li>
              <RadioCheck value='S' label='S' />
            </li>
            <li>
              <RadioCheck value='M' label='M' />
            </li>
            <li>
              <RadioCheck value='L' label='L' />
            </li>
            <li>
              <RadioCheck value='XL' label='XL' />
            </li>
            <li>
              <RadioCheck value='XXL' label='XXL' />
            </li>
            <li>
              <RadioCheck value='ONE SIZE' label='ONE SIZE' />
            </li>
          </ul>
        </Radio.Group>

        <Radio.Group
          label='Color'
          classNames={{
            label: 'font-bold mb-4 text-base',
          }}
          variant='outline'
          {...form.getInputProps('color')}
        >
          <ul className='grid grid-cols-5 gap-4 lg:grid-cols-2'>
            {COLORS.map((color) => (
              <li key={color.name}>
                <Radio
                  value={color.name}
                  color={color.hex}
                  iconColor={color.hex}
                  //? NOTE: BG_COLORS constant here doesn't work
                  style={{
                    '--bg-color': color.hex,
                  }}
                  classNames={{
                    radio:
                      'size-[1.875rem] border-2 border-[#C8C8C8] checked:border-black bg-[--bg-color] cursor-pointer',
                  }}
                />
              </li>
            ))}
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

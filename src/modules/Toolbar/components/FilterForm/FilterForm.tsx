import RadioCheck from '@/components/RadioCheck';
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
            <li>
              <Radio
                value='White'
                color='#ffffff'
                iconColor='#ffffff'
                classNames={{
                  radio:
                    'size-[1.875rem] bg-[#ffffff] border-[#C8C8C8] checked:border-black border-2',
                }}
              />
            </li>
            <li>
              <Radio
                value='Gray'
                color='#969696'
                iconColor='#969696'
                classNames={{
                  radio:
                    'size-[1.875rem] bg-[#969696] border-[#787878] checked:border-black border-2',
                }}
              />
            </li>
            <li>
              <Radio
                value='Black'
                color='#000000'
                iconColor='#000000'
                classNames={{
                  radio:
                    'size-[1.875rem] bg-[#000000] border-[#C8C8C8] checked:border-black border-2',
                }}
              />
            </li>
            <li>
              <Radio
                value='Pink'
                color='#F4C1BE'
                iconColor='#F4C1BE'
                classNames={{
                  radio:
                    'size-[1.875rem] bg-[#F4C1BE] border-[#C8C8C8] checked:border-black border-2',
                }}
              />
            </li>
            <li>
              <Radio
                value='Yellow'
                color='#FFE605'
                iconColor='#FFE605'
                classNames={{
                  radio:
                    'size-[1.875rem] bg-[#FFE605] border-[#C8C8C8] checked:border-black border-2',
                }}
              />
            </li>
            <li>
              <Radio
                value='Green'
                color='#389B48'
                iconColor='#389B48'
                classNames={{
                  radio:
                    'size-[1.875rem] bg-[#389B48] border-[#C8C8C8] checked:border-black border-2',
                }}
              />
            </li>
            <li>
              <Radio
                value='Red'
                color='#DC362E'
                iconColor='#DC362E'
                classNames={{
                  radio:
                    'size-[1.875rem] bg-[#DC362E] border-[#C8C8C8] checked:border-black border-2',
                }}
              />
            </li>
            <li>
              <Radio
                value='Orange'
                color='#F39324'
                iconColor='#F39324'
                classNames={{
                  radio:
                    'size-[1.875rem] bg-[#F39324] border-[#C8C8C8] checked:border-black border-2',
                }}
              />
            </li>
            <li>
              <Radio
                value='Purple'
                color='#9747FF'
                iconColor='#9747FF'
                classNames={{
                  radio:
                    'size-[1.875rem] bg-[#9747FF] border-[#C8C8C8] checked:border-black border-2',
                }}
              />
            </li>
            <li>
              <Radio
                value='Blue'
                color='#4285F4'
                iconColor='#4285F4'
                classNames={{
                  radio:
                    'size-[1.875rem] bg-[#4285F4] border-[#C8C8C8] checked:border-black border-2',
                }}
              />
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

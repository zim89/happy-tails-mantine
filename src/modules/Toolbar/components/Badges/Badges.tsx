import { UseFormReturnType } from '@mantine/form';
import { FilterFormValues } from '../FilterForm/FilterForm';
import { cn } from '@/shared/lib/utils';
import { Badge } from '@mantine/core';
import { X } from 'lucide-react';
import { Category } from '@/shared/types/types';

export type BadgesProps = {
  form: UseFormReturnType<FilterFormValues>;
  category: Category;
  categories: Category[];
  className?: string;
};

export default function Badges({
  form,
  className,
  category,
  categories,
}: BadgesProps) {
  const { values } = form;
  const [min, max] = values.price.split('-');

  if (
    values.category !== category.id.toString() ||
    values.price !== 'none' ||
    values.size !== 'none'
  )
    return (
      <ul
        className={cn(
          'flex flex-wrap gap-3.5 lg:flex-nowrap lg:space-x-4',
          className
        )}
      >
        {values.category !== category.id.toString() ? (
          <Badge
            color='gray'
            variant='outline'
            size='xl'
            className='h-9 border-brand-grey-400 font-normal normal-case text-secondary'
            classNames={{
              label: 'flex items-center gap-2',
            }}
          >
            {
              categories.find(
                (category) => category.id.toString() === values.category
              )?.name
            }
            <button
              aria-label='remove category filter'
              onClick={() =>
                form.setFieldValue('category', category.id.toString())
              }
              type='button'
            >
              <X width={16} height={16} />
            </button>
          </Badge>
        ) : null}
        {values.price !== 'none' ? (
          <Badge
            color='gray'
            variant='outline'
            size='xl'
            className='h-9 border-brand-grey-400 font-normal normal-case text-secondary'
            classNames={{
              label: 'flex items-center gap-2',
            }}
          >
            {Number(min) > 0 ? '$' + min : 'Under'}
            {Number(min) > 0 && Number(max) > 0 ? ' - ' : ' '}
            {Number(max) > 0 ? '$' + max : ' & Above'}
            <button
              aria-label='remove price filter'
              onClick={() => form.setFieldValue('price', 'none')}
              type='button'
            >
              <X width={16} height={16} />
            </button>
          </Badge>
        ) : null}
        {values.size !== 'none' ? (
          <Badge
            color='gray'
            variant='outline'
            size='xl'
            className='h-9 border-brand-grey-400 font-normal normal-case text-secondary'
            classNames={{
              label: 'flex items-center gap-2',
            }}
          >
            {values.size}
            <button
              aria-label='remove size filter'
              onClick={() => form.setFieldValue('size', 'none')}
              type='button'
            >
              <X width={16} height={16} />
            </button>
          </Badge>
        ) : null}
      </ul>
    );
}

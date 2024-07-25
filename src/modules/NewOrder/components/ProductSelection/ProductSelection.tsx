import { Card, Combobox, Divider, InputBase, useCombobox } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { Fragment, useMemo, useState } from 'react';

import { NewOrderFields } from '@/shared/hooks/useNewOrderFormModel';
import { Product, ProductColor, ProductSizeValues } from '@/shared/types/types';
import { cn } from '@/shared/lib/utils';
import { Option } from '../Option';
import SelectedProduct from '../SelectedProduct';
import { Item } from '../../lib/types';
import { useSelectProducts } from '@/shared/hooks/useSelectProducts';

type Props = {
  form: UseFormReturnType<
    NewOrderFields,
    (values: NewOrderFields) => NewOrderFields
  >;
};

export default function ProductSelection({ form }: Props) {
  const data = useSelectProducts((state) => state);
  const combobox = useCombobox();

  const [value] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const addItem = (value: string) => {
    if (!form.values.items.includes(value)) {
      form.setFieldValue('items', (prev) => [...prev, value]);
      combobox.closeDropdown();
    }
  };

  const removeItem = (value: string) => {
    form.setFieldValue('items', (prev) => prev.filter((v) => v !== value));
  };

  const products = data.map(({ ...rest }) => {
    return { ...rest, totalQuantity: 1 };
  });

  const shouldFilterOptions = useMemo<boolean>(() => {
    return products.every(
      (item) => item.name.toLocaleLowerCase() !== search.toLowerCase()
    );
  }, [products.length, search]);

  const filteredOptions = shouldFilterOptions
    ? products.filter(
        (item) =>
          item.productStatus === 'IN STOCK' &&
          item.name.toLowerCase().includes(search.toLowerCase().trim())
      )
    : products;

  const options = filteredOptions
    // Filter the same products with different colors and sizes
    .reduce(
      (acc, curr) => {
        const foundDuplicate = acc.findIndex(
          (el) => el.article === curr.article
        );

        if (acc.length === 0 || foundDuplicate) {
          acc.push({
            ...curr,
            colors: [
              {
                productId: curr.id,
                value: curr.color || 'ONE COLOR',
                sizes: curr.productSizes?.map((size) => size.size) || [],
              },
            ],
          });
        } else {
          curr.color &&
            acc[foundDuplicate].colors.push({
              productId: curr.id,
              value: curr.color,
              sizes: curr.productSizes?.map((size) => size.size) || [],
            });
        }

        return acc;
      },
      [] as Array<
        (typeof filteredOptions)[number] & {
          colors: {
            value: ProductColor;
            sizes: ProductSizeValues[];
            productId: number;
          }[];
        }
      >
    )
    .map((item, option_index) => {
      return (
        <Fragment key={option_index}>
          <Option product={item} />
        </Fragment>
      );
    });

  const changeItemQuantity = (op: 'DECREASE' | 'INCREASE', id: number) => {
    const [candidate] = form.values.items.reduce<Product[]>((acc, prev) => {
      const parsed: Product = JSON.parse(prev);
      if (parsed.id === id) {
        acc.push(parsed);
      }

      return acc;
    }, []);

    if (op === 'DECREASE' && candidate.totalQuantity > 0) {
      candidate.totalQuantity -= 1;
    } else if (op === 'INCREASE') {
      candidate.totalQuantity += 1;
    }
    form.setFieldValue('items', (items) =>
      items.map((v) => {
        const parsed: Product = JSON.parse(v);
        if (parsed.id === id) {
          parsed.totalQuantity = candidate.totalQuantity;
          return JSON.stringify(parsed);
        }
        return v;
      })
    );
  };

  return (
    <Card classNames={{ root: 'mt-8 bg-white rounded-sm' }}>
      <h3 className='mb-2 text-xl/6 font-bold'>Product Options</h3>
      <Divider className='mb-6' />
      <Combobox onOptionSubmit={addItem} store={combobox}>
        <Combobox.Target>
          <div className={'flex flex-col gap-2'}>
            {/* Search input */}
            <InputBase
              label='Item'
              withAsterisk
              value={search}
              classNames={{
                input: cn(
                  'text-input max-w-[15.875rem]',
                  form?.errors?.items && 'form-error--input'
                ),
                root: 'form-root',
                label: 'form-label',
                error: 'form-error -bottom-[1em]',
              }}
              onChange={(event) => {
                combobox.openDropdown();
                combobox.updateSelectedOptionIndex();
                setSearch(event.currentTarget.value);
              }}
              error={form?.errors?.items}
              onClick={() => combobox.openDropdown()}
              onFocus={() => combobox.openDropdown()}
              onBlur={() => {
                combobox.closeDropdown();
                setSearch(value || '');
              }}
              rightSectionPointerEvents='none'
            />
            <p className='text-xs/normal'>
              To search for a product, enter the article or name
            </p>
          </div>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {options.length > 0 ? (
              options
            ) : (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>

        {form.values.items.length > 0 && (
          <div className='mt-6 flex flex-col gap-6'>
            {form.values.items.map((item, index) => {
              const parsed: Item = JSON.parse(item);

              return (
                <SelectedProduct
                  key={index}
                  form={form}
                  product={parsed}
                  changeItemQuantity={changeItemQuantity}
                  handleRemove={() => removeItem(item)}
                />
              );
            })}
          </div>
        )}
      </Combobox>
    </Card>
  );
}

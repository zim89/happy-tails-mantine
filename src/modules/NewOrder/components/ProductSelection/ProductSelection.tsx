import { Card, Combobox, Divider, InputBase, useCombobox } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

import { CustomBadge } from '@/components/Badge/Badge';
import { NewOrderFields } from '@/shared/hooks/useNewOrderFormModel';
import { useSelectProducts } from '@/shared/hooks/useSelectProducts';
import { Product } from '@/shared/types/types';
import { cn } from '@/shared/lib/utils';

type Props = {
  form: UseFormReturnType<
    NewOrderFields,
    (values: NewOrderFields) => NewOrderFields
  >;
};
export default function ProductSelection({ form }: Props) {
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

  const products = useSelectProducts((res) =>
    res.map((product) => {
      return { ...product, totalQuantity: 1 };
    })
  );

  const shouldFilterOptions = useMemo<boolean>(() => {
    return products.every(
      (item) => item.name.toLocaleLowerCase() !== search.toLowerCase()
    );
  }, [products.length, search]);

  console.log(products);

  const filteredOptions = shouldFilterOptions
    ? products.filter(
        (item) =>
          item.productStatus === 'IN STOCK' &&
          item.name.toLowerCase().includes(search.toLowerCase().trim())
      )
    : products;

  const options = filteredOptions.map((item) => (
    <Combobox.Option
      value={JSON.stringify(item)}
      key={item.name}
      classNames={{ option: 'flex gap-6' }}
    >
      <Image width={64} height={64} src={item.imagePath} alt={item.name} />
      <div>
        <p className='mb-1 font-bold'>{item.name}</p>
        <span>$ {item.price.toFixed(2)}</span>
      </div>
    </Combobox.Option>
  ));

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
    <Card classNames={{ root: 'mt-8' }}>
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
          <div className='mt-6'>
            {form.values.items.map((item) => {
              const parsed: Product = JSON.parse(item);

              return (
                <div
                  key={parsed.id}
                  className='flex items-center gap-6 bg-[#F7F7F7] p-4'
                >
                  <Image
                    src={parsed.imagePath}
                    height={115}
                    width={104}
                    alt={parsed.name}
                  />
                  <div>
                    <div className='text-xs'>
                      <span className='mr-2'>{parsed.article}</span>
                      <CustomBadge
                        palette={{
                          'in stock': '#389B48',
                          'out of stock': '#B4B4B4',
                        }}
                        color={parsed.productStatus.toLowerCase()}
                        name={parsed.productStatus}
                      />
                    </div>
                    <p className='py-1 font-bold'>{parsed.name}</p>
                    {parsed.productStatus === 'IN STOCK' && (
                      <p className='text-sm'>Price: ${parsed.price}</p>
                    )}

                    <div className='mt-3 flex font-bold'>
                      <button
                        disabled={!(parsed.productStatus === 'IN STOCK')}
                        className='border-gray flex w-8 items-center justify-center border-[1px]'
                        onClick={() =>
                          changeItemQuantity('INCREASE', parsed.id)
                        }
                      >
                        <Plus size={16} />
                      </button>
                      <span className='border-gray flex w-8 items-center justify-center border-[1px]'>
                        {parsed.productStatus === 'IN STOCK'
                          ? parsed.totalQuantity
                          : 0}
                      </span>
                      <button
                        disabled={!(parsed.productStatus === 'IN STOCK')}
                        className='border-gray flex w-8 items-center justify-center border-[1px]'
                        onClick={() =>
                          changeItemQuantity('DECREASE', parsed.id)
                        }
                      >
                        <Minus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className='ml-auto flex flex-col items-end justify-between self-stretch'>
                    <button
                      className='text-xs text-[#DC362E]'
                      onClick={() => removeItem(item)}
                    >
                      Remove
                    </button>
                    {parsed.productStatus === 'IN STOCK' && (
                      <span className='whitespace-pre text-xl font-bold'>
                        $ {(parsed.price * parsed.totalQuantity).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Combobox>
    </Card>
  );
}

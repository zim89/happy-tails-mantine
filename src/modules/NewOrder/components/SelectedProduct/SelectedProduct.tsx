'use client';

import { Radio, RadioGroup } from '@mantine/core';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { CustomBadge } from '@/components/Badge';
import { Product, ProductColor, ProductSizeValues } from '@/shared/types/types';
import { UseFormReturnType } from '@mantine/form';
import { NewOrderFields } from '@/shared/hooks/useNewOrderFormModel';

import classes from '../classes.module.css';
import { colorMap } from '../../lib/util';
import { Item } from '../../lib/types';

type Props = {
  product: Product & {
    colors: { value: ProductColor; sizes: ProductSizeValues[] }[];
  };
  changeItemQuantity: (op: 'DECREASE' | 'INCREASE', id: number) => void;
  handleRemove: () => void;
  form: UseFormReturnType<
    NewOrderFields,
    (values: NewOrderFields) => NewOrderFields
  >;
};

const SizeIconFactory = (value: ProductSizeValues) => {
  return () => <span className='block'>{value}</span>;
};

export default function SelectedProduct({
  product,
  form,
  changeItemQuantity,
  handleRemove,
}: Props) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0].value);
  const [selectedSize, setSelectedSize] = useState(product.colors[0].sizes[0]);

  const sizes = useCallback(() => {
    const candidate = product.colors.find(
      (color) => color.value === selectedColor
    );

    if (!candidate) return [];

    return candidate.sizes.filter((size) => size !== 'ONE SIZE');
  }, [selectedColor]);

  useEffect(() => {
    form.setFieldValue('items', (prev) =>
      prev.map((item) => {
        const parsed: Item = JSON.parse(item);

        if (parsed.id === product.id) {
          return JSON.stringify({
            ...parsed,
            pickedAttributes: {
              productId: parsed.colors.find(
                (color) => color.value === selectedColor
              )?.productId,
              size: selectedSize,
            },
          });
        }
        return item;
      })
    );
  }, [selectedColor, selectedSize]);

  return (
    <div className='flex items-center gap-6 bg-primary p-4'>
      <Image
        src={product.imagePath}
        height={115}
        width={104}
        alt={product.name}
      />
      <div>
        <div className='text-xs'>
          <span className='mr-2'>{product.article}</span>
          <CustomBadge
            palette={{
              'in stock': '#389B48',
              'out of stock': '#B4B4B4',
            }}
            color={product.productStatus.toLowerCase()}
            name={product.productStatus}
          />
        </div>
        <p className='py-1 font-bold'>{product.name}</p>
        {product.productStatus === 'IN STOCK' && (
          <p className='text-sm'>Price: ${product.price}</p>
        )}

        <div className='mt-3 flex font-bold'>
          <button
            disabled={!(product.productStatus === 'IN STOCK')}
            className='border-gray flex w-8 items-center justify-center border'
            onClick={() => changeItemQuantity('INCREASE', product.id)}
          >
            <Plus size={16} />
          </button>
          <span className='border-gray flex w-8 items-center justify-center border'>
            {product.productStatus === 'IN STOCK' ? product.totalQuantity : 0}
          </span>
          <button
            disabled={!(product.productStatus === 'IN STOCK')}
            className='border-gray flex w-8 items-center justify-center border'
            onClick={() => changeItemQuantity('DECREASE', product.id)}
          >
            <Minus size={16} />
          </button>
        </div>
        <div className='mb-0 mt-3'>
          <p className='text-sm font-bold'>Color: {selectedColor}</p>
          <RadioGroup
            value={selectedColor}
            onChange={(e) => setSelectedColor(e as ProductColor)}
            classNames={{ root: classes.radiogroup }}
          >
            {product.colors.map((color, index) => (
              <Radio
                key={index}
                value={color.value}
                color={color.value}
                styles={{
                  radio: {
                    backgroundColor:
                      color.value === 'ONE COLOR'
                        ? 'transparent'
                        : colorMap[color.value],
                    border:
                      selectedColor === color.value
                        ? 'solid 2px #161616'
                        : undefined,
                  },
                }}
                classNames={{
                  icon: 'hidden',
                  radio: 'cursor-pointer border-2 border-brand-grey-400',
                }}
              />
            ))}
          </RadioGroup>
        </div>
        <div>
          <p className='text-sm font-bold'>
            Size: {!!sizes().length && selectedSize}
          </p>
          <RadioGroup
            value={selectedSize}
            onChange={(e) => setSelectedSize(e as ProductSizeValues)}
            classNames={{ root: classes.radiogroup }}
          >
            {sizes().map((size, index) => (
              <Radio
                key={index}
                value={size}
                color='transparent'
                icon={SizeIconFactory(size)}
                styles={{
                  inner: {
                    // Used shadows instead of borders to prevent layout shifts
                    boxShadow:
                      selectedSize === size
                        ? '0px 0px 0px 2px #161616'
                        : '0px 0px 0px 1px #EEEEEE',
                    border: 0,
                  },
                }}
                classNames={{
                  radio: 'cursor-pointer border-0 bg-transparent absolute',
                  inner:
                    'flex border justify-center items-center py-3 px-[22px] rounded-[22px]',
                }}
              />
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className='ml-auto flex flex-col items-end justify-between self-stretch'>
        <button className='text-xs text-[#DC362E]' onClick={handleRemove}>
          Remove
        </button>
        {product.productStatus === 'IN STOCK' && (
          <span className='whitespace-pre text-xl font-bold'>
            $ {(product.price * product.totalQuantity).toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
}

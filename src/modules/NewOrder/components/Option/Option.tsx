import { Combobox, NumberFormatter } from '@mantine/core';
import Image from 'next/image';

import { Product, ProductColor, ProductSizeValues } from '@/shared/types/types';

type Props = {
  product: Product & {
    colors: { value: ProductColor; sizes: ProductSizeValues[] }[];
  };
};

export const Option = ({ product }: Props) => {
  return (
    <Combobox.Option
      value={JSON.stringify(product)}
      classNames={{ option: 'flex gap-6' }}
    >
      <Image
        width={64}
        height={64}
        src={product.imagePath || 'https://placehold.co/64x64.png'}
        alt={product.name}
      />
      <div>
        <p className='mb-1 font-bold'>{product.name}</p>
        <span>
          <NumberFormatter
            prefix='$'
            decimalScale={2}
            className='whitespace-nowrap pl-2'
            value={product.price}
          />
        </span>
      </div>
    </Combobox.Option>
  );
};

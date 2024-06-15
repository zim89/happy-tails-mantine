import { Product, ProductColor } from '@/shared/types/types';
import { Combobox } from '@mantine/core';
import Image from 'next/image';

type Props = {
  product: Product & {
    size: string | null;
  };
};

const Option = ({ product }: Props) => {
  return (
    <Combobox.Option
      value={JSON.stringify(product)}
      classNames={{ option: 'flex gap-6' }}
    >
      <Image
        width={64}
        height={64}
        src={product.imagePath}
        alt={product.name}
      />
      <div>
        <p className='mb-1 font-bold'>{product.name}</p>
        <p className='flex items-center gap-2'>
          {product.color && product.color !== ProductColor['ONE COLOR'] && (
            <span
              className='inline-block h-4 w-4 rounded-full'
              style={{ backgroundColor: product.color.toLowerCase() }}
            />
          )}
          {product.size ? (
            <span>
              {product.color
                ? `${product.color} / ${product.size}`
                : product.size}
            </span>
          ) : (
            <span>{product.color}</span>
          )}
        </p>
        <span>$ {product.price.toFixed(2)}</span>
      </div>
    </Combobox.Option>
  );
};

export default Option;

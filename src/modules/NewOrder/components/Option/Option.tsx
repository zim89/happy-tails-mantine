import { Product, ProductColor, ProductSizeValues } from '@/shared/types/types';
import { Combobox } from '@mantine/core';
import Image from 'next/image';

type Props = {
  product: Product & {
    colors: { value: ProductColor; sizes: ProductSizeValues[] }[];
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
        <span>$ {product.price.toFixed(2)}</span>
      </div>
    </Combobox.Option>
  );
};

export default Option;

import { CustomBadge } from '@/components/Badge';
import { Product } from '@/shared/types/types';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';

type Props = {
  product: Product;
  changeItemQuantity: (op: 'DECREASE' | 'INCREASE', id: number) => void;
  handleRemove: () => void;
};

export default function SelectedProduct({
  product,
  changeItemQuantity,
  handleRemove,
}: Props) {
  return (
    <div className='flex items-center gap-6 bg-[#F7F7F7] p-4'>
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
        {product.color && (
          <p className='flex items-center gap-2'>
            <span
              className='inline-block h-4 w-4 rounded-full border border-[#C8C8C8]'
              style={{
                backgroundColor: product.color?.toLowerCase(),
              }}
            />
            <span>{product.color}</span>
          </p>
        )}
        {product.productStatus === 'IN STOCK' && (
          <p className='text-sm'>Price: ${product.price}</p>
        )}

        <div className='mt-3 flex font-bold'>
          <button
            disabled={!(product.productStatus === 'IN STOCK')}
            className='border-gray flex w-8 items-center justify-center border-[1px]'
            onClick={() => changeItemQuantity('INCREASE', product.id)}
          >
            <Plus size={16} />
          </button>
          <span className='border-gray flex w-8 items-center justify-center border-[1px]'>
            {product.productStatus === 'IN STOCK' ? product.totalQuantity : 0}
          </span>
          <button
            disabled={!(product.productStatus === 'IN STOCK')}
            className='border-gray flex w-8 items-center justify-center border-[1px]'
            onClick={() => changeItemQuantity('DECREASE', product.id)}
          >
            <Minus size={16} />
          </button>
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

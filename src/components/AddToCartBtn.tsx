import React from 'react';
import { UnstyledButton } from '@mantine/core';
import { toast } from 'react-toastify';

export default function AddToCartBtn() {
  const onClick = () => {
    toast.success('Add to cart');
  };

  return (
    <UnstyledButton
      onClick={onClick}
      className='w-full rounded-[2px] bg-brand-orange-400 px-4 py-3 text-center text-base font-bold text-primary transition-colors duration-300 hover:bg-brand-orange-500'
    >
      Add to cart
    </UnstyledButton>
  );
}

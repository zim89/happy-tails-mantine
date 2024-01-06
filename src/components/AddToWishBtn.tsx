import React from 'react';
import { UnstyledButton } from '@mantine/core';
import { Heart } from 'lucide-react';
import { toast } from 'react-toastify';

export default function AddToWishBtn() {
  const onClick = () => {
    toast.success('Add to wishlist');
  };

  return (
    <UnstyledButton
      onClick={onClick}
      className='group flex items-center gap-2 px-4 py-3 transition-colors duration-300 hover:text-brand-grey-800'
    >
      <Heart className='h-5 w-5 stroke-2' />
      <span className='text-base font-bold'>Add To Wishlist</span>
    </UnstyledButton>
  );
}

import React from 'react';
import { UnstyledButton } from '@mantine/core';
import { AlignLeft } from 'lucide-react';

export default function BurgerMenu() {
  return (
    <UnstyledButton className='flex items-center justify-center gap-3'>
      <AlignLeft className='h-6 w-6' />
      <p className='hidden md:inline-block md:text-lg '>Menu</p>
    </UnstyledButton>
  );
}

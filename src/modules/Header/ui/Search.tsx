import React from 'react';
import { Search } from 'lucide-react';
import { UnstyledButton } from '@mantine/core';

export default function SearchMenu() {
  return (
    <UnstyledButton
      className='flex items-center justify-center'
      aria-label='Search'
    >
      <Search className='iconBtn' />
    </UnstyledButton>
  );
}

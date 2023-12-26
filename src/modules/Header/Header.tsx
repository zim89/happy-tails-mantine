import * as React from 'react';
import { Container } from '@mantine/core';
import { Heart, ShoppingBag, UserRound } from 'lucide-react';
import Link from 'next/link';

import BurgerMenu from '@/modules/Header/ui/BurgerMenu';
import SearchMenu from '@/modules/Header/ui/Search';
import Logo from '@/modules/Header/ui/Logo';
import Navbar from '@/modules/Header/ui/Navbar';

export default function Header() {
  return (
    <header className='border-b-brand-grey-300 border-b'>
      <Container>
        <div className='flex items-center justify-between py-4'>
          <div className='flex gap-4'>
            <BurgerMenu />
            <span className='md:hidden'>
              <SearchMenu />
            </span>
          </div>

          <Logo />

          <div className='flex items-center gap-4 md:gap-8'>
            <span className='hidden md:block'>
              <SearchMenu />
            </span>
            <Link
              href='/auth'
              className='flex items-center justify-center text-secondary'
            >
              <UserRound className='h-6 w-6' />
            </Link>
            <Link
              href='/favorites'
              className='hidden lg:flex lg:items-center lg:justify-center'
            >
              <Heart className='h-6 w-6' />
            </Link>

            <Link
              href='/cart'
              className='flex items-center justify-center text-secondary'
            >
              <ShoppingBag className='h-6 w-6' />
            </Link>
          </div>
        </div>
      </Container>
      <Navbar />
    </header>
  );
}

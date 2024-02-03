import * as React from 'react';
import { Container } from '@mantine/core';
import { Heart, UserRound } from 'lucide-react';
import Link from 'next/link';

import BurgerMenu from '@/modules/Header/ui/BurgerMenu';
import SearchMenu from '@/modules/Header/ui/Search';
import Logo from '@/modules/Header/ui/Logo';
import Navbar from '@/modules/Header/ui/Navbar';
import { getAllCategories } from '@/shared/api/categoryApi';
import Cart from '@/modules/Cart';

export default async function Header() {
  const { content: categories } = await getAllCategories();

  return (
    <header className='width-before-scroll-bar fixed left-0 right-0 top-0 z-40 border-b border-b-brand-grey-300 bg-primary'>
      <Container>
        <div className='flex h-[73px] items-center justify-between lg:h-[83px]'>
          <div className='flex gap-4'>
            <BurgerMenu categories={categories} />
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
              <UserRound className='iconBtn' />
            </Link>
            <Link
              href='/wishlist'
              className='hidden lg:flex lg:items-center lg:justify-center'
            >
              <Heart className='iconBtn' />
            </Link>

            <Cart />
          </div>
        </div>
      </Container>
      <Navbar categories={categories} />
    </header>
  );
}

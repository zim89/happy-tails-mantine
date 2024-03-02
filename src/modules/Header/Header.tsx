import * as React from 'react';
import Link from 'next/link';
import { Container } from '@mantine/core';
import { UserRound } from 'lucide-react';
import CartButton from '@/modules/CartButton';
import BurgerMenu from './ui/BurgerMenu';
import SearchMenu from './ui/Search';
import Logo from './ui/Logo';
import Navbar from './ui/Navbar';
import { getAllCategories } from '@/shared/api/categoryApi';
import FavoriteButton from '@/modules/Header/ui/FavoriteButton';
import UserMenu from '@/modules/Header/ui/UserMenu';

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
            <UserMenu />
            <FavoriteButton />
            <CartButton />
          </div>
        </div>
      </Container>
      <Navbar categories={categories} />
    </header>
  );
}

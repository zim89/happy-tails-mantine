import * as React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import BurgerMenu from './ui/BurgerMenu';
import SearchMenu from './ui/Search';
import Navbar from './ui/Navbar';
import HeaderTemplate from '@/components/HeaderTemplate';
import { API_URL } from '@/shared/constants/env.const';

const FavoriteButton = dynamic(
  () => import('@/modules/Header/ui/FavoriteButton'),
  { ssr: false }
);

const UserMenu = dynamic(() => import('@/modules/Header/ui/UserMenu'), {
  ssr: false,
});

const CartButton = dynamic(() => import('@/modules/CartButton'), {
  ssr: false,
});

async function fetchCategories() {
  const res = await fetch(API_URL + '/category');
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  const data = await res.json();
  return data.content || [];
}

export default async function Header() {
  const categories = await fetchCategories();

  return (
    <HeaderTemplate>
      {({ Logo }) => (
        <>
          <div className='container'>
            <div className='flex h-[73px] items-center justify-between lg:h-[83px]'>
              <div className='flex gap-4'>
                <BurgerMenu categories={categories} />
                <span className='md:hidden'>
                  <SearchMenu />
                </span>
              </div>

              <Link href='/'>
                <Logo />
              </Link>

              <div className='flex items-center gap-4 md:gap-8'>
                <span className='hidden md:block'>
                  <SearchMenu />
                </span>

                <span className='hidden lg:block'>
                  <UserMenu />
                </span>

                <FavoriteButton />
                <CartButton />
              </div>
            </div>
          </div>
          <Navbar categories={categories} />
        </>
      )}
    </HeaderTemplate>
  );
}

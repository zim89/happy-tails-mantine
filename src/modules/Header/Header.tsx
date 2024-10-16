'use client';

import * as React from 'react';
import { Container } from '@mantine/core';
import Link from 'next/link';

import CartButton from '@/modules/CartButton';
import BurgerMenu from './ui/BurgerMenu';
import SearchMenu from './ui/Search';
import Navbar from './ui/Navbar';
import { useCategoriesQuery } from '@/shared/api/categoryApi';
import FavoriteButton from '@/modules/Header/ui/FavoriteButton';
import UserMenu from '@/modules/Header/ui/UserMenu';
import HeaderTemplate from '@/components/HeaderTemplate';

export default function Header() {
  const { data, isLoading } = useCategoriesQuery({});

  if (!data || isLoading) return null;

  return (
    <HeaderTemplate>
      {({ Logo }) => (
        <>
          <Container>
            <div className='flex h-[73px] items-center justify-between lg:h-[83px]'>
              <div className='flex gap-4'>
                <BurgerMenu categories={data.content} />
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

                <UserMenu />

                <FavoriteButton />
                <CartButton />
              </div>
            </div>
          </Container>
          <Navbar categories={data.content} />
        </>
      )}
    </HeaderTemplate>
  );
}

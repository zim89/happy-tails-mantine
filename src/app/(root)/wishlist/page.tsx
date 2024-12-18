'use client';

// This page is rendering on the client side cause it has two versions: server side and local (storing in localstorage),
// so when you switch to server side or vice verse (simply logout) then it crashes,
// because of the difference of the page in server side and browser

import { Breadcrumbs } from '@mantine/core';
import Link from 'next/link';

import { FavouriteList } from '@/modules/FavouriteList';

export default function Page() {
  return (
    <>
      <div className='container'>
        <Breadcrumbs
          classNames={{
            root: '[--bc-separator-margin:2px] text-xs/normal py-4 mb-4 md:max-lg:mb-3 lg:text-sm/normal',
            separator: 'text-secondary text-xs/normal',
          }}
        >
          <Link href='/'>Home</Link>
          <span className='text-brand-grey-600'>Wishlist</span>
        </Breadcrumbs>

        <h2 className='text-center text-[1.75rem]/normal font-bold md:text-4xl/normal'>
          Your Wishlist Products
        </h2>
      </div>

      <FavouriteList />
    </>
  );
}

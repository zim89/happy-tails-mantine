'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/shared/lib/utils';
import { Category } from '@/shared/types/types';

export default function Navbar({ categories }: { categories: Category[] }) {
  const path = usePathname();

  return (
    <div className='hidden bg-brand-grey-300 lg:block'>
      <div className='container'>
        <ul className='flex justify-between py-2'>
          <li>
            <Link
              href='/products'
              className={cn(
                'relative text-lg after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-0 after:bg-secondary after:transition-all after:duration-500 after:hover:w-full',
                path === '/products' && 'font-bold'
              )}
            >
              All Products
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={'/' + category.name.toLowerCase()}
                className={cn(
                  'relative text-lg after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-0 after:bg-secondary after:transition-all after:duration-500 after:hover:w-full',
                  path === '/' + category.name && 'font-bold'
                )}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

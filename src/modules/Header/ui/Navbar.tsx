'use client';
import React from 'react';
import Link from 'next/link';
import { Container } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { Category } from '@/shared/api/categoryApi';
import { cn } from '@/shared/lib/utils';

export default function Navbar({ categories }: { categories: Category[] }) {
  const path = usePathname();

  console.log();

  return (
    <div className='hidden bg-brand-grey-300 md:block'>
      <Container>
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
                href={'/' + category.path}
                className={cn(
                  'relative text-lg after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-0 after:bg-secondary after:transition-all after:duration-500 after:hover:w-full',
                  path === '/' + category.path && 'font-bold'
                )}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

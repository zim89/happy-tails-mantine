'use client';
import React from 'react';
import { categoryLinks } from '../lib/data';
import Link from 'next/link';
import { Container } from '@mantine/core';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function Navbar() {
  const path = usePathname();

  return (
    <div className='hidden bg-brand-grey-300 lg:block'>
      <Container>
        <ul className='flex justify-between py-2'>
          {categoryLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={clsx(
                  'relative text-lg after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-0 after:bg-secondary after:transition-all after:duration-500 after:hover:w-full',
                  path === link.href && 'font-bold'
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

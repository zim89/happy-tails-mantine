'use client';
import React from 'react';
import { navLinks } from '@/lib/data';
import Link from 'next/link';
import { Container } from '@mantine/core';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function Navbar() {
  const path = usePathname();

  return (
    <div className='bg-brand-grey-300 hidden lg:block'>
      <Container>
        <div className='flex justify-between py-2'>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={clsx(
                'relative text-lg after:absolute after:-bottom-[1px] after:left-0 after:block after:h-[1px] after:w-full after:scale-0 after:bg-secondary after:transition-transform after:duration-300 after:hover:scale-100',
                path === link.href && 'text-red-500'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}

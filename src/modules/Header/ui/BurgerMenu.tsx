'use client';
import React, { useEffect } from 'react';
import { UnstyledButton, Drawer, Image, em } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { AlignLeft, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categoryLinks, menuLinks } from '../lib/data';
import { Category } from '@/shared/api/categoryApi';
import { cn } from '@/lib/utils';

export default function BurgerMenu({ categories }: { categories: Category[] }) {
  const [opened, { open, close, toggle }] = useDisclosure(false);
  const isDesktop = useMediaQuery(`(min-width: ${em(1280)})`);
  const path = usePathname();

  return (
    <>
      <UnstyledButton
        className='group flex items-center justify-center gap-3'
        aria-label='Burger menu'
        onClick={toggle}
      >
        {opened ? <X className='iconBtn' /> : <AlignLeft className='iconBtn' />}
        <p className='hidden md:inline-block md:text-lg'>Menu</p>
      </UnstyledButton>

      <Drawer
        opened={opened}
        onClose={close}
        withCloseButton={false}
        position={isDesktop ? 'top' : 'left'}
        overlayProps={{
          backgroundOpacity: isDesktop ? 0 : 0.5,
          top: isDesktop ? 84 : 0,
        }}
        transitionProps={{
          duration: isDesktop ? 300 : 150,
          timingFunction: 'linear',
        }}
        classNames={{
          body: 'p-0 pb-8 lg:bg-brand-grey-100 lg:px-14 lg:py-8',
          inner:
            'w-[368px] overflow-hidden md:w-[495px] lg:top-[84px] lg:h-[198px] lg:w-full',
        }}
      >
        {/*  Header */}
        <div className='mb-4 flex items-center justify-between border-b border-b-brand-grey-300 bg-brand-grey-100 px-4 py-4 pb-[15px] md:px-9 lg:hidden'>
          <Image
            src='/logo-tablet.svg'
            h={{ base: 42 }}
            w={{ base: 237 }}
            alt='Logo image'
          />
          <UnstyledButton
            onClick={close}
            className='flex items-center justify-center'
          >
            <X className='btnIcon' />
          </UnstyledButton>
        </div>

        <div className='flex flex-col gap-8 pl-4 md:pl-9 lg:flex-row lg:items-center lg:justify-between'>
          {/*  Desktop Menubar */}
          <ul className='hidden lg:flex lg:flex-col lg:gap-6'>
            <li>
              <Link
                href='/contacts'
                onClick={close}
                className={cn('navLink', path === '/contacts' && 'font-bold')}
              >
                Contacts
              </Link>
            </li>
            <li>
              <Link
                href='/delivery&returns'
                onClick={close}
                className={cn(
                  'navLink',
                  path === '/delivery&returns' && 'font-bold'
                )}
              >
                Delivery & Returns
              </Link>
            </li>
            <li>
              <Link
                href='/blog'
                onClick={close}
                className={cn('navLink', path === '/blog' && 'font-bold')}
              >
                Blog
              </Link>
            </li>
          </ul>

          {/*  Navbar */}
          <ul className='lg:flex lg:gap-3'>
            {categories.map((category) => (
              <li
                key={category.id}
                className='border-b border-b-brand-grey-300 lg:border-none'
              >
                <Link
                  href={'/' + category.path}
                  onClick={close}
                  className={cn(
                    'group flex gap-2 py-4 lg:h-[100px] lg:w-[100px] lg:flex-col lg:items-center lg:py-3',
                    path === '/' + category.path && 'font-bold'
                  )}
                >
                  {/* TODO: Add actual image from backend */}
                  <Image
                    src='/icons/products-ico.svg'
                    alt={category.name}
                    h={{ base: 32, lg: 42 }}
                    w='auto'
                    fit='contain'
                  />
                  {/* TODO: Add shorter name on mobile */}
                  <p className='navLink'>{category.name}</p>
                </Link>
              </li>
            ))}
          </ul>

          {/*  Tablet/Mobile Menubar */}
          <ul className='flex flex-col gap-4 lg:hidden'>
            {menuLinks.map((link) => (
              <li key={link.label}>
                <p className='text-base font-light'>{link.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </Drawer>
    </>
  );
}

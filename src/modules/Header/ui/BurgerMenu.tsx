'use client';
import { useEffect } from 'react';
import { UnstyledButton, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AlignLeft, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

import { type Category } from '@/shared/api/categoryApi';
import { useDeviceSize } from '@/shared/lib/hooks';
import { additionalLinks, categoryLinks } from '../lib/data';
import logoImg from '@/assets/logo/logo-tablet.svg';

export default function BurgerMenu({ categories }: { categories: Category[] }) {
  const [opened, { close, toggle }] = useDisclosure(false);
  const { isDesktop } = useDeviceSize();
  const path = usePathname();

  const getCategoryIcon = (cat: string) => {
    const index = categoryLinks.findIndex(
      (item) => item.label.toLowerCase() === cat.toLowerCase()
    );
    return categoryLinks[index].icon;
  };

  useEffect(() => {
    close();
  }, [close, path]);

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
          <Image src={logoImg} alt='Logo image' height={42} width={237} />
          <UnstyledButton
            className='flex items-center justify-center'
            onClick={close}
          >
            <X className='btnIcon' />
          </UnstyledButton>
        </div>

        <div className='flex flex-col gap-8 pl-4 md:pl-9 lg:mx-auto lg:w-[1280px] lg:flex-row lg:items-center lg:justify-between lg:px-14'>
          {/*  Desktop Additional Menubar */}
          <ul className='hidden lg:flex lg:flex-col lg:gap-6'>
            <li>
              <Link
                href={'/contacts'}
                className={cn('navLink', path === '/contacts' && 'font-bold')}
              >
                Contacts
              </Link>
            </li>
            <li>
              <Link
                href={'/delivery&returns'}
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
                href={'/blog'}
                className={cn('navLink', path === '/blog' && 'font-bold')}
              >
                Blog
              </Link>
            </li>
          </ul>

          {/*  Navbar */}
          <ul className='lg:flex lg:gap-3'>
            <li className='border-b border-b-brand-grey-300 lg:border-none'>
              <Link
                href={'/products'}
                className={cn(
                  'group flex gap-2 py-4 lg:h-[100px] lg:w-[100px] lg:flex-col lg:items-center lg:py-3',
                  path === '/products' && 'font-bold'
                )}
              >
                <Image
                  src={getCategoryIcon('All products')}
                  alt='all products page icon'
                  height={isDesktop ? 42 : 32}
                  style={{ width: 'auto' }}
                />
                <p className='navLink'>All products</p>
              </Link>
            </li>
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
                    src={getCategoryIcon(category.name)}
                    alt={category.name}
                    height={isDesktop ? 42 : 32}
                    style={{ width: 'auto' }}
                  />
                  <p className='navLink'>
                    {category.name === 'Leads&harnesses'
                      ? 'Leads'
                      : category.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          {/*  Tablet/Mobile Additional Menubar */}
          <ul className='flex flex-col gap-4 lg:hidden'>
            {additionalLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className='text-base font-light'>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Drawer>
    </>
  );
}

import { Breadcrumbs } from '@mantine/core';
import { cn } from '@/shared/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Happy Tails: Secure Checkout - Get Your Dog's Goodies Fast!",
  description:
    "Securely checkout at Happy Tails & get your dog's favorite supplies delivered quickly! Enjoy fast shipping & hassle-free returns.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn('container', 'pb-[72px] pt-2 md:pt-4 lg:pb-[108px]')}>
      <Breadcrumbs
        classNames={{
          root: '[--bc-separator-margin:2px] text-xs/normal mb-7 md:mb-6 lg:text-sm/normal lg:mb-8',
          separator: 'text-secondary text-xs/normal',
        }}
      >
        <Link href='/'>Home</Link>
        <span className='text-brand-grey-600'>Checkout</span>
      </Breadcrumbs>
      {children}
    </div>
  );
}

'use client';
import { Container, Breadcrumbs } from '@mantine/core';
import Link from 'next/link';

import CheckoutForm from '@/modules/CheckoutForm';
import { useAppSelector } from '@/shared/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { APP_PAGES } from '@/shared/config/pages-url.config';

export default function Page() {
  const hasCartItems = useAppSelector((state) => state.cart.items.length > 0);
  const router = useRouter();

  useEffect(() => {
    if (!hasCartItems) {
      router.push(APP_PAGES.PRODUCTS);
    }
  }, [hasCartItems, router]);

  return (
    <>
      {hasCartItems && (
        <Container>
          <Breadcrumbs
            pt={8}
            classNames={{
              root: '[--bc-separator-margin:2px] text-xs/normal mb-4 md:max-lg:mb-3 lg:text-sm/normal',
              separator: 'text-secondary text-xs/normal',
            }}
          >
            <Link href='/public'>Home</Link>
            <span className='text-brand-grey-600'>Checkout</span>
          </Breadcrumbs>
          <CheckoutForm />
        </Container>
      )}
    </>
  );
}

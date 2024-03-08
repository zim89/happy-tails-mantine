import {
  Container,
  Breadcrumbs,
} from '@mantine/core';
import Link from 'next/link';

import CheckoutForm from "@/modules/CheckoutForm";

export default function Page() {
  return (
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
  );
}

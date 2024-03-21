import { Metadata } from 'next';

import { Container } from '@mantine/core';

export const metadata: Metadata = {
  robots: {
      index: false
  }
}

export default function AdminPage() {
  return (
    <Container>
      <h2 className='my-8 text-2xl font-bold text-red-900'>AuthPage</h2>
    </Container>
  );
}
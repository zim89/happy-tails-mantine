import { Container } from '@mantine/core';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Happy Tails | Auth",
  description: null
}

export default function AuthPage() {
  return (
    <Container>
      <h2 className='my-8 text-2xl font-bold text-red-900'>AuthPage</h2>
    </Container>
  );
}

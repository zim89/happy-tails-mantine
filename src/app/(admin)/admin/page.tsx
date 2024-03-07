import { Container } from '@mantine/core';
import { Metadata } from 'next';

// export const metaData: Metadata = {
//   other: {
//     content: "noindex"
//   }
// }

export default function AdminPage() {
  return (
    <Container>
      <h2 className='my-8 text-2xl font-bold text-red-900'>AuthPage</h2>
    </Container>
  );
}

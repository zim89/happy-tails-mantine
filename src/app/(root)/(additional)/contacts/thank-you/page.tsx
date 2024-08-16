import Image from 'next/image';
import { Button, Container, Group, UnstyledButton } from '@mantine/core';
import Link from 'next/link';

import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

export default function Page() {
  return (
    <Container>
      <Breadcrumbs
        crumbs={[
          { text: 'Home', href: '/' },
          { text: 'Contacts', href: '/contacts' },
          { text: 'Thank You', href: '/thank-you' },
        ]}
        classNames={{ root: 'p-0 pt-4 m-0 mb-6 lg:mb-8' }}
      />
      <Group
        classNames={{
          root: 'flex flex-col items-center py-12 px-6 mb-12 bg-brand-grey-200',
        }}
      >
        <Image
          src='/images/additional/dog-sender.svg'
          width={163}
          height={120}
          alt='Dog is sending your message'
        />
        <hgroup className='my-8 text-center'>
          <h1 className='heading'>Thank you for contacting us!</h1>
          <p>
            We have received your message and will get back to you as soon as
            possible!
          </p>
        </hgroup>

        <UnstyledButton className='w-full rounded-sm bg-secondary px-3 py-[10px] text-center text-sm font-bold text-primary md:w-auto md:text-base'>
          <Link href='/'>Back to homepage</Link>
        </UnstyledButton>
      </Group>
    </Container>
  );
}

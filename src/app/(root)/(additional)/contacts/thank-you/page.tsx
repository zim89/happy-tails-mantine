import Image from 'next/image';
import { Button, Container, Group } from '@mantine/core';

import Breadcrumbs from '@/components/Breadcrumbs';
import sender from '@/assets/images/additional/dog-sender.svg';
import Link from 'next/link';

export default function Page() {
  return (
    <Container>
      <Breadcrumbs
        crumbs={[
          { text: 'Home', href: '/' },
          { text: 'Contacts', href: '/contacts' },
          { text: 'Thank You', href: '/thank-you' },
        ]}

        classNames={{ root: "p-0 pt-4 m-0 mb-6 lg:mb-8" }}
      />
      <Group
        classNames={{
          root: 'flex flex-col items-center py-12 px-6 mb-12 bg-[#F7F7F7]',
        }}
      >
        <Image
          src={sender}
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

        <Button className='w-full bg-black md:w-auto'>
          <Link href='/'>Back to homepage</Link>
        </Button>
      </Group>
    </Container>
  );
}

import { Button, Container } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unauthorized Access',
  robots: {
    index: false,
  },
};

export default function Page() {
  return (
    <Container className='flex flex-col items-center'>
      <hgroup className='pt-16 text-center md:pt-[109px]'>
        <h1 className='mb-4 text-4xl'>Sorry! Access Denied</h1>
        <p className='mb-4'>{`You don’t have access to view this recource`}</p>
      </hgroup>
      <Button className='mb-8 border-[1px] border-brand-grey-400 px-14 py-[10.5px] text-sm text-secondary'>
        <Link href='/'>Go Back</Link>
      </Button>
      <Image
        src='https://i.imgur.com/jVv57QI.png'
        width={550}
        height={230}
        alt=''
      />
    </Container>
  );
}

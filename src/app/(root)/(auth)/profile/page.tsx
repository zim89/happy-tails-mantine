import { Metadata } from 'next';
import { Container } from '@mantine/core';

import SliderMenu from "./ui/SliderMenu";

export const metadata: Metadata = {
  title: 'Happy Tails | Profile Page',
  description: null,
  robots: {
    index: false,
  },
};


export default async function Page() {
  return (
    <>
      <SliderMenu />
      <Container className='mt-12 lg:mt-0'>
        <h1>Profile</h1>
      </Container>
    </>
  );
}

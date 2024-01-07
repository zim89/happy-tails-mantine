import React from 'react';
import { Container } from '@mantine/core';
import Image from 'next/image';
import dogImg from '@/assets/images/additional/dog.png';

export default function UnderConstruction() {
  return (
    <section className='section'>
      <Container>
        <div className='relative'>
          <Image
            src={dogImg}
            alt='Site under construction'
            priority={true}
            className='mx-auto mb-4 h-auto w-[248px] object-contain md:mb-6 md:w-[348px] lg:mb-0 lg:ml-0 lg:mr-auto lg:w-[496px]'
          />
          <div className='lg:absolute lg:right-0 lg:top-[146px]'>
            <p className='text-right text-[36px] font-bold leading-none md:text-[60px] lg:text-[80px]'>
              Website is
            </p>
            <p className='text-right text-[40px] font-bold leading-none text-brand-orange-400 md:text-[68px] lg:text-[88px]'>
              under construction
            </p>

            <p className='mt-5 w-full font-light md:ml-auto md:w-[373px]'>
              Thank you for visiting this page and showing interest in our
              project. We are thrilled about what&apos;s to come, and we
              can&apos;t wait to share our progress with you!
              <br />
              <span className='font-normal text-brand-orange-400'>
                Please check back soon.
              </span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

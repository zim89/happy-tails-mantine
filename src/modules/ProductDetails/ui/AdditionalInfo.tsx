import React from 'react';
import { Container, Image } from '@mantine/core';
import NextImage from 'next/image';
import { additionalList } from '@/modules/ProductDetails/lib/data';

export default function AdditionalInfo() {
  return (
    <section className='section pb-0'>
      <div className='bg-brand-grey-200 py-8'>
        <Container>
          <h2 className='mb-9 text-center text-[28px] font-bold leading-normal'>
            Why Shop With Us?
          </h2>

          <ul className='flex flex-col gap-5 md:mx-auto md:w-[454px] md:gap-8 lg:mx-0 lg:w-full lg:flex-row lg:gap-[42px]'>
            {additionalList.map((item) => (
              <li key={item.title} className='p-4 lg:px-3'>
                <Image
                  component={NextImage}
                  src={item.icon}
                  alt={item.title}
                  w={64}
                  h={64}
                  className='mx-auto'
                />
                <h3 className='mt-3 text-center text-2xl font-bold leading-[1.2]'>
                  {item.title}
                </h3>
                <p className='mt-2 text-center text-base'>{item.desc}</p>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}

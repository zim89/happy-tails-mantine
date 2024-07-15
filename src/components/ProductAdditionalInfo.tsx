import React from 'react';
import Image from 'next/image';
import { Container } from '@mantine/core';
import { additionalList } from '@/modules/ProductDetails/lib/data';

export default function ProductAdditionalInfo() {
  return (
    <section>
      <div className='bg-brand-grey-200 py-8'>
        <Container>
          <h2 className='mb-9 text-center text-[1.75rem]/[normal] font-bold'>
            Why Shop With Us?
          </h2>

          <ul className='flex flex-col gap-5 md:mx-auto md:w-[454px] md:gap-8 lg:mx-0 lg:w-full lg:flex-row lg:gap-[42px]'>
            {additionalList.map((item) => (
              <li key={item.title} className='p-4 lg:px-3'>
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={64}
                  height={64}
                  className='mx-auto max-w-full'
                />
                <h3 className='mt-3 text-center text-2xl/[1.2] font-bold'>
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

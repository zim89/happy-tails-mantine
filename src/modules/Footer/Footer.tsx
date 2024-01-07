import React from 'react';
import { Anchor, Container } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

import FooterNav from '@/modules/Footer/ui/FooterNav';
import logoImg from '@/assets/logo/logo-footer.svg';

export default function Footer() {
  return (
    <footer className='bg-secondary py-6 text-primary md:py-9'>
      <Container>
        <div className='flex flex-col gap-6 md:flex-row md:items-start md:justify-between'>
          <Link href='/'>
            <Image
              src={logoImg}
              alt='Happy tails logo'
              style={{ width: 'auto', height: 'auto' }}
              className='h-[33.6px] w-[189.6px] lg:h-12 lg:w-[228.91px]'
            />
          </Link>
          <div className='flex flex-col gap-2 md:w-[324px] lg:w-[466px]'>
            <h2 className='font-bold uppercase md:text-xl md:leading-normal'>
              Contact us
            </h2>
            <p className='text-xs leading-normal lg:text-base'>
              We value your queries and feedback. If you have any further
              questions or need assistance, please feel free to reach out to us.
              Don&apos;t hesitate to get in touch with us, we&apos;ll be glad to
              assist you!
            </p>
            <Anchor
              href='mailto:onlinestore.teamch2023@gmail.com'
              underline='never'
              className='text-xs leading-normal text-primary lg:text-base'
            >
              onlinestore.teamch2023@gmail.com
            </Anchor>
          </div>
        </div>

        <FooterNav />

        <div className='flex items-baseline justify-between'>
          <p className='flex gap-3 text-xs leading-normal md:text-base'>
            <span>© 2023</span>
            <span>Happy Tails</span>
          </p>
          <p className='text-xs font-bold leading-normal md:text-xl md:leading-normal'>
            Website by <span className='underline'>Team</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}

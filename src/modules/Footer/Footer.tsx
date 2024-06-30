import React from 'react';
import { Container } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

import FooterNav from './ui/FooterNav';
import SocialLinks from './ui/SocialLinks';
import logoImg from '@/assets/logo/logo-footer.svg';
import { formatYearFromDate } from '@/shared/lib/helpers';

export default function Footer(): React.JSX.Element {
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
            <a
              href='mailto:onlinestore.teamch2023@gmail.com'
              className='relative self-start text-xs leading-normal text-primary after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all after:duration-500 after:hover:w-full lg:text-base'
            >
              onlinestore.teamch2023@gmail.com
            </a>

            <SocialLinks />
          </div>
        </div>

        <FooterNav />

        <div className='md:flex md:justify-between'>
          <div className='flex justify-between md:w-3/5'>
            <p className='flex gap-3 text-xs leading-normal md:text-base'>
              <span>© {formatYearFromDate(Date.now())}</span>
              <span>Happy Tails</span>
            </p>
            <Link
              className='ml-auto text-xs leading-normal md:text-base'
              href='/privacy&cookies'
            >
              Privacy & Cookies Policy
            </Link>
          </div>
          <div className='mt-6 block text-center md:mt-0'>
            <Link
              href={'/about-us'}
              className='relative text-xs font-bold leading-normal after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all after:duration-500 after:hover:w-full after:group-hover:w-full md:text-xl md:leading-normal'
            >
              Website by Team
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

import React from 'react';
import { Anchor, Container } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

import FooterNav from '@/modules/Footer/ui/FooterNav';
import logoImg from '@/assets/logo/logo-footer.svg';
import tiktokSvg from '@/assets/icons/brand/tiktok.svg';
import { footerSocialLinks } from '@/modules/Footer/lib/data';

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

            <ul className={'lg-mt-4 mt-4 flex gap-4 md:mt-3'}>
              {footerSocialLinks.map((link) => (
                <li key={link.label} className={'group'}>
                  <a
                    href={link.href}
                    target='_blank'
                    className={'text-primary'}
                  >
                    {link.icon ? (
                      link.icon
                    ) : (
                      <Image
                        src={tiktokSvg}
                        alt={link.label}
                        width={24}
                        height={24}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <FooterNav />

        <div className='flex items-baseline justify-between'>
          <p className='flex gap-3 text-xs leading-normal md:text-base'>
            <span>© 2023</span>
            <span>Happy Tails</span>
          </p>
          <a
            href={'#Team'}
            className={
              'relative text-xs font-bold leading-normal after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all after:duration-500 after:hover:w-full after:group-hover:w-full md:text-xl md:leading-normal'
            }
          >
            Website by Team
          </a>
        </div>
      </Container>
    </footer>
  );
}

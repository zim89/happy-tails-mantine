import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function SocialLinks(): React.JSX.Element {
  return (
    <ul className={'mt-4 flex gap-4 md:mt-3 lg:mt-4'}>
      <li>
        <Link
          href={'https://www.facebook.com/'}
          target='_blank'
          rel='noreferrer noopener'
          className={
            'text-primary transition-colors duration-300 hover:text-brand-orange-400'
          }
          aria-label='Happy Tails on Facebook'
        >
          <Facebook className='h-6 w-6' />
        </Link>
      </li>
      <li>
        <Link
          href={'https://www.youtube.com/'}
          target='_blank'
          rel='noreferrer noopener'
          className={
            'text-primary transition-colors duration-300 hover:text-brand-orange-400'
          }
          aria-label='Happy Tails YouTube Channel'
        >
          <Youtube className='h-6 w-6' />
        </Link>
      </li>
      <li>
        <Link
          href={'https://www.tiktok.com/'}
          target='_blank'
          rel='noreferrer noopener'
          className={'group'}
          aria-label='Happy Tails TikTok Account'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={
              'stroke-primary transition-colors duration-300 group-hover:stroke-brand-orange-400'
            }
          >
            <path
              d='M21.9949 6.44332H20.8841C19.7057 6.44332 18.5755 5.97519 17.7422 5.1419C16.9089 4.30862 16.4408 3.17844 16.4408 2H11.9975V14.7745C11.9975 15.2479 11.8765 15.7134 11.6459 16.1269C11.4154 16.5403 11.0831 16.888 10.6804 17.1369C10.2777 17.3857 9.81811 17.5275 9.34522 17.5488C8.87233 17.5701 8.40184 17.4701 7.97845 17.2584C7.55505 17.0467 7.1928 16.7303 6.92608 16.3392C6.65937 15.9482 6.49705 15.4954 6.45454 15.0239C6.41203 14.5525 6.49074 14.078 6.68319 13.6455C6.87564 13.213 7.17545 12.8369 7.55415 12.5529V7.7541C6.23402 8.0672 5.02881 8.7459 4.07667 9.71244C3.12452 10.679 2.46396 11.8942 2.17069 13.2189C1.87743 14.5436 1.96333 15.9241 2.41854 17.2022C2.87375 18.4803 3.67987 19.6043 4.74448 20.4453C5.8091 21.2864 7.08914 21.8104 8.4379 21.9575C9.78666 22.1045 11.1496 21.8685 12.3704 21.2766C13.5912 20.6847 14.6206 19.7609 15.3405 18.6109C16.0604 17.4609 16.4417 16.1313 16.4408 14.7745V9.68694C17.7908 10.4701 19.3233 10.8839 20.8841 10.8866H21.9949V6.44332Z'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </Link>
      </li>
      <li>
        <Link
          href={'https://www.instagram.com/'}
          target='_blank'
          rel='noreferrer noopener'
          className={
            'text-primary transition-colors duration-300 hover:text-brand-orange-400'
          }
          aria-label='Happy Tails Instagram Page'
        >
          <Instagram className='h-6 w-6' />
        </Link>
      </li>
    </ul>
  );
}

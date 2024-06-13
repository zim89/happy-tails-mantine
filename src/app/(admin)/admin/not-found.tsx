import { Metadata } from 'next';

import illustration from '@/assets/images/404_admin.png';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Not Found | 404',
  robots: {
    index: false,
  },
};

export default function NotFound() {
  return (
    <div className='mt-10 flex justify-center md:mt-24'>
      <div className='flex items-center gap-16'>
        <Image src={illustration} alt='404' />
        <div className='max-w-[382px]'>
          <h2 className='text-4xl/[44px]'>Ooops...! Page not found</h2>
          <p className='my-4'>
            The page you are looking for doesn’t exist or an other error
            occurred.
          </p>
          <Link
            className='rounded-sm bg-black px-14 py-[10px] text-white'
            href='/admin'
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';

export default function Featured() {
  return (
    <section className='pt-16 md:pt-[88px] lg:pt-[104px]'>
      <div className='container space-y-6 md:space-y-0'>
        <div className='flex-row-reverse md:flex'>
          <Image
            src='/images/featured/dog-1.png'
            height={2376}
            width={1900}
            alt='A dog wearing clothes'
            className='mb-4 h-[314px] object-cover md:mb-0 md:h-[310px] md:max-w-[348px] lg:h-[520px] lg:max-w-[584px]'
          />
          <div className='flex-col items-start justify-center md:flex md:px-4 lg:px-20'>
            <p className='mb-4 text-lg text-brand-orange-400'>New Arrived</p>
            <h3 className='mb-4 text-2xl uppercase'>
              Clothing for dog: STAY STYLISH
            </h3>
            <Link
              href='/clothing'
              className='btn btn-primary w-full md:max-w-[232px]'
            >
              View Products
            </Link>
          </div>
        </div>
        <div className='md:flex'>
          <Image
            src='/images/featured/dog-2.png'
            height={2554}
            width={3826}
            alt='Old man with a dog on a leash'
            className='mb-4 h-[314px] object-cover md:mb-0 md:h-[310px] md:max-w-[348px] lg:h-[520px] lg:max-w-[584px]'
          />
          <div className='flex-col items-start justify-center md:flex md:px-4 lg:px-20'>
            <p className='mb-4 text-lg text-brand-orange-400'>
              For Active Walks
            </p>
            <h3 className='mb-4 text-2xl uppercase'>Leads Collection</h3>
            <Link
              href='/leads'
              className='btn btn-primary w-full md:max-w-[232px]'
            >
              View Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

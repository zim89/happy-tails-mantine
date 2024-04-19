import Image from 'next/image';

import nounDelivery1 from '@/assets/icons/additional/noun-delivery.svg';
import nounDelivery2 from '@/assets/icons/additional/noun-delivery-2.svg';
import nounDelivery3 from '@/assets/icons/additional/noun-delivery-3.svg';

export default function WhyUs() {
  return (
    <section className='pt-16 md:pt-[88px] lg:pt-[104px]'>
      <div className='bg-brand-grey-200 py-8'>
        <h2 className='mb-6 text-center text-[1.75rem] font-bold md:mb-9 lg:text-4xl'>
          Why Shop With Us?
        </h2>
        <ul className='mx-auto justify-between gap-10 space-y-5 lg:flex lg:max-w-screen-lg lg:space-y-0 lg:px-10'>
          <li className='mx-auto max-w-[454px] px-3 py-4'>
            <Image
              src={nounDelivery1}
              alt='orange truck flat icon'
              className='mx-auto mb-3'
            />
            <h3 className='text-center text-2xl font-bold'>
              Free Standard Delivery
            </h3>
            <p className='text-center'>
              Orders over £75 qualify for free UK delivery. Orders under £75
              will be calculated at the checkout.
            </p>
          </li>
          <li className='mx-auto max-w-[454px] px-3 py-4'>
            <Image
              src={nounDelivery2}
              alt='orange cart flat icon'
              className='mx-auto mb-3'
            />
            <h3 className='text-center text-2xl font-bold'>
              Wide Range of Products
            </h3>
            <p className='text-center'>
              Find exactly what you&apos;re looking for with ease from a wide
              range of products spanning various categories
            </p>
          </li>
          <li className='mx-auto max-w-[454px] px-3 py-4'>
            <Image
              src={nounDelivery3}
              alt='orange label flat icon'
              className='mx-auto mb-3'
            />
            <h3 className='text-center text-2xl font-bold'>Special Offers</h3>
            <p className='text-center'>
              Uncover the magic of unbeatable discounts and special promotions
              awaiting you at our online store.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}

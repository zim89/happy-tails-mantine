import { Container } from '@mantine/core';
import Image from 'next/image';

import { teams } from './lib/data';

export default function Introduction() {
  return (
    <>
      <div className='max-w-screen flex justify-between gap-2 lg:gap-7'>
        <div className='relative min-h-[110px] min-w-[170px] flex-1 md:min-h-[115px] md:min-w-[186px] lg:min-h-[180px] lg:min-w-[290px]'>
          <Image
            className='object-cover'
            src={teams[0].src}
            layout='fill'
            sizes='100%'
            alt={teams[0].alt}
          />
        </div>
        <div className='relative min-h-[110px] min-w-[170px] flex-1 md:min-h-[115px] md:min-w-[186px] lg:min-h-[170px] lg:min-w-[265px]'>
          <Image
            className='object-cover'
            src={teams[1].src}
            layout='fill'
            sizes='100%'
            alt={teams[1].alt}
          />
        </div>
        <div className='relative hidden flex-1 md:block md:min-h-[110px] md:min-w-[186px] lg:min-h-[170px] lg:min-w-[265px]'>
          <Image
            className='object-cover'
            src={teams[2].src}
            layout='fill'
            sizes='100%'
            alt={teams[2].alt}
          />
        </div>
        <div className='relative hidden flex-1 md:min-h-[115px] md:min-w-[186px] lg:block lg:min-h-[170px] lg:min-w-[265px]'>
          <Image
            className='object-cover'
            src={teams[3].src}
            layout='fill'
            sizes='100%'
            alt={teams[3].alt}
          />
        </div>
      </div>

      <div className='mt-12 bg-brand-orange-400 px-5 py-8 text-white md:px-9 md:py-12 lg:p-14'>
        <div className='container mx-0 flex flex-col justify-between gap-6 !px-0 md:flex-row md:items-center lg:!pl-[100px]'>
          <h2 className='text-xl leading-8 md:max-w-[253px] md:text-[28px]'>
            Who are we and what do we do?
          </h2>
          <p className='font-light md:max-w-[340px] lg:max-w-[470px]'>
            {`We are a dynamic team, committed to pushing boundaries in the realm
            of IT. From web development and design to meticulous testing, we
            bring a diverse range of talents and expertise to the table. Our
            collaborative spirit and passion for innovation drive us to create
            exceptional digital solutions tailored to our clients' needs.`}
          </p>
        </div>
      </div>
      <div className='container lg:pl-[156px]'>
        <div className='mb-32 mt-[40px] md:my-12 md:mb-[136px] md:flex md:flex-row md:justify-between'>
          <hgroup className=' lg:py-[45px]'>
            <h2 className='mb-4 text-xl leading-8 md:max-w-[253px] md:text-[28px]'>
              What is our goal?
            </h2>
            <p className='font-light md:max-w-[340px] lg:max-w-[470px]'>
              {`Our goal is simple yet ambitious: to deliver unparalleled results that 
                exceed expectations. We strive to transform ideas into reality, leveraging 
                cutting-edge technologies and creative insights to craft immersive digital 
                experiences. With every project, we aim to leave a lasting impact, inspiring 
                others in the digital landscape.`}
            </p>
          </hgroup>
          <div className='relative w-full md:max-w-[256px] lg:max-w-[386px]'>
            <Image
              className='hidden object-contain md:block'
              src={teams[0].src}
              layout='fill'
              sizes='100%'
              alt=''
            />
          </div>
        </div>
      </div>
    </>
  );
}

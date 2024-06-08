import { Container } from '@mantine/core';
import Image from 'next/image';

import team1 from '@/assets/images/additional/about-us/team1.jpeg';
import team2 from '@/assets/images/additional/about-us/team2.jpeg';
import team3 from '@/assets/images/additional/about-us/team3.jpeg';
import team4 from '@/assets/images/additional/about-us/team4.jpeg';

export default function Introduction() {
  return (
    <>
      <div className='max-w-screen flex justify-between gap-2 lg:gap-7'>
        <div className='relative min-h-[125px] min-w-[200px] flex-1 md:h-[115px] md:w-[186px] lg:min-h-[180px] lg:min-w-[300px]'>
          <Image
            className='object-cover'
            src={team1.src}
            layout='fill'
            sizes='100%'
            alt=''
          />
        </div>
        <div className='relative min-h-[125px] min-w-[200px] flex-1 md:min-h-[115px] md:min-w-[186px] lg:min-h-[180px] lg:min-w-[300px]'>
          <Image
            className='object-cover'
            src={team2.src}
            layout='fill'
            sizes='100%'
            alt=''
          />
        </div>
        <div className='relative hidden flex-1 md:block md:min-h-[115px] md:min-w-[186px] lg:min-h-[180px] lg:min-w-[300px]'>
          <Image
            className='object-cover'
            src={team3.src}
            layout='fill'
            sizes='100%'
            alt=''
          />
        </div>
        <div className='relative hidden flex-1 md:block md:min-h-[115px] md:min-w-[186px] lg:min-h-[180px] lg:min-w-[300px]'>
          <Image
            className='object-cover'
            src={team4.src}
            layout='fill'
            sizes='100%'
            alt=''
          />
        </div>
      </div>

      <div className='mt-12 bg-[#F39324] px-5 py-8 text-white md:px-9 md:py-12 lg:p-14'>
        <Container
          classNames={{
            root: 'flex flex-col gap-6 md:flex-row justify-between md:items-center',
          }}
        >
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
        </Container>
      </div>
      <Container>
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
              src={team1.src}
              layout='fill'
              sizes='100%'
              alt=''
            />
          </div>
        </div>
      </Container>
    </>
  );
}

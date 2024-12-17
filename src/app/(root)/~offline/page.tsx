import Image from 'next/image';

export default function OfflinePage() {
  return (
    <div className='container flex flex-col items-center pb-20 lg:pb-40'>
      <div className='relative size-[256px] md:size-[325px] lg:size-[512px]'>
        <Image
          src='/images/no-signal.png'
          objectFit='cover'
          fill
          alt='No signal'
        />
      </div>
      <h2 className='text-center text-xl font-medium md:text-3xl lg:text-5xl'>
        {`You're currently offline. Please check your internet connection and try
        again.`}
      </h2>
    </div>
  );
}

export default function BlogSkeleton() {
  return (
    <>
      <div className='h-[400px] animate-pulse bg-gray-300 md:h-[320px] lg:h-[400px]' />

      <ul className='my-6 grid animate-pulse grid-cols-1 gap-4 md:my-8 md:grid-cols-2 md:gap-y-8 lg:my-10 lg:gap-x-6 lg:gap-y-10'>
        {Array.from({ length: 6 }).map((_, index) => (
          <li key={index}>
            <div className='p-4 lg:p-6'>
              <div className='mb-4 h-[184px] w-[347px] bg-gray-300 md:w-[308px] lg:h-[246px] lg:w-[523px]' />

              <div className='mb-2 h-6 w-1/3 rounded-full bg-gray-300' />
              <div className='flex h-12 flex-col gap-1'>
                <div className='h-[22px] rounded-full bg-gray-300' />
                <div className='h-[22px] rounded-full bg-gray-300' />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

import React from 'react';

function PopularPosts() {
  return (
    <div className='space-y-6 lg:space-y-8'>
      <h2 className='border-b border-b-brand-grey-600 py-2 text-[28px]/normal font-bold capitalize'>
        Most Popular
      </h2>

      <ul className='grid grid-cols-1 gap-6 lg:gap-8'>
        <li className='group flex cursor-pointer gap-4'>
          <div className='h-[120px] w-[120px] flex-none bg-brand-grey-700'></div>
          <div className='flex items-center'>
            <div className='flex flex-col gap-2'>
              <h3 className='text-lg/[1.3] text-secondary transition-colors duration-300 group-hover:text-brand-orange-400'>
                Material Matters: Selecting the Right Fabrics for Your
                Dog&apos;s Comfort
              </h3>
              <p className='text-base font-light'>December 6, 2023</p>
            </div>
          </div>
        </li>
        <li className='group flex cursor-pointer gap-4'>
          <div className='h-[120px] w-[120px] flex-none bg-brand-grey-700'></div>
          <div className='flex items-center'>
            <div className='flex flex-col gap-2'>
              <h3 className='text-lg/[1.3] text-secondary transition-colors duration-300 group-hover:text-brand-orange-400'>
                Material Matters: Selecting the Right Fabrics for Your
                Dog&apos;s Comfort
              </h3>
              <p className='text-base font-light'>December 6, 2023</p>
            </div>
          </div>
        </li>
        <li className='group flex cursor-pointer gap-4'>
          <div className='h-[120px] w-[120px] flex-none bg-brand-grey-700'></div>
          <div className='flex items-center'>
            <div className='flex flex-col gap-2'>
              <h3 className='text-lg/[1.3] text-secondary transition-colors duration-300 group-hover:text-brand-orange-400'>
                Material Matters: Selecting the Right Fabrics for Your
                Dog&apos;s Comfort
              </h3>
              <p className='text-base font-light'>December 6, 2023</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default PopularPosts;

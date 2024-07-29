import Image from 'next/image';

const ConfirmationSkeleton = () => {
  return (
    <>
      <h1
        className='mx-auto h-[34px] w-[382px] animate-pulse rounded-full
      bg-gray-100 md:w-[382px] lg:h-[43px] lg:w-[541px]'
      />

      <div className='grid grid-cols-1 gap-9 text-lg/[21.6px] lg:grid-cols-2 lg:gap-6'>
        <div className='space-y-4'>
          <div className='space-y-3'>
            <h3 className='flex flex-col items-center text-xl/6 md:flex-row md:gap-2'>
              <span className='font-bold'>Order Number:</span>
              <span className='h-6 w-1/2 animate-pulse rounded-full bg-gray-100' />
            </h3>
            <div className='space-y-0.5'>
              <p className='h-5 w-1/2 animate-pulse rounded-full bg-gray-100' />
              <p className='h-5 w-1/2 animate-pulse rounded-full bg-gray-100' />
              <p className='h-5 w-1/2 animate-pulse rounded-full bg-gray-100' />
            </div>
          </div>
          <div className='space-y-2 rounded-sm border border-brand-grey-400 p-4'>
            <div className='flex items-center gap-2'>
              <Image
                alt='Truck icon'
                src='/icons/checkout/truck.svg'
                width={24}
                height={24}
              />
              <div className='h-px w-6 bg-brand-grey-800' />
              <Image
                alt='Package check icon'
                src='/icons/checkout/package-check.svg'
                width={24}
                height={24}
              />
            </div>
            <p className='text-lg/[1.35rem]'>You order will be delivered on:</p>
            <p className='h-6 w-1/2 animate-pulse rounded-full bg-gray-100' />
            <p className='h-[22px] w-1/2 animate-pulse rounded-full bg-gray-100' />
          </div>
          <div className='space-y-2'>
            <h3 className='pb-1 text-xl/6 font-bold'>Delivery Option</h3>
            <p className='h-[22px] w-1/2 animate-pulse rounded-full bg-gray-100' />
            <p className='h-[22px] w-1/2 animate-pulse rounded-full bg-gray-100' />
            <p className='h-[22px] w-1/2 animate-pulse rounded-full bg-gray-100' />
          </div>
          <div className='space-y-2'>
            <h3 className='pb-1 text-xl/6 font-bold'>Billing details</h3>
            <p className='h-[22px] w-1/2 animate-pulse rounded-full bg-gray-100' />
            <p className='h-[22px] w-1/2 animate-pulse rounded-full bg-gray-100' />
            <p className='h-[22px] w-1/2 animate-pulse rounded-full bg-gray-100' />
          </div>
          <div className='space-y-2'>
            <h3 className='pb-1 text-xl/6 font-bold'>Payment Method</h3>
            <p className='h-[22px] w-1/2 animate-pulse rounded-full bg-gray-100' />
          </div>
        </div>
        <div className='space-y-6 bg-brand-grey-200 p-6'>
          <h2 className='text-[1.75rem]/[2.1rem] font-bold'>Order details</h2>
          <ul className='flex flex-col gap-6'>
            {Array.from({ length: 3 }).map((_, index) => {
              return (
                <li
                  key={index}
                  className='flex items-center gap-6 border-b border-brand-grey-400 pb-3'
                >
                  <div className='relative h-[72px] w-[72px] flex-none self-start rounded-0.5 border border-brand-grey-400 bg-primary p-1'>
                    <div className='size-16 animate-pulse bg-gray-200' />
                    <span className='absolute -right-3 -top-3 flex size-6 animate-pulse items-center justify-center rounded-full bg-brand-grey-900' />
                  </div>

                  <div className='flex grow items-center justify-between'>
                    <div className='flex-1 space-y-1'>
                      <p className='h-[18px] w-1/3 animate-pulse rounded-full bg-gray-200' />
                      <p className='h-6 w-1/2 animate-pulse rounded-full bg-gray-200' />
                      <p className='h-[18px] w-1/3 animate-pulse rounded-full bg-gray-200' />
                    </div>
                    <p className='h-6 w-1/6 animate-pulse rounded-full bg-gray-200' />
                  </div>
                </li>
              );
            })}
          </ul>
          <div className='space-y-2 border-b border-b-gray-400 pb-3'>
            <p className='flex items-baseline justify-between text-base'>
              <span>Subtotal:</span>
              <span className='h-6 w-1/6 animate-pulse rounded-full bg-gray-200' />
            </p>
            <p className='flex items-baseline justify-between text-base'>
              <span>Discount:</span>
              <span className='h-6 w-1/6 animate-pulse rounded-full bg-gray-200' />
            </p>
            <p className='flex items-baseline justify-between text-base'>
              <span>Tax:</span>
              <span className='h-6 w-1/6 animate-pulse rounded-full bg-gray-200' />
            </p>
            <p className='flex items-baseline justify-between text-base'>
              <span>Shipping:</span>
              <span className='h-6 w-1/6 animate-pulse rounded-full bg-gray-200' />
            </p>
          </div>
          <p className='flex items-baseline justify-between text-xl/6 font-bold uppercase'>
            <span>TOTAL</span>
            <span className='h-6 w-1/6 animate-pulse rounded-full bg-gray-200' />
          </p>
        </div>
      </div>
    </>
  );
};

export default ConfirmationSkeleton;

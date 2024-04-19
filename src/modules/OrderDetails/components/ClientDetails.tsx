import { Banknote, Package } from 'lucide-react';

export const ClientDetails = () => {
  return (
    <div className='rounded-[4px] border-[1px] border-[#EEE] bg-white'>
      <div className='flex items-center justify-between'>
        <h2 className='p-4 pb-[22px] text-xl font-bold'>Client details</h2>
        <p>Customer since ...</p>
      </div>
      <div className='grid grid-cols-[min-content_1fr] grid-rows-3 border-y-[1px] border-[#EEE]'>
        <p className='flex items-center gap-2 border-r-[1px] border-[#EEE] p-3 text-sm font-bold uppercase text-[#787878]'>
          <Banknote width={16} />
          <span>Name</span>
        </p>
        <p className='flex items-center text-ellipsis px-4 text-sm'>
          Anna Bill
        </p>
        <p className='flex items-center gap-2 border-y-[1px] border-r-[1px] border-[#EEE] p-3 text-sm font-bold uppercase text-[#787878]'>
          <Banknote width={16} />
          <span>Email</span>
        </p>
        <p className='border-[#EEE} flex items-center border-y-[1px] px-4 text-sm'>
          anna.bill@gmail.com
        </p>
        <p className='flex items-center gap-2 border-r-[1px] border-[#EEE] p-3 text-sm font-bold uppercase text-[#787878]'>
          <Package width={16} />
          <span>Phone</span>
        </p>
        <p className='flex items-center px-4 text-sm'>+44892147896</p>
      </div>
    </div>
  );
};

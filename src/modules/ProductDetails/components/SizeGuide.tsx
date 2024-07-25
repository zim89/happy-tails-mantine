'use client';

import { Drawer } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { SizingTable } from '../ui/SizingTable';

export type Props = {
  opened: boolean;
  onClose: () => void;
  onToggle: () => void;
};

export function SizeGuide({ opened, onClose }: Props) {
  const { replace } = useRouter();

  return (
    <Drawer
      position='right'
      opened={opened}
      onClose={() => {
        // Remove an URL fragment
        replace('');
        onClose();
      }}
      title={'Size Guide'}
      classNames={{
        content: 'max-w-[627px] ml-auto px-9',
        inner: 'block',
        title: 'heading font-bold',
        close: 'text-black h-9 w-9 flex justify-end',
        header: 'border-b border-brand-grey-600 px-0 pt-6 pb-8',
        body: 'px-0',
      }}
    >
      <div className='my-8 flex items-center bg-brand-grey-200 py-4'>
        <div className='pl-2 pr-8 md:pl-4 md:pr-12'>
          <Image
            src='https://i.imgur.com/LfjvtEo.png'
            width={160}
            height={130}
            alt='Size schema'
          />
        </div>
        <div className='flex-1 pr-4 md:pr-12'>
          <hgroup>
            <h3 className='py-4 text-center text-sm font-bold'>
              {'"A" Body length (cm)'}
            </h3>
            <p className='text-xs'>
              Make sure that your dog is standing straight. Measure the body
              length from the neck to the tail. If the body length is between
              the sizes it is better to choose bigger one.
            </p>
          </hgroup>
          <hgroup>
            <h3 className='py-4 text-center text-sm font-bold'>
              {'Chest volume "B"'}
            </h3>
            <p className='text-xs'>
              Make sure that your dog is standing straight. Measure the body
              length from the neck to the tail. If the body length is between
              the sizes it is better to choose bigger one.
            </p>
          </hgroup>
        </div>
      </div>
      <SizingTable />
    </Drawer>
  );
}

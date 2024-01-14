'use client';

import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Plus, X } from 'lucide-react';

export default function Filter() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title='Filter'
        classNames={{
          inner: 'max-w-[22.375rem] md:max-w-[30.9375rem]',
          header: 'bg-brand-grey-300 p-4 h-[4.625rem]',
          title: 'text-xl font-bold',
        }}
        closeButtonProps={{
          iconSize: '100%',
        }}
      ></Drawer>
      <button
        onClick={open}
        className='flex h-[2.375rem] w-full items-center justify-center gap-2 rounded-sm border border-brand-grey-300 bg-brand-grey-300 px-[1.125rem] font-bold md:mr-6 md:max-w-[10rem] lg:mr-12'
      >
        Filter
        <Plus width={16} height={16} />
      </button>
    </>
  );
}

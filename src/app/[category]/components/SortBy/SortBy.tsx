'use client';

import { Popover } from '@mantine/core';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export type Option = {
  title: string;
  value: string;
};

type SortByProps = {
  options: Option[];
  onSelect?: (option: Option) => void;
};

export default function SortBy({ options, onSelect }: SortByProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(options[0]);

  return (
    <Popover
      width={181}
      position='bottom-end'
      offset={1}
      radius={2}
      opened={open}
      onClose={() => setOpen(false)}
    >
      <Popover.Target>
        <button
          onClick={() => setOpen(true)}
          className='ml-4 flex h-[2.375rem] w-full flex-col flex-nowrap items-center justify-center rounded-sm border border-brand-grey-300 bg-transparent px-[1.125rem] md:ml-auto md:w-fit md:flex-row md:border-none md:p-0'
        >
          <span className='text-center md:text-left'>
            Sort by
            <br className='md:hidden' />
            <span className='text-[0.625rem] md:ml-2 md:text-[length:inherit] md:font-bold'>
              {selected.title}
            </span>
          </span>
          <ChevronDown width={16} height={16} className='ml-2' />
        </button>
      </Popover.Target>

      <Popover.Dropdown className='px-0 py-2'>
        <ul className='space-y-1'>
          {options.map((option) => (
            <li key={option.value}>
              <button
                onClick={() => {
                  setSelected(option);
                  setOpen(false);
                  onSelect?.(option);
                }}
                className='w-full px-6 py-2 text-left text-sm/normal hover:bg-brand-grey-200'
              >
                {option.title}
              </button>
            </li>
          ))}
        </ul>
      </Popover.Dropdown>
    </Popover>
  );
}

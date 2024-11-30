'use client';

import { Popover } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export type Option = {
  title: string;
  value: string;
};

type SortByProps = {
  options: Option[];
  defaultOption?: Option;
  onSelect?: (option: Option) => void;
};

export default function SortBy({
  options,
  defaultOption,
  onSelect,
}: SortByProps) {
  const [opened, { open, close, toggle }] = useDisclosure(false);
  const [selected, setSelected] = useState<Option>(defaultOption ?? options[0]);

  return (
    <Popover
      width={181}
      position='bottom-end'
      offset={1}
      radius={2}
      opened={opened}
      onChange={(opened) => (opened ? open() : close())}
    >
      <Popover.Target>
        <button
          onClick={toggle}
          className='flex h-[2.375rem] w-full flex-col flex-nowrap items-center justify-center rounded-sm border border-brand-grey-300 bg-transparent px-[1.125rem] md:ml-auto md:w-fit md:flex-row md:border-none md:p-0'
        >
          <span className='flex flex-col items-center text-center md:flex-row md:text-left'>
            Sort by
            <span className='text-[0.625rem] md:ml-2 md:text-[length:inherit] md:font-bold'>
              {selected.title}
            </span>
          </span>
          <ChevronDown
            width={16}
            height={16}
            className='ml-2 hidden md:inline-block'
          />
        </button>
      </Popover.Target>

      <Popover.Dropdown className='px-0 py-2'>
        <ul className='space-y-1'>
          {options.map((option) => (
            <li key={option.value}>
              <button
                onClick={() => {
                  setSelected(option);
                  close();
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

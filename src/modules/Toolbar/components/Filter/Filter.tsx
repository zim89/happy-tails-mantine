'use client';

import { Collapse, Drawer, Portal } from '@mantine/core';
import { Plus } from 'lucide-react';
import FilterForm, { FilterFormProps } from '../FilterForm/FilterForm';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import Badges from '../Badges';

export type FilterProps = {
  target: string;
  opened: boolean;
  onClose: () => void;
  onToggle: () => void;
} & FilterFormProps;

export default function Filter({
  target,
  opened,
  onClose,
  onToggle,
  ...props
}: FilterProps) {
  const isDesktop = useMediaQuery('(min-width: 1280px)') ?? false;

  return (
    <>
      <Drawer
        opened={opened && !isDesktop}
        onClose={onClose}
        title='Filter'
        classNames={{
          inner: 'max-w-[22.375rem] md:max-w-[30.9375rem]',
          header: 'bg-brand-grey-300 p-4 h-[4.625rem]',
          title: 'text-xl font-bold',
          body: 'p-4 md:px-9 md:py-8',
        }}
        closeButtonProps={{
          iconSize: '100%',
        }}
      >
        <Badges
          className='my-4 px-5 md:mb-4 md:mt-0 md:px-0'
          form={props.form}
          category={props.category}
          categories={props.categories}
        />
        <FilterForm {...props} />
      </Drawer>
      <Portal target={target}>
        <Collapse in={opened && isDesktop} transitionDuration={500}>
          <div className='relative rounded-sm border border-brand-grey-400 p-7 pb-[4.625rem]'>
            <FilterForm {...props} desktop />
          </div>
        </Collapse>
      </Portal>
      <button
        onClick={onToggle}
        className='flex h-[2.375rem] w-full items-center justify-center gap-2 rounded-sm border border-brand-grey-300 bg-brand-grey-300 px-[1.125rem] font-bold md:mr-4 lg:mr-8 md:max-w-[10rem]'
      >
        Filter
        <Plus width={16} height={16} />
      </button>
    </>
  );
}

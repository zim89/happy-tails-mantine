'use client';
import React from 'react';
import { X } from 'lucide-react';

interface Props {
  length: number;
  close: () => void;
}

// FIXME: types close
export default function CartHeader({ length, close }: Props) {
  return (
    <div className={'px-9'}>
      <div className={'border-b border-brand-grey-600'}>
        <div className={'flex items-center justify-between pb-8 pt-12'}>
          <h2 className={'text-[1.75rem] font-bold leading-normal'}>Cart</h2>
          <button onClick={close} className={'iconBtn'}>
            <X />
          </button>
        </div>
        <p className={'py-3 text-base font-light leading-normal'}>
          {length === 0 ? ' ' : `Your Items (${length})`}
        </p>
      </div>
    </div>
  );
}

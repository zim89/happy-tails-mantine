'use client';
import React, { MouseEventHandler } from 'react';
import { toast } from 'react-toastify';
import clsx from 'clsx';

interface Props {
  disabled?: boolean;
}
export default function AddToCartBtn({ disabled }: Props) {
  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    toast.success('Add to cart');
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx('btn w-full', disabled ? 'btn-disabled' : 'btn-cart')}
    >
      Add to cart
    </button>
  );
}

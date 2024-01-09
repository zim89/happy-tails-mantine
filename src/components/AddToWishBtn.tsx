'use client';
import React, { MouseEventHandler, useState } from 'react';
import { Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import clsx from 'clsx';

interface Props {
  withText?: boolean;
  disabled?: boolean;
}
export default function AddToWishBtn({ withText, disabled }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist');
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'group/fav bg-primary transition-all duration-300',
        isFavorite && withText && 'text-brand-orange-500',
        isFavorite && !withText && 'text-secondary',
        withText
          ? 'flex items-center gap-2 px-4 py-3 hover:text-brand-orange-400'
          : 'h-10 w-10 rounded-full border border-brand-grey-400 p-2 hover:bg-brand-grey-300',
        disabled ? 'text-secondary/40 hover:bg-primary' : 'text-secondary'
      )}
    >
      <Heart
        className={clsx(
          'stroke-2',
          withText ? 'h-5 w-5' : 'h-6 w-6',
          isFavorite &&
            withText &&
            'fill-brand-orange-500 group-hover/fav:fill-brand-orange-400',
          isFavorite && !withText && 'fill-secondary'
        )}
      />
      {withText && (
        <span className='text-base font-bold'>
          {isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </span>
      )}
    </button>
  );
}

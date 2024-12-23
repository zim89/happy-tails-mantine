import { Heart } from 'lucide-react';

import Loader from '@/components/Loader';
import { cn } from '@/shared/lib/utils';

export interface Props {
  withText?: boolean;
  disabled?: boolean;
  isFavourite: boolean;
  toggleFavorite: () => void;
  isLoading: boolean;
}

export const WishButton = ({
  withText,
  disabled,
  isFavourite,
  toggleFavorite,
  isLoading,
}: Props) => {
  return (
    <>
      {withText ? (
        <button
          data-testid='btn-with-text'
          onClick={toggleFavorite}
          disabled={disabled}
          className={cn(
            'group/fav flex items-center gap-2 whitespace-nowrap bg-primary px-4 py-3 transition-colors duration-300',
            isFavourite
              ? 'text-brand-orange-400 hover:text-brand-orange-500'
              : 'text-secondary hover:text-brand-orange-500',
            disabled && 'text-secondary/40 hover:bg-primary'
          )}
        >
          <Heart
            className={cn(
              'h-5 w-5 stroke-2 transition-colors duration-300',
              isFavourite &&
                'fill-brand-orange-400 stroke-brand-orange-400 group-hover/fav:fill-brand-orange-500 group-hover/fav:stroke-brand-orange-500'
            )}
          />
          <span className='text-base font-bold transition-colors duration-300'>
            {isFavourite ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </span>
        </button>
      ) : (
        <button
          data-testid='btn-without-text'
          onClick={toggleFavorite}
          disabled={disabled}
          className={cn(
            'group/fav flex h-10 w-10 items-center justify-center rounded-full border border-brand-grey-400 bg-primary transition-colors duration-300 hover:bg-brand-grey-300',
            disabled && 'text-secondary/40 hover:bg-primary'
          )}
        >
          {!isLoading ? (
            <Heart
              className={cn(
                'h-6 w-6 stroke-2',
                isFavourite && 'fill-secondary'
              )}
            />
          ) : (
            <Loader size={24} className='mr-2' />
          )}
        </button>
      )}
    </>
  );
};

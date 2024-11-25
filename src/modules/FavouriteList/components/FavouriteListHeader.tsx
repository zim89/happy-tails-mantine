import { Heart } from 'lucide-react';

type Props = {
  favNumber: number;
};

export const FavouriteListHeader = ({ favNumber }: Props) => {
  return (
    <div className={'mb-6 bg-brand-grey-200 md:mb-8 md:bg-transparent'}>
      <div className='container'>
        <div
          className={
            'flex gap-3 py-4 md:rounded-0.5 md:bg-brand-grey-200 md:px-6'
          }
        >
          <Heart className={'h-6 w-6 fill-secondary'} />
          <p>
            You currently have{' '}
            <span className={'font-bold'}>{favNumber} items</span> on your list.
          </p>
        </div>
      </div>
    </div>
  );
};

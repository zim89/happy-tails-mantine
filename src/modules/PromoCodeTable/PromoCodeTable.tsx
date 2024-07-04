import Table from './components/Table';
import { codes } from './lib/data';

export const PromoCodeTable = () => {
  return (
    <div className='mt-8'>
      <h2 className='rounded-t bg-brand-grey-300 p-4 text-xl/6 font-bold text-black'>
        Promo code
      </h2>
      <Table data={codes} />
    </div>
  );
};

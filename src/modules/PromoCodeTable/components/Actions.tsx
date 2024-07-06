import DeleteCodeModal from '@/modules/DeleteCodeModal';
import { PromoCode } from '../lib/data';
import UpdateCodeModal from '@/modules/UpdateCodeModal';

export const Actions = (promo: PromoCode) => {
  return (
    <>
      {promo.status !== 'COMPLETED' && <UpdateCodeModal />}
      <DeleteCodeModal promoCode={promo} />
    </>
  );
};

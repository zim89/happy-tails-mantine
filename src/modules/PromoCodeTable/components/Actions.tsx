import DeleteCodeModal from '@/modules/DeleteCodeModal';
import UpdateCodeModal from '@/modules/UpdateCodeModal';
import { Discount } from '@/shared/api/discountApi';

export const Actions = (promo: Discount) => {
  return (
    <>
      {/* Only active promo codes could be changed */}
      {promo.expirationDate > Date.now() && (
        <UpdateCodeModal promoCode={promo} />
      )}
      <DeleteCodeModal promoCode={promo} />
    </>
  );
};

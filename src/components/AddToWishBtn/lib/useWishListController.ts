import {
  useAddToWishList,
  useAddToWishListLocal,
} from '@/shared/hooks/useAddToWishList';
import { Product } from '@/shared/types/types';

type Props = {
  kind: 'Local' | 'Server';
  product?: Product;
  size: string;
};

export const useWishListController = ({ kind, product, size }: Props) => {
  const localProps = useAddToWishListLocal({ product, size });
  const serverProps = useAddToWishList({ product, size });

  return kind === 'Local' ? localProps : serverProps;
};

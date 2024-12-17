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

export const WishListControllerFactory = ({ kind, product, size }: Props) => {
  if (kind === 'Local') {
    return () => {
      const props = useAddToWishListLocal({ product, size });
      return props;
    };
  } else {
    return () => {
      const props = useAddToWishList({ product, size });
      return props;
    };
  }
};

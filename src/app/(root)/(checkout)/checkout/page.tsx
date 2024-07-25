'use client';

import { useAppSelector } from '@/shared/redux/store';
import CheckoutForm from './ui/CheckoutForm';

export default function Page() {
  const hasCartItems = useAppSelector((state) => state.cart.items.length > 0);

  return <>{hasCartItems && <CheckoutForm />}</>;
}

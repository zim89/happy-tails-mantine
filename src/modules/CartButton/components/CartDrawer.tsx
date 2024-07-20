import { Drawer, ScrollArea } from '@mantine/core';

import { useDeviceSize } from '@/shared/lib/hooks';
import CartHeader from '../ui/CartHeader';
import CartItem from '../ui/CartItem';
import CartFooter from '../ui/CartFooter';
import {
  CartItem as TCartItem,
  selectCartIsOpen,
} from '@/shared/redux/cart/cartSlice';
import { useAppSelector } from '@/shared/redux/store';

type Props = {
  onClose: () => {
    payload: undefined;
    type: 'cart/closeCartDrawer';
  };
  cart: TCartItem[];
};

export const CartDrawer = ({ onClose, cart }: Props) => {
  const { isTablet } = useDeviceSize();

  const isOpen = useAppSelector(selectCartIsOpen);

  return (
    <Drawer
      opened={isOpen}
      onClose={onClose}
      position='right'
      overlayProps={{ backgroundOpacity: 0.2, color: '#161616' }}
      withCloseButton={false}
      size={isTablet ? 529 : '100%'}
      classNames={{
        body: 'flex h-full flex-col p-0',
      }}
    >
      <CartHeader length={cart.length} close={onClose} />

      <ScrollArea h={'100%'} w={'100%'} type='auto'>
        <div className={'px-9'}>
          {cart.length === 0 ? (
            <p className={'mt-4 text-2xl font-light leading-normal'}>
              Your cart is currently empty.
            </p>
          ) : (
            <ul>
              {cart.map((product) => (
                <li
                  key={product.id}
                  className={
                    'flex items-center gap-6 border-b border-b-brand-grey-300 px-2 py-4 last:border-none'
                  }
                >
                  <CartItem product={product} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </ScrollArea>

      <CartFooter length={cart.length} close={onClose} />
    </Drawer>
  );
};

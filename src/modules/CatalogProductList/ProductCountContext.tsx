'use client';

import {
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  createContext,
  useState,
  useCallback
} from 'react';

export const ProductCountContext = createContext<
  [number, Dispatch<SetStateAction<number>>]
>([0, () => {}]);

export default function ProductCountContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [value, _setValue] = useState(0);

  const setValue = useCallback((val: number) => _setValue(val), [_setValue]);

  return (
    <ProductCountContext.Provider value={[value, setValue]}>
      {children}
    </ProductCountContext.Provider>
  );
}

'use client';

import {
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  createContext,
  useState,
} from 'react';

export const ProductCountContext = createContext<
  [number, Dispatch<SetStateAction<number>>]
>([0, () => {}]);

export default function ProductCountContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [value, setValue] = useState(0);

  return (
    <ProductCountContext.Provider value={[value, setValue]}>
      {children}
    </ProductCountContext.Provider>
  );
}

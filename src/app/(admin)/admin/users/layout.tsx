'use client';

import { AdminPanelContext } from '@/shared/context/panel.context';
import { useContext, useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  const { update } = useContext(AdminPanelContext);

  useEffect(() => {
    update((prev) => ({ ...prev, openedLink: 'Users' }));
  }, []);

  return <>{children}</>;
}

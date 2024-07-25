'use client';

import { AdminPanelContext } from '@/shared/context/panel.context';
import { useContext, useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { update } = useContext(AdminPanelContext);

  useEffect(() => {
    update((prev) => ({ ...prev, openedLink: 'Products' }));
  }, []);

  return <>{children}</>;
}

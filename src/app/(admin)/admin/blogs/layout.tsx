'use client';

import { useContext, useEffect } from 'react';
import { AdminPanelContext } from '@/shared/context/panel.context';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { update } = useContext(AdminPanelContext);

  useEffect(() => {
    update((prev) => ({ ...prev, openedLink: 'Blogs' }));
  }, []);

  return <>{children}</>;
}

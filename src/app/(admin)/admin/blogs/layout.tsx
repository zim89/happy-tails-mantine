'use client';

import { useContext, useEffect } from 'react';
import { AdminPanelContext } from '@/shared/context/panel.context';
import { PostFormProvider } from '@/shared/context/postform.context';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { update } = useContext(AdminPanelContext);

  useEffect(() => {
    update((prev) => ({ ...prev, openedLink: 'Blogs' }));
  }, []);

  return <PostFormProvider>{children}</PostFormProvider>;
}

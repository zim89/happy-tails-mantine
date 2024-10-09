'use client';

import { notFound, usePathname } from 'next/navigation';

import { useAuth } from '@/shared/hooks/useAuth';
import classes from './layout.module.css';
import AdminSidebar from '@/modules/AdminSidebar';
import AdminHeader from '@/modules/AdminHeader';
import { UnsavedChangesProvider } from '@/shared/context/unsaved.context';
import { AdminPanelProvider } from '@/shared/context/panel.context';

const regex = /\/preview/;

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAdmin, currentUser } = useAuth();
  const path = usePathname();

  if (!isAdmin || !currentUser) notFound();

  const isPreviewed = regex.test(path);

  return (
    <AdminPanelProvider>
      <UnsavedChangesProvider>
        {!isPreviewed ? (
          <div className={classes.layoutWrapper}>
            <AdminSidebar />
            <AdminHeader user={currentUser} />
            <div className={classes.content}>{children}</div>
          </div>
        ) : (
          <div>{children}</div>
        )}
      </UnsavedChangesProvider>
    </AdminPanelProvider>
  );
}

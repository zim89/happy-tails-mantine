"use client";
import { notFound } from 'next/navigation';

import { useAuth } from '@/shared/hooks/useAuth';
import classes from './layout.module.css';
import AdminSidebar from '@/modules/AdminSidebar';
import AdminHeader from '@/modules/AdminHeader';
import { AdminPanelProvider, UnsavedChangesProvider } from '@/shared/lib/context';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAdmin, currentUser } = useAuth();

  if (!isAdmin || !currentUser) notFound();  

  return (
    <AdminPanelProvider>
      <UnsavedChangesProvider>
        <div className={classes.layoutWrapper}>
          <AdminSidebar />
          <AdminHeader user={currentUser} />
          <div className={classes.content}>{children}</div>
        </div>
      </UnsavedChangesProvider>
    </AdminPanelProvider>
    );
}